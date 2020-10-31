<template>
  <div class="nav-bar">
    <div class="inner-bar">
      <a href="javascript:;">游戏</a>
      <a href="javascript:;">待开发</a>
      <a href="javascript:;">关于</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar{
  background-color: rgb(231, 220, 220);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, .1);
}
.inner-bar{
  overflow: hidden;/**span浮动高度塌陷，给父元素开启BFC */
}
.inner-bar>a{
  float: left;
  height: 30px;
  font-family: "微软雅黑";
  line-height: 30px;
  margin: 5px 10px;
  padding: 0 15px;
  text-decoration: none;
  color: #333;
}
.inner-bar>a:hover{
    background-color: rgb(57, 57, 241);
    color: #eee;
}
</style>