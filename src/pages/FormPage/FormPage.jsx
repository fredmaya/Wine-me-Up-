import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./FormPage.scss";
import Header from "../../components/Header/Header";

function FormPage() {
  const [wineList, setWineList] = useState([]);
  const [selectedWineType, setSelectedWineType] = useState("");
  const [wineVarietals, setWineVarietals] = useState([]);
  const [selectedWineVarietal, setSelectedWineVarietal] = useState("");
  const { wineType } = useParams();

  useEffect(() => {
    const getAllWineList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/data/");
        setWineList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWineList([]);
      }
    };

    getAllWineList();
  }, []);

  // useEffect(() => {
  //   // Call the function to find most common words when wineList changes
  //   const mostCommonWords = findMostCommonWords(wineList);
  //   console.log("Most common words:", mostCommonWords);
  // }, [wineList]); // Run this effect when wineList changes

  const handleWineTypeSelection = async (event) => {
    const selectedType = event.target.value;
    setSelectedWineType(selectedType);

    try {
      const response = await axios.get(
        `http://localhost:8080/data/${selectedType}`
      );
      setWineList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setWineList([]);
    }

    const selectedWine = wineList.find((wine) => wine.type === selectedType);
    if (selectedWine) {
      setWineVarietals(selectedWine.varietals);
    } else {
      setWineVarietals([]);
    }
  };

  // function findMostCommonWords(data) {
  //   const wordsCount = {};
  //   // Loop through each item in the data
  //   data.forEach((item) => {
  //     // Split the food pairing and appetizer pairing strings into words
  //     const foodPairingWords = item.food_pairing.split(/[\s,]+/);
  //     const appetizerPairingWords = item.appetizer_pairing.split(/[\s,]+/);

  //     // Count the occurrences of each word
  //     foodPairingWords.forEach((word) => {
  //       word = word.toLowerCase();
  //       if (word.length > 0) {
  //         wordsCount[word] = (wordsCount[word] || 0) + 1;
  //       }
  //     });

  //     appetizerPairingWords.forEach((word) => {
  //       word = word.toLowerCase();
  //       if (word.length > 0) {
  //         wordsCount[word] = (wordsCount[word] || 0) + 1;
  //       }
  //     });
  //   });

  //   // Convert the wordsCount object into an array of objects for easier sorting
  //   const wordsArray = Object.entries(wordsCount).map(([word, count]) => ({
  //     word,
  //     count,
  //   }));

  //   // Sort the array by word count in descending order
  //   wordsArray.sort((a, b) => b.count - a.count);

  //   // Return the top 5 most common words
  //   return wordsArray.slice(0, 5);
  // }

  return (
    <body>
      <Header />
      <main>
        <div className="form-container">
          <form>
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
                  {wineVarietals.map((variety, index) => (
                    <option key={index} value={variety}>
                      {variety}
                    </option>
                  ))}
                </select>
                <br />
              </>
            )}

            {/* Dish type */}

            <select
              id="dish_type"
              // onChange={handleWineSelection}
              // value={selectedWine}
            >
              <option value="">Select Dish Type</option>
              {/* {wineList.map((wine) => (
            <option key={wine.id} value={wine.id}>
              {wine.name}
            </option> */}
            </select>
            <br />

            {/* Dish */}
            <label htmlFor="wine_type">Dish </label>
            <br />

            <select
              id="dish_type"
              // onChange={handleWineSelection}
              // value={selectedWine}
            >
              <option value="">Select your Dish</option>
              {/* {wineList.map((wine) => (
            <option key={wine.id} value={wine.id}>
              {wine.name}
            </option> */}
            </select>
            <br />
            {/* Appetizer type */}
            <label htmlFor="dish">Appetizer type:</label>
            <br />
            <select
              id="dish_type"
              // onChange={handleWineSelection}
              // value={selectedWine}
            >
              <option value="">Select Appetizer Type</option>
              {/* {wineList.map((wine) => (
            <option key={wine.id} value={wine.id}>
              {wine.name}
            </option> */}
            </select>
            <br />

            {/* Appetizer */}
            <label htmlFor="appetizer">Appetizer:</label>
            <br />

            <select
              id="dish_type"
              // onChange={handleWineSelection}
              // value={selectedWine}
            >
              <option value="">Select Your Appetizer</option>
              {/* {wineList.map((wine) => (
            <option key={wine.id} value={wine.id}>
              {wine.name}
            </option> */}
            </select>
            <br />

            {/* Submit Button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </body>
  );
}

export default FormPage;
