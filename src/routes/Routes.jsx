import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../components/layout/main/Dashboard";
import ForgetPassword from "../features/auth/ForgetPassword";
import Login from "../features/auth/Login";
import ResetPassword from "../features/auth/ResetPassword";
import Verification from "../features/auth/Verification";
import Category from "../features/category/Category";
import FAQ from "../features/setting/FAQ";
import PrivacyPolicy from "../features/setting/PrivacyPolicy";
import Profile from "../features/setting/Profile";
import Terms from "../features/setting/Terms";
import AllUser from "../features/user/ui/AllUser";
import SliderImage from "../features/home-slides/SliderImage";
import AudioBook from "../features/audio-book/AudioBook";
import Ebook from "../features/audio-book/Ebook";
import BothFormatBook from "../features/audio-book/BothFormatBook";
import NotificationPage from "../features/notifications/NotificationPage";
import Contact from "../features/setting/Contact";
import MakeAdmin from "../features/user/ui/MakeAdmin";
export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/user-management",
        element: <AllUser />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/banner-management",
        element: <SliderImage />,
      },
      {
        path: "/audio-book",
        element: <AudioBook />,
      },
      {
        path: "/e-book",
        element: <Ebook />,
      },
      {
        path: "/both-format-book",
        element: <BothFormatBook />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/make-admin",
        element: <MakeAdmin />,
      },
      {
        path: "/notifications",
        element: <NotificationPage />,
      },
      {
        path: "/dashboard/Settings/ContactUs",
        element: <Contact />,
      },
      {
        path: "/dashboard/Settings/faq",
        element: <FAQ />,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <Terms />,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/auth/varification",
    element: <Verification />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
]);
