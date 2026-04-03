import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

interface Finding {
  file: string;
  line: number;
  rule: string;
  severity: "CRITICAL" | "WARNING" | "SUGGESTION";
  message: string;
}

const ROOT = process.cwd();
const findings: Finding[] = [];

const RAW_TAILWIND_COLORS =
  /(?<!\w)(text|bg|border|ring|shadow|from|to|via)-(red|blue|green|yellow|orange|purple|pink|indigo|violet|teal|cyan|emerald|lime|amber|fuchsia|rose|sky|slate|gray|zinc|neutral|stone)-\d{2,3}(?!\w)/g;

const HEX_COLORS = /#[0-9a-fA-F]{3,8}(?!\w)/g;

const RAW_HSL = /hsl\(\s*\d/g;

const RAW_PIXEL_VALUES =
  /(?<!\w)(p|m|gap|space|w|h|max-w|min-w|max-h|min-h|top|right|bottom|left|inset)-\[(?!var\()-?\d+px\]/g;

const HARDCODED_COMPANY_DATA = [
  { pattern: /\+91[\s-]*20[\s-]*2712/g, name: "ETCC phone number" },
  { pattern: /etccindia\.com/gi, name: "ETCC domain" },
  { pattern: /Gat No\.\s*123/gi, name: "ETCC address" },
  { pattern: /Khed Shivapur/gi, name: "ETCC location" },
];

function walkDir(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  const skipDirs = new Set([
    "node_modules",
    ".next",
    "out",
    ".git",
    "claude-seo",
    ".agents",
    ".claude",
    "drive-download-20260324T111632Z-3-001",
  ]);

  for (const entry of readdirSync(dir)) {
    if (skipDirs.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walkDir(full, extensions));
    } else if (extensions.some((ext) => full.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function checkFile(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const rel = relative(ROOT, filePath);

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*")
    )
      return;

    let match: RegExpExecArray | null;

    RAW_TAILWIND_COLORS.lastIndex = 0;
    while ((match = RAW_TAILWIND_COLORS.exec(line)) !== null) {
      findings.push({
        file: rel,
        line: lineNum,
        rule: "no-raw-colors",
        severity: "WARNING",
        message: `Raw Tailwind color "${match[0]}" — use semantic token (bg-primary, text-muted-foreground, etc.)`,
      });
    }

    if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      HEX_COLORS.lastIndex = 0;
      while ((match = HEX_COLORS.exec(line)) !== null) {
        if (line.includes("globals.css") || line.includes("tailwind.config"))
          break;
        findings.push({
          file: rel,
          line: lineNum,
          rule: "no-hex-colors",
          severity: "WARNING",
          message: `Hardcoded hex color "${match[0]}" — define in globals.css and use a semantic token`,
        });
      }
    }

    RAW_HSL.lastIndex = 0;
    if (RAW_HSL.test(line) && !filePath.includes("globals.css")) {
      findings.push({
        file: rel,
        line: lineNum,
        rule: "no-raw-hsl",
        severity: "WARNING",
        message: "Raw hsl() value — use CSS variable from globals.css",
      });
    }

    RAW_PIXEL_VALUES.lastIndex = 0;
    while ((match = RAW_PIXEL_VALUES.exec(line)) !== null) {
      findings.push({
        file: rel,
        line: lineNum,
        rule: "no-arbitrary-spacing",
        severity: "SUGGESTION",
        message: `Arbitrary pixel value "${match[0]}" — use Tailwind spacing scale or design token`,
      });
    }

    if (filePath.endsWith(".tsx")) {
      for (const { pattern, name } of HARDCODED_COMPANY_DATA) {
        pattern.lastIndex = 0;
        if (pattern.test(line)) {
          if (
            filePath.includes("constants") ||
            filePath.includes("lib/") ||
            filePath.includes("data/")
          )
            continue;
          findings.push({
            file: rel,
            line: lineNum,
            rule: "no-magic-strings",
            severity: "WARNING",
            message: `Hardcoded ${name} — move to lib/constants.ts`,
          });
        }
      }
    }
  });
}

const tsxFiles = walkDir(ROOT, [".tsx", ".ts"]);
const filteredFiles = tsxFiles.filter(
  (f) =>
    !f.includes("scripts/") &&
    !f.includes("eslint.config") &&
    !f.includes("tailwind.config") &&
    !f.includes("next.config") &&
    !f.includes("postcss.config") &&
    !f.endsWith(".d.ts")
);

for (const file of filteredFiles) {
  checkFile(file);
}

const critical = findings.filter((f) => f.severity === "CRITICAL");
const warnings = findings.filter((f) => f.severity === "WARNING");
const suggestions = findings.filter((f) => f.severity === "SUGGESTION");

console.log("\n══════════════════════════════════════════════");
console.log("  DESIGN SYSTEM COMPLIANCE CHECK");
console.log("══════════════════════════════════════════════\n");

if (findings.length === 0) {
  console.log("✅ All files comply with the design system.\n");
  process.exit(0);
}

function printFindings(label: string, items: Finding[]) {
  if (items.length === 0) return;
  console.log(`\n── ${label} (${items.length}) ──\n`);
  for (const f of items) {
    console.log(`  ${f.file}:${f.line}`);
    console.log(`    [${f.rule}] ${f.message}`);
  }
}

printFindings("CRITICAL", critical);
printFindings("WARNING", warnings);
printFindings("SUGGESTION", suggestions);

console.log("\n──────────────────────────────────────────────");
console.log(
  `  Total: ${critical.length} critical, ${warnings.length} warnings, ${suggestions.length} suggestions`
);
console.log("──────────────────────────────────────────────\n");

const WARNING_THRESHOLD = Number(process.env.DESIGN_LINT_MAX_WARNINGS ?? 300);

if (critical.length > 0) {
  console.log("❌ CRITICAL issues found — failing check.\n");
  process.exit(1);
}

if (warnings.length > WARNING_THRESHOLD) {
  console.log(
    `❌ Too many warnings (${warnings.length} > ${WARNING_THRESHOLD}) — failing check.`
  );
  console.log(
    "   Reduce violations or raise DESIGN_LINT_MAX_WARNINGS temporarily.\n"
  );
  process.exit(1);
}

console.log(
  `⚠️  ${warnings.length} warnings (threshold: ${WARNING_THRESHOLD}). Review & reduce over time.\n`
);
process.exit(0);
