import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import WinePage from "./pages/WinePage/WinePage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form" element={<WinePage />} />
          <Route path="/about-us" element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
