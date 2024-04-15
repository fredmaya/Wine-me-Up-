import { useState } from "react";
import WineCards from "../../components/WineCards/WineCards";
import FoodCards from "../../components/FoodCards/FoodCards";
import "./WinePage.scss";

function WinePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    wine_type: "",
    wine_varietals: "",
    food_pairing: "",
    appetizer_pairing: "",
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const resetSelection = () => {
    setSelectedOption(null);
    setFormData({
      wine_type: "",
      wine_varietals: "",
      food_pairing: "",
      appetizer_pairing: "",
    });
  };

  return (
    <main className="winePage">
      <div className="form">
        <div className="form__container">
          <div className="form--header">
            <h1>{selectedOption ? "Your Selection:" : "Select Option"}</h1>
          </div>
          <div className="startover__button">
            {selectedOption && (
              <button className="selection__buttons" onClick={resetSelection}>
                Start Over
              </button>
            )}
          </div>
          <div className="result__container">
            {!selectedOption && (
              <div className="selection__cards">
                <div
                  className="selection__cards--wine"
                  onClick={() => handleOptionSelect("wine")}
                >
                  <p> I have a Wine in mind</p>
                </div>

                <div
                  className="selection__cards--food"
                  onClick={() => handleOptionSelect("food")}
                >
                  <p>I have some food in mind</p>
                </div>
              </div>
            )}
            {selectedOption === "wine" && <WineCards formData={formData} />}
            {selectedOption === "food" && <FoodCards formData={formData} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default WinePage;
