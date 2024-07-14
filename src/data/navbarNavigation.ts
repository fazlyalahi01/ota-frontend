import { url } from "inspector";
import categoriesMegaMenu from "./categoriesMegaMenu";

// MEGA-MENU DATA
const megaMenus = [
  [
    {
      title: "Tier 1",
      child: [
        { title: "Hydrabad", url: "/hydrabad" },
        { title: "Kolkata", url: "/kolkata" },
        { title: "Delhi", url: "/delhi" }
      ]
    }
  ],

  [
    {
      title: "Tier 2",
      child: [
        { title: "city 1", url: "/city-1" },
        { title: "city 2", url: "/city-2" },
        { title: "city 3", url: "/city-3" }
      ]
    }
  ],

  [
    {
      title: "Tier 3",
      child: [
        { title: "city 1", url: "/city-1" },
        { title: "city 2", url: "/city-2" },
        { title: "city 3", url: "/city-3" }
      ]
    },
  ],

  [
    {
      title: "Tier 4",
      child: [
        { title: "city 1", url: "/city-1" },
        { title: "city 2", url: "/city-2" },
      ]
    },
    {
      title: "Tier 5",
      child: [
        { title: "city 1", url: "/city-1" },
        { title: "city 2", url: "/city-2" },
      ]
    }
  ]
];

// MAIN NAVIGATION DATA
const navbarNavigation = [
  {
    title: "Home",
    url: "/",
    megaMenu: false,
    megaMenuWithSub: false,
  },

  {
    title: "Cities",
    megaMenu: true,
    megaMenuWithSub: false,
    child: megaMenus
  },
  // {
  //   megaMenu: false,
  //   megaMenuWithSub: true,
  //   title: "Full Screen Menu",
  //   child: categoriesMegaMenu
  // },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Offers",
    child: [
      {
        title: "Sale Page",
        child: [
          { title: "Version 1", url: "/sales-1" },
          { title: "Version 2", url: "/sales-2" }
        ]
      },
      {
        title: "Vendor",
        child: [
          { title: "All vendors", url: "/shops" },
          { title: "Vendor store", url: "/shops/scarlett-beauty" }
        ]
      },
      {
        title: "Shop",
        child: [
          { title: "Search product", url: "/products/search/mobile phone" },
          { title: "Single product", url: "/products/lord-2019" },
          { title: "Cart", url: "/cart" },
          { title: "Checkout", url: "/checkout" },
          { title: "Alternative Checkout", url: "/checkout-alternative" },
          { title: "Order confirmation", url: "/order-confirmation" }
        ]
      },
      {
        title: "Auth",
        child: [
          { title: "Login", url: "/login" },
          { title: "Register", url: "/register" }
        ]
      }
    ]
  },
  {
    title: "About Us",
    url: "/about-us",
    megaMenu: false,
    megaMenuWithSub: false
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    megaMenu: false,
    megaMenuWithSub: false
  }
];

export default navbarNavigation;
