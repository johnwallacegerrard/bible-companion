import "./Nav.css";

const Nav = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="nav container">
      <button
        className={`nav__tab ${activeTab === "home" ? "nav__tab--active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        Home
      </button>
      <button
        className={`nav__tab ${activeTab === "discover" ? "nav__tab--active" : ""}`}
        onClick={() => setActiveTab("discover")}
      >
        Discover
      </button>
      <button
        className={`nav__tab ${activeTab === "community" ? "nav__tab--active" : ""}`}
        onClick={() => setActiveTab("community")}
      >
        Community
      </button>
      <button
        className={`nav__tab ${activeTab === "myplans" ? "nav__tab--active" : ""}`}
        onClick={() => setActiveTab("myplans")}
      >
        My Plans
      </button>
    </nav>
  );
};

export default Nav;
