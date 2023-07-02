import { Link, Outlet } from "react-router-dom";

export const Menu = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/report">Report</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/tag">Tag</Link>
          </li>
          <li>
            <Link to="/printer">Printer</Link>
          </li>
          <li>
            <Link to="/member">Member</Link>
          </li>
          <li>
            <Link to="/bp">Branch Purchase</Link>
          </li>
          <li>
            <Link to="/combo">Combo</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Menu;
