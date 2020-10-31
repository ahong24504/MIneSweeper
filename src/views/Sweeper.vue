<template>
  <div class="sweeper">
    <div class="inside-sweeper">
      <nav-bar></nav-bar>
      <re-start :Timer="Timer"></re-start>
      <main-frame @timerInfo="changeTimer"></main-frame>
    </div>
  </div>
</template>

<script>
import ReStart from "./ChildrenSweeper/ReStart";
import NavBar from "./ChildrenSweeper/NavBar";
import MainFrame from "./ChildrenSweeper/MainFrame";

export default {
  name: "Sweeper",
  data() {
    return {
      Timer: "",
    };
  },
  components: {
    ReStart,
    NavBar,
    MainFrame,
  },
  methods: {
    changeTimer(val) {
      if (val === "start" && this.Timer === "start") return;
      if (val === "start" && this.Timer !== "start") this.Timer = val;
      if (val === "end") this.Timer = val;
      console.log(this.Timer)
    },
  },
};
</script>

<style scoped>
.sweeper {
  min-width: 1200px;
  background: rgb(242, 245, 242);
  /* height: 5000px; */
}
.inside-sweeper {
  margin: auto;
  width: 1200px;
  background: rgb(235, 243, 235);
  height: 320px;
}
</style>