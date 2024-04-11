import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import WinePage from "./pages/WinePage/WinePage.jsx";
// import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
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
          {/* <Route path="/result" element={<ResultPage />} />  */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
