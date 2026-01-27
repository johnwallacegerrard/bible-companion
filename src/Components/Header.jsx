import "./Header.css";

import { BookOpen, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__brand"></div>
        <BookOpen className="header__icon" size={32} />
        <h1 className="header__title">Bible Reading Companion</h1>
      </div>
      <button
        className="button button--primary header__button"
        onClick={() => setShowCreatePlane(true)}
      >
        <Plus size={20} />
        Create Plan
      </button>
    </header>
  );
};

export default Header;
