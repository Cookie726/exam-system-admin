<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}
</style>

<style lang="less">
.hidden {
  display: none !important;
}

::-webkit-scrollbar {
  width: 6px;
  height: 10px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // background-color: #555;
  background-color: rgb(104, 104, 104);
}
</style>
