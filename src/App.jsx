import { useEffect, useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@douyinfe/semi-ui";
import { train } from "./nn";
import "./App.css";

const App = () => {
  const [trainning, setTranning] = useState(false);
  const [predictData, setPredictData] = useState(new Array(21).fill(0));
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState([]);

  const ephochCb = async (predictions, epoch, logs) => {
    setEpoch(epoch);
    if (epoch % 10 !== 0) {
      return;
    }
    const predictionsData = await predictions.array();
    setPredictData(predictionsData.map((v) => v[0]));
    setLoss((loss) => [...loss, logs.loss]);
  };

  const trainNN = async () => {
    setTranning(true);
    train(ephochCb, () => {
      setTranning(false);
    });
  };

  useEffect(() => {
    console.log(loss);
  }, [loss]);

  const modelOptions = {
    xAxis: {
      type: "category",
      data: [
        0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
        0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
      ],
    },
    yAxis: {
      min: -0.2, // 设置 y 轴最小值为 0
      max: 1.5, // 设置 y 轴最大值为 100
      type: "value",
    },
    series: [
      {
        data: predictData,
        type: "line",
      },
      {
        // 新增的散点系列
        type: "scatter",
        data: [
          { name: "Point 1", value: [0, 0] },
          { name: "Point 2", value: [10, 1] },
          { name: "Point 3", value: [20, 0] },
        ],
        symbolSize: 20, // 点的大小
      },
    ],
  };

  const lossOptions = {
    xAxis: {
      type: "category",
      data: Array.from({ length: loss.length }, (_, index) => index + 1),
    },
    yAxis: {
      max: 0.3,
      min: 0,
      type: "value",
    },
    series: [
      {
        data: loss,
        type: "line",
      },
    ],
  };

  return (
    <>
      <Button onClick={trainNN} loading={trainning}>
        开始训练
      </Button>
      <div>训练轮次{epoch}</div>
      <div style={{ display: "flex" }}>
        <div>
          <ReactECharts
            option={modelOptions}
            style={{ height: "400px", width: "500px" }}
          />
          <div>模型拟合情况</div>
        </div>
        <div>
          <ReactECharts
            option={lossOptions}
            style={{ height: "400px", width: "500px" }}
          />
          <div>模型误差</div>
        </div>
      </div>
    </>
  );
};

export default App;
