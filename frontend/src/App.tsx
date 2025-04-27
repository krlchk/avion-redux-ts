import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { AboutPage } from "./pages/about-page/about-page";
import { AllProductsPage } from "./pages/all-products-page";
import { ProductListingPage } from "./pages/product-listing-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/allproducts" element={<AllProductsPage />} />
        <Route path="/products/:id" element={<ProductListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
