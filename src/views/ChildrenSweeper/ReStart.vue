<template>
  <div class="nav-bar">
    <div>
      <slot name="bombCount">
        <span> BOMB:{{ bombCount - this.$store.state.flag }} </span>
      </slot>
    </div>
    <div>
      <slot name="reStart">
        <a href="javascript:;">
          <img src="../../assets/smile.svg" alt="" v-if="!isWin" />
          <img src="../../assets/cry.svg" alt="" v-else />
        </a>
      </slot>
    </div>
    <div>
      <slot name="time"> TIME:{{ time }} </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReStart",
  data() {
    return {
      bombCount: 70,
      time: "",
      isOver: false,
      isWin: false,
    };
  },
  props: {
    Timer: {
      type: String,
      default: "默认的Timer",
    },
  },
  watch: {
    Timer(newVal,oldVal){
      console.log(newVal + "-" + oldVal)
      console.log(oldVal === "")
    }
  },
  
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 35px;
  line-height: 35px;
  font-family: "Times New Roman";
  font-size: 20px;
  color: rgb(56, 52, 52);
  padding: 5px 0;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
}
.nav-bar > * {
  flex: 1;
  text-align: center;
}
.nav-bar img {
  width: 35px;
}
</style>