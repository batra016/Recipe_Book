import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Search from './components/Hero/Search';
import Hero from './components/Hero/Hero';
import Home from './components/Hero/Home';
import Cards from './components/Hero/Cards';
import RecipePage from "./components/Hero/RecipePage";
import { RecipeProvider } from './context/RecipeContext';
import Footer from "./components/Hero/Footer";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const cardsRef = useRef(null); 

  return (
    <RecipeProvider>
      <main className="overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search scrollRef={cardsRef} />
                <Hero />
                <Home handleCategorySelect={setSelectedCategory} />
                <div ref={cardsRef}>
                  <Cards selectedCategory={selectedCategory} />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </main>
    </RecipeProvider>
  );
}

export default App;
