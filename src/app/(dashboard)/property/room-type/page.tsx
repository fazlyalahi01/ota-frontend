import { Metadata } from "next";
import RoomTypeListView from "pages-sections/vendor-dashboard/room-type/page-view/room-type-list";


export const metadata: Metadata = {
  title: "Room Type - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function RoomTypes() {
  return <RoomTypeListView />;
}
