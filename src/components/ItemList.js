import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.card.info.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-4/6">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-2/6 p-4 ">
            <div className="flex absolute bg-slate-200 rounded-md shadow-md">
              <button
                className="p-2 w-1/3 rounded-lg bg-red-500 text-white shadow-lg "
                onClick={() => {
                  handleRemoveItem(item);
                }}
              >
                -
              </button>
              <div className="m-2 w-1/3">
                {getItemQuantity(item.card.info.id)}
              </div>
              <button
                className="p-2 w-1/3 rounded-lg bg-black text-white shadow-lg"
                onClick={() => {
                  handleAddItem(item);
                }}
              >
                +
              </button>
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-48 h-36 object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
