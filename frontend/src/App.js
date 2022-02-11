import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reviews from "./pages/Reviews";

import Navigationbar from "./features/Navigationbar";
import PrivateRoute from "./features/private/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews" element={<PrivateRoute />}>
            <Route path="/reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
