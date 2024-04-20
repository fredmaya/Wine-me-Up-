import { useState } from "react";
import axios from "axios";
import "./PromptCards.scss";

function ChatGPTCards() {
  const [wineBrand, setWineBrand] = useState("");
  const [wineVarietal, setWineVarietal] = useState("");
  const [pairings, setPairings] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Make an API call to ChatGPT with user input
      const response = await axios.post("http://localhost:8080/prompt", {
        prompt: `food and appetizer pairing suggestions for ${wineBrand} ${wineVarietal}`,
      });

      // Extract pairings from the response
      const { data } = response;

      // Set pairings state
      setPairings(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }

    setIsLoading(false);
  };

  return (
    <div className="chatgpt--container">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="wineBrand">Wine Brand:</label>
        <input
          type="text"
          id="wineBrand"
          value={wineBrand}
          onChange={(e) => setWineBrand(e.target.value)}
          required
        />

        <label htmlFor="wineVarietal">Wine Varietal:</label>
        <input
          type="text"
          id="wineVarietal"
          value={wineVarietal}
          onChange={(e) => setWineVarietal(e.target.value)}
          required
        />

        <div className="prompt--button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Pairings"}
          </button>
        </div>
      </form>
      {pairings.food && (
        <div>
          <h3>Food Pairings:</h3>
          <ul>
            {pairings.food.map((pairing, index) => (
              <li key={index}>{pairing}</li>
            ))}
          </ul>
        </div>
      )}
      {pairings.appetizer && (
        <div>
          <h3>Appetizer Pairings:</h3>
          <ul>
            {pairings.appetizer.map((pairing, index) => (
              <li key={index}>{pairing}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChatGPTCards;
