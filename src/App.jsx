import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import "./scss/app.scss";

const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<OrderPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
