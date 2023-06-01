import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Login from "./app/pages/Login";
import Register from "./app/pages/Register";
import Home from "./app/pages/Home";
import Profile from "./app/pages/Profile";
import Header from "./app/components/Header";
import Footer from "./app/components/Footer";

const App = () => {
    return (
        <Router>
            <div className={"min-vh-100"}>
                <Header/>
                <div className="container p-1 mt-3">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
