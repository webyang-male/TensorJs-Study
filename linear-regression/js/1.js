let userInputValue = prompt("您要输入预测Y轴值的X值为", "");
let newInputValue = Number(userInputValue);
let flag = Number.isFinite(newInputValue);

let initialFn = (newInputValue, flag) => {
  if (flag && newInputValue > 0) {
    let predictFn = (newInputValue) => {
      const output = model.predict(tf.tensor2d([newInputValue], [1, 1]));
      const value = output.dataSync();
      alert(`预测值为${value}`);
    };
    predictFn(newInputValue);
  }
};

let flagFn = (newInputValue) => {
  return (
    newInputValue != 0 &&
    newInputValue != null &&
    newInputValue != undefined &&
    newInputValue != "" &&
    newInputValue != false
  );
};

if (flagFn()) {
  if (initialFn()) {
  } else {
    alert("请输入大于0的数字好嘛亲?");
    initialFn();
  }
}
