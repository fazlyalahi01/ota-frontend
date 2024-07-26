import { Metadata } from "next";
import RoomDetailsForm from "pages-sections/vendor-dashboard/room-details/_components/room-details-form";

export const metadata: Metadata = {
  title: "Room Details - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function EditRoomDetails({ params: { slug } }) {
  console.log(slug)
  return (
    <RoomDetailsForm uuid={slug} />
  );
}
