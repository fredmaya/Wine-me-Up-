import "./WineCards.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function WineCards() {
  const [wineList, setWineList] = useState([]);
  const [selectedWineType, setSelectedWineType] = useState("");
  const [wineVarietals, setWineVarietals] = useState([]);
  const [selectedWineVarietal, setSelectedWineVarietal] = useState("");
  const [pairings, setPairings] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getAllWineList = async () => {
      try {
        const response = await axios.get(
          // const response = await axios.get("http://localhost:8080/data/");
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

  // Function to extract unique wine varietals and sort them alphabetically
  const extractUniqueWineVarietals = () => {
    const uniqueWineVarietals = new Set();
    wineList.forEach((wine) => {
      uniqueWineVarietals.add(wine.wine);
    });
    // Convert Set to array and sort alphabetically
    return Array.from(uniqueWineVarietals).sort();
  };

  useEffect(() => {
    setWineVarietals(extractUniqueWineVarietals());
  }, [wineList]);

  const handleWineTypeSelection = async (event) => {
    const selectedType = event.target.value;
    setSelectedWineType(selectedType);
    setSelectedWineVarietal("");

    try {
      const response = await axios.get(
        // const response = await axios.get(`http://localhost:8080/data/${selectedType}`);
        `https://wine-me-up-95e2bb54d26d.herokuapp.com/data/${selectedType}`
      );
      setWineList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setWineList([]);
    }
  };

  useEffect(() => {
    setWineVarietals(extractUniqueWineVarietals());
  }, [wineList]);

  useEffect(() => {
    setPairings({});
  }, [selectedWineVarietal]);

  // Function to apply typing animation after component renders
  useEffect(() => {
    const listItemElements = document.querySelectorAll(".typing-animation");
    listItemElements.forEach((item) => {
      item.classList.add("typing");
    });
  }, [pairings]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const winePairings = {};
    const uniqueFoodPairings = new Set();
    const uniqueAppetizerPairings = new Set();

    wineList.forEach((wine) => {
      if (wine.wine === selectedWineVarietal) {
        const foodPairings = wine.food_pairing.split(/\s*(?:,|\bor\b)\s*/);
        const appetizerPairings =
          wine.appetizer_pairing.split(/\s*(?:,|\bor\b)\s*/);

        foodPairings.forEach((pairing) => uniqueFoodPairings.add(pairing));
        appetizerPairings.forEach((pairing) =>
          uniqueAppetizerPairings.add(pairing)
        );
      }
    });

    winePairings.food = Array.from(uniqueFoodPairings);
    winePairings.appetizer = Array.from(uniqueAppetizerPairings);
    setPairings(winePairings);
    setSubmitted(true);
  };

  // Extract all unique sentences from food_pairing and appetizer_pairing without duplicates
  const extractUniqueSentences = () => {
    const uniqueAppetizerSentences = new Set();
    const uniqueFoodSentences = new Set();

    wineList.forEach((item) => {
      const foodPairingSentences =
        item.food_pairing.split(/\s*(?:,|\bor\b)\s*/);
      const appetizerPairingSentences =
        item.appetizer_pairing.split(/\s*(?:,|\bor\b)\s*/);

      // Add unique sentences from food pairing
      foodPairingSentences.forEach((sentence) => {
        if (sentence.trim() !== "")
          uniqueFoodSentences.add(sentence.toLowerCase());
      });

      // Add unique sentences from appetizer pairing
      appetizerPairingSentences.forEach((sentence) => {
        if (sentence.trim() !== "")
          uniqueAppetizerSentences.add(sentence.toLowerCase());
      });
    });

    // Convert Sets to arrays, sort alphabetically, and return
    const sortedUniqueAppetizerSentences = Array.from(
      uniqueAppetizerSentences
    ).sort();
    const sortedUniqueFoodSentences = Array.from(uniqueFoodSentences).sort();

    return {
      appetizers: sortedUniqueAppetizerSentences,
      food: sortedUniqueFoodSentences,
    };
  };

  // Extract unique sentences when wineList changes, use for food_pairing and appetizer_pairing selection in the form
  useEffect(() => {
    const uniqueSentences = extractUniqueSentences();
    console.log("Unique sentences:", uniqueSentences);
  }, [wineList]);

  return (
    <div className="select_wine--container">
      {!submitted && ( // Only render the form if it's not submitted
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="wine_type">Wine Type:</label>
          <br />
          <select
            id="wine_type"
            onChange={handleWineTypeSelection}
            value={selectedWineType}
          >
            <option value="">Select Wine Type</option>
            <option value="red">Red Wines</option>
            <option value="white">White Wines</option>
            <option value="rose">Rose Wines</option>
            <option value="sparkling">Sparkling Wines</option>
          </select>
          <br />

          {/* Wine Varietals */}
          {selectedWineType && (
            <>
              <label htmlFor="wine_varietals">Wine Varietals:</label>
              <br />
              <select
                id="wine_varietals"
                onChange={(event) =>
                  setSelectedWineVarietal(event.target.value)
                }
                value={selectedWineVarietal}
              >
                <option value="">Select Wine Varietals</option>
                {wineVarietals.map((wine, index) => (
                  <option key={index} value={wine}>
                    {wine}
                  </option>
                ))}
              </select>
              <br />
            </>
          )}

          {/* Submit Button */}
          <div className="submit_button--container">
            <button
              className="submit_button"
              type="submit"
              disabled={!selectedWineVarietal}
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Display Pairings */}
      {submitted && ( // Only render pairings if form is submitted
        <>
          <div className="pairings--container">
            <div className="pairings__container--header">
              <h2>{selectedWineVarietal}:</h2>
            </div>
            {pairings.food && (
              <div className="pairings__results">
                <strong>Food Pairings:</strong>

                <ul>
                  {pairings.food.map((pairing, index) => (
                    <li key={index} className="typing-animation">
                      {pairing}.
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {pairings.appetizer && (
              <div className="pairings__results">
                <strong>Appetizer Pairings:</strong>

                <ul>
                  {pairings.appetizer.map((pairing, index) => (
                    <li key={index} className="typing-animation">
                      {pairing}.
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WineCards;

