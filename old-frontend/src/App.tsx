import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { AboutPage } from "./pages/AboutPage";
import { AllProductsPage } from "./pages/AllProductsPage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { BasketPage } from "./pages/BasketPage";
import { ProtectedRoute } from "./utils/protectedRoute";
import { SuccessPage } from "./pages/SuccessPage";
import { CancelPage } from "./pages/CancelPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/allproducts" element={<AllProductsPage />} />
        <Route path="/products/:id" element={<ProductListingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route
          path="/basket-page"
          element={
            <ProtectedRoute>
              <BasketPage />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
