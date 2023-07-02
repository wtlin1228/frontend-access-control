import { Link, Outlet } from "react-router-dom";
import useMenuVisibility from "./useMenuVisibility";

export const Menu = () => {
  const getShouldBeVisible = useMenuVisibility();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {getShouldBeVisible([["core"], ["member"]]) && (
            <li>
              <Link to="/report">Report</Link>
            </li>
          )}

          {getShouldBeVisible([["core"]]) && (
            <>
              <li>
                <Link to="/product">Product</Link>
              </li>
              <li>
                <Link to="/tag">Tag</Link>
              </li>
              <li>
                <Link to="/printer">Printer</Link>
              </li>
            </>
          )}

          {getShouldBeVisible([["member"]]) && (
            <li>
              <Link to="/member">Member</Link>
            </li>
          )}

          {getShouldBeVisible([["bp"]]) && (
            <li>
              <Link to="/bp">Branch Purchase</Link>
            </li>
          )}

          {getShouldBeVisible([
            ["core", "member"],
            ["core", "bp"],
          ]) && (
            <li>
              <Link to="/combo">Combo</Link>
            </li>
          )}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Menu;
