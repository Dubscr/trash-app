import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Upload } from "./pages/Upload";
import { UserPage } from "./pages/UserPage";
import { AllUser } from "./pages/AllUserPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "upload", Component: Upload },
      { path: "user", Component: UserPage },
       { path: "all-users", Component: AllUser },
    ],
  },
]);
