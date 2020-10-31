<template>
  <div class="main-frame">
    <a href="javascript:;" class="grid">
      <div
        @contextmenu.prevent="rightClick(index)"
        @click="leftClick(index)"
        v-for="(item, index) in bombInfo"
        :key="index"
        class="grid-box"
      >
        <img
          src="../../assets/search.svg"
          alt=""
          v-if="bombInfo[index].stateInfo === 0"
        /><img
          src="../../assets/flag.svg"
          alt=""
          v-else-if="bombInfo[index].stateInfo === 1"
        /><img
          src="../../assets/mark.svg"
          alt=""
          v-else-if="bombInfo[index].stateInfo === 2"
        /><img
          src="../../assets/bomb.svg"
          alt=""
          v-else-if="bombInfo[index].stateInfo === -2"
        />
        <span
          v-else-if="bombInfo[index].stateInfo === -1"
          v-show="bombInfo[index].bombNum !== 0"
        >
          {{ bombInfo[index].bombNum }}
        </span>
        <!-- <span>{{bombInfo[index].bombNum}}</span> -->
      </div>
    </a>
  </div>
</template>

<script>
import { stochastic, Bomb, changeArrGroup, blend } from "../../assets/tools.js";
export default {
  name: "MainFrame",
  data() {
    return {
      bombInfo: [],
    };
  },
  watch: {
    flagNum: function (newVal, oldVal) {
      // this.$store.dispatch("flagValChange",newVal)
      if (newVal > oldVal) {
        this.$store.dispatch("addFlagVal");
      } else {
        this.$store.dispatch("reduceFlagVal");
      }
    },
  },
  computed: {
    flagNum() {
      let c = 0;
      for (let i in this.bombInfo) {
        if (this.bombInfo[i].stateInfo === 1) c++;
      }
      return c;
    },
  },
  methods: {
    rightClick(index) {
      if (this.bombInfo[index].stateInfo < 0) {
        return;
      } else if (this.bombInfo[index].stateInfo === 2) {
        this.bombInfo[index].stateInfo = 0;
      } else {
        this.bombInfo[index].stateInfo++;
      }
    },
    leftClick(index) {
      if (
        this.bombInfo[index].isOpen === true ||
        this.bombInfo[index].stateInfo === 1
      )
        return; //若格子已经是打开的 或者 格子上面是个问号，直接return
      if (this.bombInfo[index].bombState === true) {
        for (let i in this.bombInfo) {
          if (this.bombInfo[i].bombState === true) {
            this.bombInfo[i].stateInfo = -2;
            this.bombInfo[i].isOpen = true;
          }
        }
        setTimeout(() => {
          if (confirm("踩雷了，点击确定重新开始，点击取消关闭游戏")) {
            this.$store.dispatch("flegCE")
            this.$router.go(0);
          } else {
            window.open("about:blank", "_self").close();
          }
        }, 500);
      }
      // if (this.bombInfo[index].bombState !== true) {
      //   this.bombInfo[index].stateInfo = -1;
      //   this.bombInfo[index].isOpen = true;
      //   console.log(this.bombInfo);
      // } else {
      //   for (let i in this.bombInfo) {
      //     if (this.bombInfo[i].bombState === true) {
      //       this.bombInfo[i].stateInfo = -2;
      //     }
      //   }
      //   setTimeout(() => {
      //     if (confirm("踩雷了，点击确定重新开始，点击取消关闭游戏")) {
      //       this.$router.go(0);
      //     } else {
      //       window.open("about:blank", "_self").close();
      //     }
      //   }, 100);
      // }

      // 点击后顺便打开周围不是雷的格子，递归

      let openCell = (arry, i, j) => {
        let secendArry = arry;
        // 如果这个格子是开的，直接return
        if (secendArry[i][j].isOpen || secendArry[i][j].bombState) return; //跳出递归

        if (secendArry[i][j].bombState === false) {
          secendArry[i][j].isOpen = true;
          secendArry[i][j].stateInfo = -1;
        }
        if (secendArry[i][j].bombNum === 0) {
          // console.log("hahah")
          /**
           * 写到这了
           */
          if (
            i > 0 &&
            j > 0 &&
            /^[0-8]*$/.test(secendArry[i - 1][j - 1].bombNum)
          )
            openCell(secendArry, i - 1, j - 1);
          if (i > 0 && /^[0-8]*$/.test(secendArry[i - 1][j].bombNum))
            openCell(secendArry, i - 1, j);
          if (
            i > 0 &&
            j < 29 &&
            /^[0-8]*$/.test(secendArry[i - 1][j + 1].bombNum)
          )
            openCell(secendArry, i - 1, j + 1);
          if (j > 0 && /^[0-8]*$/.test(secendArry[i][j - 1].bombNum))
            openCell(secendArry, i, j - 1);
          if (j < 29 && /^[0-8]*$/.test(secendArry[i][j + 1].bombNum))
            openCell(secendArry, i, j + 1);
          if (
            i < 15 &&
            j > 0 &&
            /^[0-8]*$/.test(secendArry[i + 1][j - 1].bombNum)
          )
            openCell(secendArry, i + 1, j - 1);
          if (i < 15 && /^[0-8]*$/.test(secendArry[i + 1][j].bombNum))
            openCell(secendArry, i + 1, j);
          if (
            i < 15 &&
            j < 29 &&
            /^[0-8]*$/.test(secendArry[i + 1][j + 1].bombNum)
          )
            openCell(secendArry, i + 1, j + 1);
        }
      };

      // 通过一维数组下标算出二维数组的下标
      let i = parseInt(index / 30); //i = 16  j = 30
      let j = index % 30;
      // 把一维数组拆成已知长度的二维数组
      let secendArry = changeArrGroup(this.bombInfo, 30);

      openCell(secendArry, i, j);
    },
  },
  created() {
    // 定义一个长度为480的一维数组
    let newArry = new Array(480);

    // 数组前40个元素为雷，后440个不是雷
    for (let i = 0; i < 480; i++) {
      if (i < 60) {
        newArry[i] = new Bomb(true, 0);
      } else {
        newArry[i] = new Bomb(false, 0);
      }
    }

    // 对象浅克隆
    this.bombInfo = JSON.parse(JSON.stringify(newArry));
    // 不用克隆也可以，直接 this.bombInfo = newArry,

    // 给Arry原型上加一个打乱元素位置的函数，C
    blend();

    // derangedArray()方法将数组内部元素顺序随机打乱，使雷方块随机混入到正常方块中
    this.bombInfo = this.bombInfo.derangedArray();

    // 查看炸弹位置
    // for (let i in this.bombInfo) {
    //   if (this.bombInfo[i].bombState === true) {
    //     console.log(i);
    //   }
    // }

    // 把一维数组拆成已知长度的二维数组
    let secendArry = changeArrGroup(this.bombInfo, 30);
    // console.log(secendArry);

    // 给格子计算周围雷的数量,C
    for (let i = 0; i < secendArry.length; i++) {
      for (let j = 0; j < secendArry[0].length; j++) {
        if (secendArry[i][j].bombState === true) continue;
        let c = 0;
        if (i > 0 && j > 0 && secendArry[i - 1][j - 1].bombState === true) c++;

        if (i > 0 && secendArry[i - 1][j].bombState == true) c++;
        if (i > 0 && j < 29 && secendArry[i - 1][j + 1].bombState == true) c++;
        if (j > 0 && secendArry[i][j - 1].bombState == true) c++;
        if (j < 29 && secendArry[i][j + 1].bombState == true) c++;
        if (i < 15 && j > 0 && secendArry[i + 1][j - 1].bombState == true) c++;
        if (i < 15 && secendArry[i + 1][j].bombState == true) c++;
        if (i < 15 && j < 29 && secendArry[i + 1][j + 1].bombState == true) c++;
        secendArry[i][j].bombNum = c;
      }
    }
    // 二维数组转一维数组，抄的
    // this.bombInfo = [].concat.apply([], secendArry)
  },
};
</script>

<style scoped>
* a {
  text-decoration: none;
  color: red;
}
.grid-box {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(223, 209, 209);
  float: left;
  border-radius: 5px;
  padding: 5px;
}

.grid > div > img {
  width: 30px;
  display: block;
}
</style>