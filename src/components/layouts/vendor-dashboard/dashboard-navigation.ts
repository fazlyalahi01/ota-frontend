import duotone from "icons/duotone";

export const navigation = [
  { type: "label", label: "Admin" },
  { name: "Dashboard", icon: duotone.Dashboard, path: "/property/dashboard" },
  { name: "Properties", icon: duotone.Products, path: "/property/properties" },
  {
    name: "Room",
    icon: duotone.ElementHub,
    children: [
      { name: "Room Type", path: "/property/room-type" },
      { name: "Room Details", path: "/property/room-details" },
    ]
  },

  {
    name: "Categories",
    icon: duotone.Accounts,
    children: [
      { name: "Category List", path: "/admin/categories" },
      { name: "Create Category", path: "/admin/categories/create" }
    ]
  },



  { type: "label", label: "User Preference" },
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
