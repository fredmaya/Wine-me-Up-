import "./Header.scss";

//library
import { NavLink, Link, useNavigate } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/">
          <div className="navbar__logo">
            <h2>Wine Me Up!</h2>
          </div>
        </NavLink>
        <div className="navbar__links">
          <Link to="/wine">
            <p className="">Let`s Get Started</p>
          </Link>
        </div>
        <div className="navbar__links">
          <Link to="/about-us">
            <p className="">About Us</p>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
