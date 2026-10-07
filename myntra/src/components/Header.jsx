import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterAction } from "../store/filterSlice";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const wishlist = useSelector((store) => store.wishlist);
  const searchQuery = useSelector((store) => store.filter.searchQuery);
  const activeCategory = useSelector((store) => store.filter.category);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(filterAction.setSearchQuery(e.target.value));
  };

  const handleCategoryClick = (cat) => {
    dispatch(filterAction.setCategory(cat));
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="brand-logo-container" onClick={() => handleCategoryClick("All")}>
          <div className="brand-logo-badge">
            <HiSparkles className="brand-sparkle-icon" />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">TREND<span className="brand-highlight">VOGUE</span></span>
          </div>
        </Link>
        <nav className="nav_bar">
          {["Men", "Women", "Kids", "Home & Living", "Beauty"].map((cat) => (
            <button
              key={cat}
              className={`nav-link-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
          <span className="nav-studio-pill">
            STUDIO <span className="badge-new">NEW</span>
          </span>
        </nav>
      </div>

      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">search</span>
        <input
          className="search_input"
          placeholder="Search for styles, brands and collections"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => dispatch(filterAction.setSearchQuery(""))}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="action_bar">
        <div className="action_container" title="Profile">
          <IoPersonOutline className="action_icon" />
          <span className="action_name">Profile</span>
        </div>

        <div className="action_container" title="Wishlist">
          <div className="icon-with-badge">
            {wishlist.length > 0 ? (
              <FaHeart className="action_icon text-pink" />
            ) : (
              <FaRegHeart className="action_icon" />
            )}
            {wishlist.length > 0 && (
              <span className="action-badge-pill">{wishlist.length}</span>
            )}
          </div>
          <span className="action_name">Wishlist</span>
        </div>

        <Link className="action_container" to="/bag" title="Shopping Bag">
          <div className="icon-with-badge">
            <HiOutlineShoppingBag className="action_icon" />
            {bag.length > 0 && (
              <span className="action-badge-pill">{bag.length}</span>
            )}
          </div>
          <span className="action_name">Bag</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
