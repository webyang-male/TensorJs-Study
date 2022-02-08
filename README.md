# TensorJs-Study
TensorFlow.js 初学代码


### Installation

Before we get started, you'll need to install Node and Yarn or npm, and create a directory for your project. Then, install Parcel into your app using Yarn:

    yarn add --dev parcel

Or when using npm run:

    npm install --save-dev parcel

### 项目运行
根目录执行以下命令
- npm i -S-D 安装项目依赖
- parcel li*/*html     运行线性回归案例
- parcel he*/*html    运行归一化案例
- parcel log*/*html    运行逻辑回归案例

### bug
  parcel 打包时出现 FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of 

memory


    原因：项目大，启动或打包会抛出内存溢出，需要扩展 node 服务器内存


🌠解决办法:


    删除.npmrc 文件（不是 nodejs 安装目录 npm 模块下的那个 npmrc 文件，而是 C:\Users {账户}\ 下的.npmrc 文件）

扩展 node 内存：increase-memory-limit


