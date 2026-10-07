import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";

const BagMessage = () => {
  return (
    <div className="empty-bag-card">
      <div className="empty-bag-icon-wrap">
        <FaBagShopping className="empty-bag-icon" />
      </div>
      <h2 className="empty-bag-title">Hey, it feels so light!</h2>
      <p className="empty-bag-desc">
        There is nothing in your bag. Let's add some trendy items to explore.
      </p>
      <Link to="/" className="btn-shop-now">
        ADD ITEMS FROM WISHLIST / HOME
      </Link>
    </div>
  );
};

export default BagMessage;
