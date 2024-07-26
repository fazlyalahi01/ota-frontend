import { Metadata } from "next";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import PropertyForm from "pages-sections/vendor-dashboard/property/property-form";

export const metadata: Metadata = {
  title: "Product - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function ProductEdit({ params: {slug} }) {
  console.log(slug)
  return (
    <PageWrapper title="Edit Product">
      <PropertyForm propertyId={slug} />
    </PageWrapper>
  );
}
