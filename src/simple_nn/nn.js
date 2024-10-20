import * as tf from "@tensorflow/tfjs";

// 定义神经网络
function createSimpleNN() {
  const model = tf.sequential();

  // 第一层，输入维度为 1，输出维度为 8，激活函数为 ReLU
  model.add(
    tf.layers.dense({ units: 2, inputShape: [1], activation: "softplus" })
  );

  // 第二层，输出维度为 1
  model.add(tf.layers.dense({ units: 1 }));

  return model;
}

export const train = (epochCb, onFinish) => {
  // 准备数据（示例数据）
  const xs = tf.tensor2d([[0], [0.5], [1]], [3, 1]);
  const ys = tf.tensor2d([[0], [1], [0]], [3, 1]);

  // 实例化模型
  const model = createSimpleNN();

  // 编译模型，定义损失函数和优化器
  model.compile({ loss: "meanSquaredError", optimizer: tf.train.sgd(0.1) });

  const testXs = tf.tensor2d(
    [
      [0.0],
      [0.05],
      [0.1],
      [0.15],
      [0.2],
      [0.25],
      [0.3],
      [0.35],
      [0.4],
      [0.45],
      [0.5],
      [0.55],
      [0.6],
      [0.65],
      [0.7],
      [0.75],
      [0.8],
      [0.85],
      [0.9],
      [0.95],
      [1],
    ],
    [21, 1]
  );

  // 训练模型
  model
    .fit(xs, ys, {
      epochs: 10000,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          // 使用训练好的模型进行预测
          const predictions = model.predict(testXs);
          epochCb(predictions, epoch, logs);
        },
      },
    })
    .then((history) => {
      console.log("Training completed!");
      onFinish();
    })
    .catch((err) => {
      console.error("Error during training:", err);
    });
};
