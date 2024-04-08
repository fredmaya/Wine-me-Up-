// import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import FormPage from "./pages/FormPage/FormPage.jsx";
// import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form" element={<FormPage />} />
          {/* <Route path="/result" element={<ResultPage />} />  */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
