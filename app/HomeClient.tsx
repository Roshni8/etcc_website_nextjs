"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import PageLoader from "@/components/home/PageLoader";
import {
  HeroSkeleton,
  ProductsSkeleton,
  DefenceSkeleton,
  CustomersSkeleton,
} from "@/components/home/Skeletons";

const HeroSection = dynamic(
  () => import("@/components/home/HeroSection"),
  { loading: () => <HeroSkeleton /> }
);
const ProductsSection = dynamic(
  () => import("@/components/home/ProductsSection"),
  { ssr: false, loading: () => <ProductsSkeleton /> }
);
const DefenceSection = dynamic(
  () => import("@/components/home/DefenceSection"),
  { ssr: false, loading: () => <DefenceSkeleton /> }
);
const CustomersSection = dynamic(
  () => import("@/components/home/CustomersSection"),
  { ssr: false, loading: () => <CustomersSkeleton /> }
);
const QuoteModal = dynamic(
  () => import("@/components/QuoteModal"),
  { ssr: false }
);

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <PageLoader>
      <Layout>
        <HeroSection onQuoteClick={() => setQuoteOpen(true)} />
        <ProductsSection />
        <DefenceSection />
        <CustomersSection />
        <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
      </Layout>
    </PageLoader>
  );
};

export default Index;
