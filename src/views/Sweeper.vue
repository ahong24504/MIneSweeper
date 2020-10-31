<template>
  <div class="sweeper">
    <div class="inside-sweeper">
      <nav-bar></nav-bar>
      <re-start></re-start>
      <main-frame></main-frame>
    </div>
  </div>
</template>

<script>
import ReStart from './ChildrenSweeper/ReStart'
import NavBar from './ChildrenSweeper/NavBar'
import MainFrame from './ChildrenSweeper/MainFrame'

export default {
  name: "Sweeper",
  components:{
    ReStart,
    NavBar,
    MainFrame
  }
};
</script>

<style scoped>
.sweeper {
  min-width: 1200px;
  background: rgb(242, 245, 242);
  /* height: 5000px; */
}
.inside-sweeper{
  margin: auto;
  width: 1200px;
  background: rgb(235, 243, 235);
  height: 320px;
}
</style>