import React from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";
import ScrollToTop from "./utils/ScrollToTop";
import Dashboard from "./views/Dashboard";
import Education from "./components/Education/Education";
import Home from "./components/Home/Home";
import Life from "./components/Life/Life";
import Detail from "./SustainableLife/Details/Detail";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/life" element={<Life />} />
            <Route path="/life/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
