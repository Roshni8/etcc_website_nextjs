"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface SpecificationTableProps {
  columns: Column[];
  data: Record<string, string | number>[];
  caption?: string;
  collapsedRows?: number;
}

const SpecificationTable = ({ columns, data, caption, collapsedRows }: SpecificationTableProps) => {
  const [expanded, setExpanded] = useState(false);

  const canCollapse = collapsedRows !== undefined && data.length > collapsedRows;
  const visibleData = canCollapse && !expanded ? data.slice(0, collapsedRows) : data;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="border-b-2 border-border bg-secondary">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground ${
                  col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-border transition-colors last:border-0 hover:bg-secondary/50 ${
                rowIdx % 2 === 0 ? "bg-card" : "bg-secondary/30"
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`whitespace-nowrap px-4 py-3 text-foreground ${
                    col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {canCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-2 border-t border-border bg-secondary/50 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View all {data.length} specifications
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default SpecificationTable;
