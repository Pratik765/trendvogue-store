import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Bag = () => {
  const bagItemIds = useSelector((store) => store.bag);

  return (
    <main className="bag-main-wrapper">
      <div className="bag-nav-breadcrumb">
        <Link to="/" className="back-to-shop-link">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>

      <div className="bag-layout-grid">
        <div className="bag-products-column">
          <BagItem />
        </div>
        {bagItemIds.length > 0 && (
          <div className="bag-summary-column">
            <BagSummary />
          </div>
        )}
      </div>
    </main>
  );
};

export default Bag;
