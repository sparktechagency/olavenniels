import React from "react";
import { MdDashboard, MdOutlineSupport } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";

export const SidebarRoutes = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    link: "/",
  },
  {
    key: "user-management",
    label: "User Management",
    icon: FaRegCircleUser,
    link: "/user-management",
  },
  {
    key: "book-management",
    label: "Book Management",
    icon: GiBookshelf,
    link: "/book-management",
    children: [
      {
        key: "audio-book",
        label: "Audio Book",
        link: "/audio-book",
      },
      {
        key: "e-book",
        label: "E-Book",
        link: "/e-book",
      },
      {
        key: "both-format-book",
        label: "Both Format Book",
        link: "/both-format-book",
      }
    ],
  },
  {
    key: "category",
    label: "Category Management",
    icon: BiCategory,
    link: "/category",
  },
  {
    key: "banner-management",
    label: "Banners",
    icon: MdOutlineSupport,
    link: "/banner-management",
  },
  {
    key: "subscription-management",
    label: "Subscription management",
    icon: RiAdminFill,
    link: "/subscription-management",
  },
  {
    key: "make-admin",
    label: "Make Admin",
    icon: RiAdminFill,
    link: "/make-admin",
  },
  {
    key: "settings",
    label: "Settings",
    icon: FaCog,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "contact",
        label: "Contact Us",
        link: "/dashboard/Settings/ContactUs",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/faq",
      },
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
    ],
  },
];
