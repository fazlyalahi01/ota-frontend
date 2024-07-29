import { Dashboard, Home, Hotel, Store } from "@mui/icons-material";
import duotone from "icons/duotone";

export const navigation = [
  {
    type: "label",
    label: "Admin"
  },
  {
    name: "Dashboard",
    icon: Dashboard,
    path: "/property/dashboard"
  },
  {
    name: "Properties",
    icon: Home,
    path: "/property/properties"
  },
  {
    name: "Room",
    icon: Hotel,
    children: [
      {
        name: "Room Type",
        path: "/property/room-type"
      },
      {
        name: "Room Details",
        path: "/property/room-details"
      },
    ]
  },
  {
    name: "Inventory",
    icon: Store,
    path: "/property/inventory"
  },


  // new section
  {
    type: "label",
    label: "User Preference"
  },
  {
    name: "Account Settings",
    icon: duotone.AccountSetting,
    path: "/vendor/account-settings"
  },
  {
    name: "Site Settings",
    icon: duotone.SiteSetting,
    path: "/vendor/site-settings"
  },
  {
    name: "Logout",
    icon: duotone.Session,
    path: "/"
  }
];
