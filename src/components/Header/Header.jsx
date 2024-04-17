import "./Header.scss";
import { NavLink, Link } from "react-router-dom";

function Header() {
  // Function to force refresh the page
  const handleFormClick = () => {
    window.location.reload(); // Force a page reload
  };
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/">
          <div className="navbar__logo">
            <h2>Wine Me Up!</h2>
          </div>
        </NavLink>
        <div className="navbar__links">
          {/* Call handleFormClick when the link is clicked */}
          <p className="" onClick={handleFormClick}>
            <NavLink to="/form" className="nav-link">
              Let's Get Started
            </NavLink>
          </p>
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
