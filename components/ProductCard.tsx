import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const ProductCard = ({ title, description, href, icon }: ProductCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary-dark">
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default ProductCard;
