import React, { useState } from "react";
import WineCards from "../../components/WineCards/WineCards";
import FoodCards from "../../components/FoodCards/FoodCards";
// import Footer from "../../components/Footer/Footer";
// import FormPage from "../FormPage/FormPage";
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
    <main>
      <div className="form">
        <div className="form-container">
          <div className="header">
            <h1>{selectedOption ? "Your Selection" : "Select Option"}</h1>
          </div>
          <div className="startover__button">
            {selectedOption && (
              <button className="selection__buttons" onClick={resetSelection}>
                Start Over
              </button>
            )}
          </div>
          <div className="body">
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
