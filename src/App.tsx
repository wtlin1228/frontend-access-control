import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { makeAccessControlLayout } from "./AccessControl/Layout";
import "./App.css";
import Menu from "./layouts/menu";
import Report from "./pages/Report";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Tag from "./pages/Tag";
import Printer from "./pages/Printer";
import Member from "./pages/Member";
import BranchPurchase from "./pages/BranchPurchase";
import Combo from "./pages/Combo";

const RequireCoreMemberModulesLayout = makeAccessControlLayout([
  ["core"],
  ["member"],
]);
const RequireCoreModuleLayout = makeAccessControlLayout([["core"]]);
const RequireMemberModuleLayout = makeAccessControlLayout([["member"]]);
const RequireBpModuleLayout = makeAccessControlLayout([["bp"]]);
const CobmoAccessControlLayout = makeAccessControlLayout([
  ["core", "member"],
  ["core", "bp"],
]);

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
          <CobmoAccessControlLayout>
            <Combo />
          </CobmoAccessControlLayout>
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
