import { Metadata } from "next";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import RoomDetailsForm from "pages-sections/vendor-dashboard/room-details/_components/room-details-form";
import RoomTypeForm from "pages-sections/vendor-dashboard/room-type/_components/room-type-form";

export const metadata: Metadata = {
  title: "Property Create - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function CreateRoomDetails() {
  return (
      <RoomDetailsForm />
  );
}
