import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { makeAccessControlLayout } from "./AccessControl/Layout";
import "./App.css";
import Menu from "./layouts/Menu";
import Report from "./pages/Report";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Tag from "./pages/Tag";
import Printer from "./pages/Printer";
import Member from "./pages/Member";
import BranchPurchase from "./pages/BranchPurchase";
import Combo from "./pages/Combo";

const RequireCoreMemberModulesLayout = makeAccessControlLayout({
  accessControl: [["core"], ["member"]],
});
const RequireCoreModuleLayout = makeAccessControlLayout({
  accessControl: [["core"]],
});
const RequireMemberModuleLayout = makeAccessControlLayout({
  accessControl: [["member"]],
  // redirectToWhenValidateFail: "/",
  screenForValidateFail: (
    <div className="page">
      <h1>Sorry, please upgrade your plan</h1>
    </div>
  ),
});
const RequireBpModuleLayout = makeAccessControlLayout({
  accessControl: [["bp"]],
});
const ComboAccessControlLayout = makeAccessControlLayout({
  accessControl: [
    ["core", "member"],
    ["core", "bp"],
  ],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/report",
        element: (
          <RequireCoreMemberModulesLayout>
            <Report />
          </RequireCoreMemberModulesLayout>
        ),
      },
      {
        path: "/product",
        element: (
          <RequireCoreModuleLayout>
            <Product />
          </RequireCoreModuleLayout>
        ),
      },
      {
        path: "/tag",
        element: (
          <RequireCoreModuleLayout>
            <Tag />
          </RequireCoreModuleLayout>
        ),
      },
      {
        path: "/printer",
        element: (
          <RequireCoreModuleLayout>
            <Printer />
          </RequireCoreModuleLayout>
        ),
      },
      {
        path: "/member",
        element: (
          <RequireMemberModuleLayout>
            <Member />
          </RequireMemberModuleLayout>
        ),
      },
      {
        path: "/bp",
        element: (
          <RequireBpModuleLayout>
            <BranchPurchase />
          </RequireBpModuleLayout>
        ),
      },
      {
        path: "/combo",
        element: (
          <ComboAccessControlLayout>
            <Combo />
          </ComboAccessControlLayout>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
