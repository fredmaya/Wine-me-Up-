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
        <div className="navbar__logo">
          {/* Call handleFormClick when the link is clicked */}
          <p className="" onClick={handleFormClick}>
            <NavLink to="/" className="nav-link">
              Wine Me Up!
            </NavLink>
          </p>
        </div>

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
