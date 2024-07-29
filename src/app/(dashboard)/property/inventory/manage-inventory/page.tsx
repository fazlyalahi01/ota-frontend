import { Metadata } from "next";
import RoomTypeForm from "pages-sections/vendor-dashboard/room-type/_components/room-type-form";

export const metadata: Metadata = {
  title: "Property Create - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function CreateRoomType() {
  return (
    <RoomTypeForm />
  );
}
