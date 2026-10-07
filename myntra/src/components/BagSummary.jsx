import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bagAction } from "../store/bagSlice";
import { useToast } from "./Toast";
import { RiCoupon3Line, RiShieldCheckLine } from "react-icons/ri";

const BagSummary = () => {
  const bagItemIds = useSelector((store) => store.bag);
  const items = useSelector((store) => store.item);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const finalItems = items.filter((item) => bagItemIds.includes(item.id));

  let totalMRP = 0;
  let totalDiscount = 0;
  const CONVENIENCE_FEES = finalItems.length > 0 ? 99 : 0;

  finalItems.forEach((item) => {
    totalMRP += Number(item.original_price) || 0;
    totalDiscount += (Number(item.original_price) || 0) - (Number(item.current_price) || 0);
  });

  const couponDiscount = couponApplied ? Math.min(200, Math.floor(totalMRP * 0.1)) : 0;
  const finalPayment = Math.max(0, totalMRP - totalDiscount - couponDiscount + CONVENIENCE_FEES);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "VOGUE200" || coupon.trim().toUpperCase() === "TREND200") {
      setCouponApplied(true);
      showToast("Coupon applied successfully! Saved extra ₹" + couponDiscount, "success");
    } else {
      showToast("Invalid Coupon. Try 'VOGUE200'", "danger");
    }
  };

  const handlePlaceOrder = () => {
    if (finalItems.length === 0) return;
    setOrderPlaced(true);
    showToast("🎉 Order placed successfully! Thank you for shopping with TrendVogue.", "success");
    setTimeout(() => {
      dispatch(bagAction.clearBag());
      setOrderPlaced(false);
    }, 2200);
  };

  if (finalItems.length === 0) {
    return null;
  }

  return (
    <div className="bag-summary-sticky">
      {/* Coupon box */}
      <div className="coupon-box">
        <div className="coupon-title">
          <RiCoupon3Line className="coupon-icon" />
          <span>Coupons & Offers</span>
        </div>
        {!couponApplied ? (
          <form className="coupon-form" onSubmit={handleApplyCoupon}>
            <input
              type="text"
              placeholder="Enter 'VOGUE200'"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="coupon-input"
            />
            <button type="submit" className="coupon-apply-btn">
              APPLY
            </button>
          </form>
        ) : (
          <div className="coupon-success-pill">
            <span>Code <strong>VOGUE200</strong> Applied (-₹{couponDiscount})</span>
            <button
              onClick={() => {
                setCouponApplied(false);
                setCoupon("");
              }}
              className="coupon-remove-btn"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="price-details-card">
        <h4 className="price-header">PRICE DETAILS ({finalItems.length} Items)</h4>

        <div className="price-item-row">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="price-item-row">
          <span>Discount on MRP</span>
          <span className="text-discount-green">-₹{totalDiscount}</span>
        </div>

        {couponApplied && (
          <div className="price-item-row">
            <span>Coupon Discount</span>
            <span className="text-discount-green">-₹{couponDiscount}</span>
          </div>
        )}

        <div className="price-item-row">
          <span>
            Convenience Fee <span className="know-more">Know More</span>
          </span>
          <span>₹{CONVENIENCE_FEES}</span>
        </div>

        <div className="price-divider"></div>

        <div className="price-item-row total-row">
          <span>Total Amount</span>
          <span className="final-price-value">₹{finalPayment}</span>
        </div>

        {totalDiscount + couponDiscount > 0 && (
          <div className="total-savings-banner">
            You will save ₹{totalDiscount + couponDiscount} on this order
          </div>
        )}

        <button
          className="btn-place-order"
          disabled={orderPlaced}
          onClick={handlePlaceOrder}
        >
          {orderPlaced ? "PROCESSING ORDER..." : "PLACE ORDER"}
        </button>

        <div className="secure-payment-assurance">
          <RiShieldCheckLine className="shield-icon" />
          <span>100% Secure Payments & Genuine Products</span>
        </div>
      </div>
    </div>
  );
};

export default BagSummary;
