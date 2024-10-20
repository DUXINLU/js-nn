import { useEffect, useState, useRef } from "react";
import { Nav } from "@douyinfe/semi-ui";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SimpleNN } from "./simple_nn/SimpleNN";
import { YoloApp } from "./yolo/YoloApp";
import { ASRT } from "./asrt";
import "./index.css";

const App = () => {
  useEffect(() => {}, []);
  return (
    <Router>
      <div className="navContainer">
        <div className="navItem">
          <Link to="/SimpleNN">极简神经网络</Link>
        </div>
        <div className="navItem">
          <Link to="/YoloV7">实时图片识别</Link>
        </div>
        <div className="navItem">
          <Link to="/ASRT">实时语音识别</Link>
        </div>
      </div>
      <Routes>
        <Route path="/SimpleNN" exact Component={SimpleNN} />
        <Route path="/YoloV7" Component={YoloApp} />
      </Routes>
    </Router>
  );
};

export default App;
