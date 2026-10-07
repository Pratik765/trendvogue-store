import { useSelector, useDispatch } from "react-redux";
import HomeItem from "../components/HomeItem";
import { filterAction } from "../store/filterSlice";
import { FaSliders, FaArrowDownWideShort } from "react-icons/fa6";

const Home = () => {
  const items = useSelector((store) => store.item) || [];
  const { category, searchQuery, sortBy } = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  // Filter items by active category
  let filteredItems = items.filter((item) => {
    if (category && category !== "All") {
      const itemCat = item.category?.toLowerCase() || "";
      const selectedCat = category.toLowerCase();
      if (!itemCat.includes(selectedCat) && !selectedCat.includes(itemCat)) {
        return false;
      }
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const name = item.item_name?.toLowerCase() || "";
      const company = item.company?.toLowerCase() || "";
      if (!name.includes(q) && !company.includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Sort items
  filteredItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price_asc") {
      return a.current_price - b.current_price;
    } else if (sortBy === "price_desc") {
      return b.current_price - a.current_price;
    } else if (sortBy === "rating_desc") {
      return (b.rating?.stars || 0) - (a.rating?.stars || 0);
    } else if (sortBy === "discount_desc") {
      return (b.discount_percentage || 0) - (a.discount_percentage || 0);
    }
    return 0;
  });

  const categoriesList = ["All", "Men", "Women", "Kids", "Home & Living", "Beauty"];

  return (
    <main className="home-main">
      {/* Promotional Hero Banner */}
      <section className="hero-banner-strip">
        <div className="banner-content">
          <span className="banner-tag">BIG FASHION FESTIVAL</span>
          <h1 className="banner-headline">50 - 80% OFF ON TOP BRANDS</h1>
          <p className="banner-subtext">Curated styles from Nike, Adidas, Roadster, Carlton London & more</p>
          <div className="banner-perks">
            <span>✨ 100% Original Products</span>
            <span>⚡ Express 2-Day Delivery</span>
            <span>🔄 14-Day Free Returns</span>
          </div>
        </div>
      </section>

      {/* Filter and Sort Toolbar */}
      <section className="catalog-toolbar">
        <div className="category-pills-row">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${category === cat ? "active" : ""}`}
              onClick={() => dispatch(filterAction.setCategory(cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-box">
          <FaArrowDownWideShort className="sort-icon" />
          <span className="sort-label">Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => dispatch(filterAction.setSortBy(e.target.value))}
          >
            <option value="default">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Customer Rating</option>
            <option value="discount_desc">Better Discount</option>
          </select>
        </div>
      </section>

      {/* Catalog items status info */}
      <div className="catalog-status-bar">
        <span className="catalog-count">
          Showing <strong>{filteredItems.length}</strong> items
          {category !== "All" && ` in ${category}`}
          {searchQuery && ` for "${searchQuery}"`}
        </span>
        {(category !== "All" || searchQuery || sortBy !== "default") && (
          <button
            className="btn-clear-filters"
            onClick={() => dispatch(filterAction.resetFilters())}
          >
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredItems.length > 0 ? (
        <div className="items-grid-container">
          {filteredItems.map((item) => (
            <HomeItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="no-products-found">
          <span className="no-products-emoji">🔍</span>
          <h3>No products match your selection</h3>
          <p>Try clearing filters or search for something else</p>
          <button
            className="btn-reset-catalog"
            onClick={() => dispatch(filterAction.resetFilters())}
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
