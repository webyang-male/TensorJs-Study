import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from "@tensorflow/tfjs";

window.onload = async function () {
  const height = [150, 160, 170];
  const weight = [90, 100, 110];

  tfvis.render.scatterplot(
    { name: "身高体重训练表" },
    { values: height.map((h, i) => ({ x: h, y: weight[i] })) },
    { xAxisDomain: [140, 180], yAxisDomain: [85, 140] }
  );

  //归一化
  const inputs = tf.tensor(height).sub(150).div(20);
  inputs.print();
  const labels = tf.tensor(weight).sub(90).div(20);
  labels.print();

  //创建模型
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({
    //编译模型
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.175), //学习率
  });

  //全屏
  let maxFn = () => {
    let maxScreen = document.querySelector(
      "#tfjs-visor-container > div > div.css-mmb2gq.visor-controls > button:nth-child(1)"
    );
    if (maxScreen != undefined) {
      maxScreen.onclick = () => {
        console.log("maxScreen");
      };
      maxScreen.click();
    } else {
      console.log("maxScreen is undefined");
    }
  };

  maxFn();

  //训练模型
  await model.fit(inputs, labels, {
    batchSize: 3, //每次训练的样本数量
    epochs: 150, //训练次数
    callbacks: tfvis.show.fitCallbacks({ name: "训练过程" }, ["loss"]),
  });

  let userInputValue = prompt(
    "请输入您要预测Y轴体重所对应的X轴身高数值(cm)\n只写数值不加单位,Thanks♪(･ω･)ﾉ",
    ""
  );
  let newInputValue = Number(userInputValue);
  let flag = Number.isFinite(newInputValue);

  if (flag && newInputValue > 150) {
    const output = model.predict(tf.tensor([newInputValue]).sub(150).div(20));
    alert(
      `如果身高为 ${newInputValue}cm，那么预测体重为👉 ${
        output.mul(20).add(40).dataSync()[0]
      }kg`
    );
  } else if (flag != true) {
    let userInputValue = prompt(
      "⚠️输入的数据不合法，请重新输入\n您要输入预测 Y轴[体重]值 的 X[身高] 值为",
      ""
    );
    let newInputValue = Number(userInputValue);
    const output = model.predict(tf.tensor([newInputValue]).sub(150).div(20));
    alert(
      `如果身高为 ${newInputValue}cm，那么预测体重为👉 ${
        output.mul(20).add(40).dataSync()[0]
      }kg`
    );
  } else if (newInputValue === 0) {
    alert("输个空值?奶奶滴跟我玩阴滴是吧😅\n刷新页面重新来过吧");
  } else if (newInputValue < 0) {
    confirm("OMG!您一定是二维生物吧,身高都降维了(负值)!😂\n刷新页面重新来过吧");
  } else if (newInputValue > 0 && newInputValue < 150) {
    confirm("您的身高还没纳入到训练范围哦(0cm<身高<=150cm)!");
    let userInputValue = prompt(
      "请输入您要预测Y轴体重所对应的X轴身高数值(cm)\n只写数值不加单位,Thanks♪(･ω･)ﾉ",
      ""
    );
    let newInputValue = Number(userInputValue);
    const output = model.predict(tf.tensor([newInputValue]).sub(150).div(20));
    alert(
      `如果身高为 ${newInputValue}cm，那么预测体重为👉 ${
        output.mul(20).add(40).dataSync()[0]
      }kg`
    );
  }else{
      alert("来访者到底输入了什么未知内容嫩?")
  }
};
