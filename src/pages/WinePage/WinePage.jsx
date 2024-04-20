import { useState } from "react";
import WineCards from "../../components/WineCards/WineCards";
import FoodCards from "../../components/FoodCards/FoodCards";
import ChatGPTCards from "../../components/ChatGPTCards/ChatGPTCards";
import Dessert from "../../components/Dessert/Dessert";
import "./WinePage.scss";

function WinePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    wine_type: "",
    wine_varietals: "",
    food_pairing: "",
    appetizer_pairing: "",
  });
  const [foodSelected, setFoodSelected] = useState(false); // Track if food pairing is selected
  const [showSweetToothButton, setShowSweetToothButton] = useState(true); // Track visibility of "I have a sweet tooth" button

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
    setFoodSelected(false); // Reset food selection status
  };

  const handlePickyButtonClick = () => {
    setSelectedOption("chatgpt");
  };

  const handleFoodSelection = () => {
    setFoodSelected(true); // Set food selection status to true when food pairing is selected
  };

  const handleSweetToothButtonClick = () => {
    setSelectedOption("dessert"); // Set selected option to "dessert"
    setShowSweetToothButton(false); // Hide the "I have a sweet tooth" button when dessert page is shown
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
          {/* Render "I have a sweet tooth" button only when food is selected and not already on the Dessert page */}
          {foodSelected && showSweetToothButton && (
            <div className="sweet_tooth_button--container">
              <button
                className="sweet_tooth_button"
                onClick={handleSweetToothButtonClick}
              >
                I have a sweet tooth
              </button>
            </div>
          )}
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
            {!selectedOption && (
              <div className="picky__button__container">
                <button
                  className="picky__button"
                  onClick={handlePickyButtonClick}
                >
                  I AM PICKY!
                </button>
              </div>
            )}
            {selectedOption === "wine" && <WineCards formData={formData} />}
            {selectedOption === "chatgpt" && <ChatGPTCards />}
            {selectedOption === "food" && (
              <FoodCards
                formData={formData}
                onFoodSelect={handleFoodSelection} // Pass a callback to handle food selection
              />
            )}
            {selectedOption === "dessert" && <Dessert />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default WinePage;
