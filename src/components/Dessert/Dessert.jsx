import { useState, useEffect } from "react";
import axios from "axios";
import "./Dessert.scss";

function Dessert() {
  const [wineList, setWineList] = useState([]);
  const [dessertOptions, setDessertOptions] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState("");
  const [matchingWines, setMatchingWines] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // capitalize the first letter of a string in dessert pairing options
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getAllWineList = async () => {
      try {
        const response = await axios.get(
          // const response = await axios.get("http://localhost:8080/data/");
          "https://wine-me-up-95e2bb54d26d.herokuapp.com/data/dessert"
        );
        setWineList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWineList([]);
      }
    };

    getAllWineList();
  }, []);

  // Extract unique dessert options from wine list and clean the source of info
  useEffect(() => {
    const extractOptions = () => {
      const uniqueDessertOptions = new Set();

      wineList.forEach((wine) => {
        const dessertPairings = wine.dessert_pairing
          .split(/\s*(?:,|\bor\b)\s*/)
          .map(capitalizeFirstLetter);

        dessertPairings.forEach((pairing) => uniqueDessertOptions.add(pairing));
      });

      setDessertOptions(Array.from(uniqueDessertOptions).sort());
    };

    extractOptions();
  }, [wineList]);

  // Reset matching wines and submission status when dessert option changes
  useEffect(() => {
    setMatchingWines([]);
    setSubmitted(false);
  }, [selectedDessert]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const selectedDessertWines = [];

    // Transform selected dessert to lowercase so it is case insensitive when compared
    const lowercaseSelectedDessert = selectedDessert.toLowerCase();

    // Filter wines based on selected dessert
    wineList.forEach((wine) => {
      const dessertPairings = wine.dessert_pairing.split(/\s*(?:,|\bor\b)\s*/);

      dessertPairings.forEach((pairing) => {
        if (
          lowercaseSelectedDessert &&
          pairing.toLowerCase() === lowercaseSelectedDessert
        ) {
          selectedDessertWines.push(wine);
        }
      });
    });

    // Select one matching wine for the dessert pairing
    const matchingWines = selectedDessertWines.slice(0, 1);

    setMatchingWines(matchingWines);
    setSubmitted(true);
  };

  // Check if form submission is disabled
  const isSubmitDisabled = !selectedDessert;
  const isDessertSelected = !!selectedDessert;

  return (
    <div className="dessert_cards--container">
      {!submitted && (
        <form onSubmit={handleFormSubmit}>
          {/* Dessert Pairing Options */}
          <div className="dessert--container--options">
            <label htmlFor="dessert">Select Dessert:</label>
            <select
              id="dessert"
              value={selectedDessert}
              onChange={(e) => setSelectedDessert(e.target.value)}
              className="dessert-selected"
            >
              <option className="dessert_option" value="">
                Select Dessert Option
              </option>
              {dessertOptions.map((option, index) => (
                <option
                  className="dessert_option--selected"
                  key={index}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Display Submit Button */}
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

      {/* Display selected Pairings */}
      {submitted && (
        <div className="dessertpairings--container">
          <div className="pairings__header--container">
            {isDessertSelected && (
              <div className="dessertpairings__header--wrapper">
                <h2>Dessert Pairing:</h2>
                <div className="header--wrapper--results">
                  <p>{selectedDessert}</p>
                </div>
              </div>
            )}
          </div>
          {/* Display matching wines */}
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

export default Dessert;
