import { FaTrashCan, FaRotateLeft } from "react-icons/fa6";
import { HiOutlineTruck } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { bagAction } from "../store/bagSlice";
import { useToast } from "./Toast";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleRemoveFromBag = () => {
    dispatch(bagAction.removeFromBag(item.id));
    showToast(`Removed "${item.item_name}" from bag`, "danger");
  };

  return (
    <div className="bag-card-item">
      <div className="bag-card-image-box">
        <img className="bag-card-image" src={item.image} alt={item.item_name} />
      </div>

      <div className="bag-card-info">
        <div className="bag-card-header">
          <div>
            <h4 className="bag-item-brand">{item.company}</h4>
            <p className="bag-item-title">{item.item_name}</p>
          </div>
          <button
            className="btn-remove-item"
            onClick={handleRemoveFromBag}
            title="Remove from bag"
          >
            <FaTrashCan />
          </button>
        </div>

        <div className="bag-item-pricing">
          <span className="current-price">₹{item.current_price}</span>
          {item.original_price > item.current_price && (
            <span className="original-price">₹{item.original_price}</span>
          )}
          {item.discount_percentage > 0 && (
            <span className="discount-tag">({item.discount_percentage}% OFF)</span>
          )}
        </div>

        <div className="bag-item-perks">
          <div className="perk-row">
            <FaRotateLeft className="perk-icon" />
            <span>
              <strong>{item.return_period || 14} days</strong> return available
            </span>
          </div>
          <div className="perk-row">
            <HiOutlineTruck className="perk-icon" />
            <span>
              Delivery by{" "}
              <strong className="delivery-highlight">
                {item.delivery_date || "Within 3-4 days"}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
