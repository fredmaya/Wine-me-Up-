import { useState, useEffect } from "react";
import axios from "axios";
import "./FoodCards.scss";

function FoodCards({ onFoodSelect }) {
  const [wineList, setWineList] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [appetizerOptions, setAppetizerOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedAppetizer, setSelectedAppetizer] = useState("");
  const [matchingWines, setMatchingWines] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getAllWineList = async () => {
      try {
        const response = await axios.get(
          "https://wine-me-up-95e2bb54d26d.herokuapp.com/data"
        );
        setWineList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWineList([]);
      }
    };

    getAllWineList();
  }, []);

  useEffect(() => {
    const extractOptions = () => {
      const uniqueFoodOptions = new Set();
      const uniqueAppetizerOptions = new Set();

      wineList.forEach((wine) => {
        const foodPairings = wine.food_pairing
          .split(/\s*(?:,|\bor\b)\s*/)
          .map(capitalizeFirstLetter);
        const appetizerPairings = wine.appetizer_pairing
          .split(/\s*(?:,|\bor\b)\s*/)
          .map(capitalizeFirstLetter);

        foodPairings.forEach((pairing) => uniqueFoodOptions.add(pairing));
        appetizerPairings.forEach((pairing) =>
          uniqueAppetizerOptions.add(pairing)
        );
      });

      setFoodOptions(Array.from(uniqueFoodOptions).sort());
      setAppetizerOptions(Array.from(uniqueAppetizerOptions).sort());
    };

    extractOptions();
  }, [wineList]);

  useEffect(() => {
    setMatchingWines([]);
    setSubmitted(false);
  }, [selectedFood, selectedAppetizer]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const selectedFoodWines = [];
    const selectedAppetizerWines = [];

    const lowercaseSelectedFood = selectedFood.toLowerCase();
    const lowercaseSelectedAppetizer = selectedAppetizer.toLowerCase();

    wineList.forEach((wine) => {
      const foodPairings = wine.food_pairing.split(/\s*(?:,|\bor\b)\s*/);
      const appetizerPairings =
        wine.appetizer_pairing.split(/\s*(?:,|\bor\b)\s*/);

      foodPairings.forEach((pairing) => {
        if (
          lowercaseSelectedFood &&
          pairing.toLowerCase() === lowercaseSelectedFood
        ) {
          selectedFoodWines.push(wine);
        }
      });

      appetizerPairings.forEach((pairing) => {
        if (
          lowercaseSelectedAppetizer &&
          pairing.toLowerCase() === lowercaseSelectedAppetizer
        ) {
          selectedAppetizerWines.push(wine);
        }
      });
    });

    const matchingWines = [];
    if (selectedFoodWines.length > 0) {
      matchingWines.push(selectedFoodWines[0]);
    }
    if (selectedAppetizerWines.length > 0) {
      matchingWines.push(selectedAppetizerWines[0]);
    }

    setMatchingWines(matchingWines);
    setSubmitted(true);
    // Call the parent component function to indicate food selection
    onFoodSelect();
  };

  const isSubmitDisabled = !selectedFood && !selectedAppetizer;
  const isFoodSelected = !!selectedFood;
  const isAppetizerSelected = !!selectedAppetizer;

  return (
    <div className="food_cards--container">
      {!submitted && (
        <form onSubmit={handleFormSubmit}>
          <div className="food--container--options">
            <label htmlFor="food">Select Food:</label>
            <select
              id="food"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="food-selected"
            >
              <option className="food_option" value="">
                Select Food Option
              </option>
              {foodOptions.map((option, index) => (
                <option
                  className="food_option--selected"
                  key={index}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="appetizer--container--options">
            <label htmlFor="appetizer">Select Appetizer:</label>
            <select
              id="appetizer"
              value={selectedAppetizer}
              onChange={(e) => setSelectedAppetizer(e.target.value)}
            >
              <option className="food_option" value="">
                Select Appetizer Option
              </option>
              {appetizerOptions.map((option, index) => (
                <option className="food_option" key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="submit_button--container">
            <button
              className="submit_button"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Show Pairings
            </button>
          </div>
        </form>
      )}
      {submitted && (
        <div className="foodpairings--container">
          <div className="pairings__header--container">
            {isFoodSelected && (
              <div className="foodpairings__header--wrapper">
                <h2>Food Pairing:</h2>
                <div className="header--wrapper--results">
                  <p>{selectedFood}</p>
                </div>
              </div>
            )}
            {isAppetizerSelected && (
              <div div className="foodpairings__header--wrapper">
                <h2>Appetizer Pairing:</h2>
                <div className="header--wrapper--results">
                  <p>{selectedAppetizer}</p>
                </div>
              </div>
            )}
          </div>
          <div className="matching__wines--container">
            <div className="matching-wines-wrapper">
              {matchingWines.map((wine) => (
                <div className="matching__wine--results" key={wine.id}>
                  <div className="matching__wine--info">
                    <h3>{wine.winery}</h3>
                    <h3>{wine.wine}</h3>
                    <p className="country">Country: {wine.country}</p>
                  </div>
                  <img src={wine.image} alt={wine.wine} />
                  <p>Price Range: {wine.price_range}</p>
                  <p>{wine.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodCards;
