import { CDN_URL } from "../utils/constants";

const ItemList = ({ items}) => {
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
          <div className="w-2/6 p-4">
              <button className="p-2 absolute rounded-lg bg-black text-white shadow-lg">
                Add +
              </button>
            <img src={CDN_URL + item.card.info.imageId} className="w-48 h-36 object-cover "  />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;