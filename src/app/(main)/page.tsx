import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Grocery 3 - OTA Hole Managements",
    description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
    authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function HomePageForMainLayout() {
    return <p>Homepage content will be here.</p>;
}
