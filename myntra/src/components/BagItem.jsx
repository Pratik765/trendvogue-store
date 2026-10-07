import { useSelector } from "react-redux";
import Item from "./Item";
import BagMessage from "./BagMessage";

const BagItem = () => {
  const bagIds = useSelector((store) => store.bag);
  const items = useSelector((store) => store.item);

  const bagProducts = items.filter((item) => bagIds.includes(item.id));

  if (bagProducts.length === 0) {
    return <BagMessage />;
  }

  return (
    <div className="bag-items-list">
      <div className="bag-items-header-bar">
        <h3>Shopping Bag ({bagProducts.length} items)</h3>
      </div>
      {bagProducts.map((product) => (
        <Item key={product.id} item={product} />
      ))}
    </div>
  );
};

export default BagItem;
