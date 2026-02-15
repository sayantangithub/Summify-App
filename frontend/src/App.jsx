import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewNote from "./pages/ViewNote";
import CreateNote from "./pages/CreateNote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/notes/:id" element={<ViewNote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
