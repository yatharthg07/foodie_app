import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = resData?.info;
  console.log(sla);
  return (
    <div className="res-card bg-gray-200 p-4 m-4 rounded-lg shadow-md w-[300px] my-4 hover:bg-gray-300" >
      <img
        className="res-logo w-full h-40 object-cover mb-4 rounded "
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <h4 className="text-gray-600">{cuisines.join(", ")}</h4>
      <div className="flex items-center mt-2">
        <span className="mr-2">{avgRating} stars</span>
        <span className="text-gray-600">{costForTwo}</span>
      </div>
      <div className="mt-2">
        <span className="text-gray-600">{sla.slaString} </span>
      </div>
    </div>
  );
};

export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;
    const { aggregatedDiscountInfoV3 } = resData?.info;

    return (
      <div className="relative">
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          {aggregatedDiscountInfoV3.header} - {aggregatedDiscountInfoV3.subHeader}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};




export default RestaurantCard;
