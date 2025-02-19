import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TicketDetailsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view";
// API FUNCTIONS
import api from "utils/__api__/ticket";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";

export const metadata: Metadata = {
  title: "Order Details - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function SupportTicketDetails({ params }: SlugParams) {
  try {
    const ticket = await api.getTicket(String(params.slug));
    return <TicketDetailsPageView ticket={ticket} />;
  } catch (error) {
    notFound();
  }
}
