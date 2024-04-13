import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import resList from "../utils/MockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // Local State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTopRatedFilterActive, setIsTopRatedFilterActive] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.635009&lng=77.282939&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurants = json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
    setListOfRestaurants(restaurants);
    setFilteredList(restaurants);
  };
  console.log(listOfRestaurants);
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus)
    return (
      <h1 className="text-red-600">
        Looks like you're offline!! Please check your internet connection.
      </h1>
    );

  const handleFilterButtonClick = () => {
    if (isTopRatedFilterActive) {
      // If top-rated filter is active, reset to full list
      setFilteredList(listOfRestaurants);
    } else {
      // If top-rated filter is not active, filter based on top rating
      const filteredRestaurant = listOfRestaurants.filter(
        (res) => res.info.avgRating > 4
      );
      setFilteredList(filteredRestaurant);
    }
    // Toggle the filter state
    setIsTopRatedFilterActive(!isTopRatedFilterActive);
  };

  if (listOfRestaurants.length === 0 && searchText === "") {
    return <Shimmer />;
  } else {
    return (
      <div className="body">
        <div className="filter p-4 flex space-x-6 justify-center">
          <div className="search">
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mr-2"
              placeholder="Search restaurants..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const searchList = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredList(searchList);
              }}
            >
              Search
            </button>
          </div>
          <button
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={()=>handleFilterButtonClick()}
          >
            {isTopRatedFilterActive ? "Show All" : "Top Rated Restaurants"}
          </button>
        </div>
        <div className="res-container flex flex-wrap justify-evenly">
          {filteredList.map((restaurant) => (
            <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}>
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default Body;
