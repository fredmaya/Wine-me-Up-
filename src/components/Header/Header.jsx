import "./Header.scss";
import { NavLink, useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  // Function to force refresh the page
  const handleFormClick = () => {
    window.location.reload(); // Force a page reload
  };
  const navigateToMainPage = () => {
    navigate("/"); // Navigate to the main page
  };
  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo">
          {/* Wrap the h2 inside a div */}
          <div className="nav-link" onClick={navigateToMainPage}>
            <h2>Wine Me Up!</h2>
          </div>
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
