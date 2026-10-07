import { useDispatch, useSelector } from "react-redux";
import { bagAction } from "../store/bagSlice";
import { wishlistAction } from "../store/wishlistSlice";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useToast } from "./Toast";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const bagItem = useSelector((store) => store.bag);
  const wishlist = useSelector((store) => store.wishlist);

  const isInBag = bagItem.includes(item.id);
  const isWishlisted = wishlist.includes(item.id);

  const handleToggleBag = (e) => {
    e.stopPropagation();
    if (isInBag) {
      dispatch(bagAction.removeFromBag(item.id));
      showToast(`Removed "${item.item_name.slice(0, 22)}..." from Bag`, "danger");
    } else {
      dispatch(bagAction.addToBag(item.id));
      showToast(`Added "${item.item_name.slice(0, 22)}..." to Bag`, "success");
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(wishlistAction.toggleWishlist(item.id));
    if (!isWishlisted) {
      showToast("Added to your Wishlist!", "success");
    } else {
      showToast("Removed from Wishlist", "info");
    }
  };

  return (
    <div className="item-card">
      <div className="item-image-wrapper">
        <img
          className="item-image"
          src={item.image}
          alt={item.item_name}
          loading="lazy"
        />

        {/* Discount Pill Badge */}
        {item.discount_percentage > 0 && (
          <span className="badge-discount">{item.discount_percentage}% OFF</span>
        )}

        {/* Floating Wishlist Button */}
        <button
          className={`btn-wishlist-float ${isWishlisted ? "active" : ""}`}
          onClick={handleToggleWishlist}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? <FaHeart color="#ff3f6c" /> : <FaRegHeart />}
        </button>

        {/* Rating Pill */}
        <div className="rating-pill">
          <span className="rating-num">{item.rating?.stars || 4.2}</span>
          <FaStar className="star-icon" />
          <span className="rating-divider">|</span>
          <span className="rating-count">{item.rating?.count || 120}</span>
        </div>
      </div>

      <div className="item-details-body">
        <h3 className="company-name">{item.company}</h3>
        <p className="item-name" title={item.item_name}>
          {item.item_name}
        </p>

        <div className="price-row">
          <span className="current-price">₹{item.current_price}</span>
          {item.original_price > item.current_price && (
            <span className="original-price">₹{item.original_price}</span>
          )}
          {item.discount_percentage > 0 && (
            <span className="discount-tag">({item.discount_percentage}% OFF)</span>
          )}
        </div>

        <button
          type="button"
          className={`btn-action-bag ${isInBag ? "in-bag" : ""}`}
          onClick={handleToggleBag}
        >
          {isInBag ? (
            <>
              <FaCheck /> IN BAG
            </>
          ) : (
            <>
              <FaPlus /> ADD TO BAG
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomeItem;
