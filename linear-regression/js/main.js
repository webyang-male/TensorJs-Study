import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from "@tensorflow/tfjs";

window.onload = async () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 3, 5, 7];

  tfvis.render.scatterplot(
    { name: "线性回归训练集" },
    //x,y轴数值
    { values: xs.map((x, i) => ({ x, y: ys[i] })) },
    //扩展x,y轴长度,美化展示效果
    { xAxisDomain: [0, 5], yAxisDomain: [0, 10] }
  );

  const model = tf.sequential(); //创建连续模型
  //模型添加层
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

  //模型编译
  //optimizer设置优化器
  model.compile({
    loss: tf.losses.meanSquaredError, //损失函数
    optimizer: tf.train.sgd(0.115), //学习率
  });

  //训练模型
  const inputs = tf.tensor(xs);
  const labels = tf.tensor(ys);

  await model.fit(inputs, labels, {
    batchSize: 4, //每次训练的样本数量
    epochs: 80, //训练次数
    callbacks: tfvis.show.fitCallbacks(
      {
        name: "训练过程可视化", //图表名称
      },
      ["loss"] //训练过程中显示的参数
    ),
  });

  //计算模型预测值

  // const output = model.predict(tf.tensor([5])); //输入值
  // output.print(); //输出预测值
  // console.log(output.dataSync()[0]); //输出预测值
  // alert("预测值为:" + output.dataSync()[0]); //输出预测值

  let userInputValue = prompt("您要输入预测Y轴值的X值为", "");
  let newInputValue = Number(userInputValue);
  let flag = Number.isFinite(newInputValue);

  let initialFn = (newInputValue) => {
    if (newInputValue > 0) {
      const output = model.predict(tf.tensor([newInputValue]));
      alert(
        `如果输入值 x 为 ${newInputValue}，那么预测值 y 为 ${
          output.dataSync()[0]
        }`
      );
    }
  };
 

  if (flag && newInputValue > 0) {
      initialFn(newInputValue);
  } else if (flag != true) {
    confirm("非法输入!请输入大于0的数字:>");
    let userInputValue = prompt("您要输入预测Y轴值的X值为", "");
    let newInputValue = Number(userInputValue);
    initialFn(newInputValue);
  } else if (flag && newInputValue < 0) {
    confirm("请输入大于0的数字好嘛亲?");
    let userInputValue = prompt("您要输入预测Y轴值的X值为", "");
    let newInputValue = Number(userInputValue);
    initialFn(newInputValue);
  } else if (newInputValue == 0) {
    return false;
  }
};
