
// 生成min，max之间随机整数
export function stochastic(min, max) {
  parseInt(Math.random() * (max - min + 1) + min, 10);
  let result = Math.floor(Math.random() * (max - min + 1) + min);
  return result
}

export class Bomb {
  constructor(parm, info,isOpen=false) {
    this.bombState = parm
    this.stateInfo = info
    this.isOpen = isOpen
  }
}

// 均匀拆分一维数组
export function changeArrGroup(arr, newArrLength) {
  let secondArr = [];
  for (let i = 0; i < arr.length; i += newArrLength) {
    let tempArr = [];
    for (let j = 0; j < newArrLength && i + j < arr.length; j++) {
      tempArr.push(arr[i + j]);
    }
    secondArr.push(tempArr);
  }
  return secondArr;
}

//blend，将数组内元素打乱顺序
export function blend() {
  if (!Array.prototype.derangedArray) {
    Array.prototype.derangedArray = function () {
      for (
        var j, x, i = this.length;
        i;
        j = parseInt(Math.random() * i),
        x = this[--i],
        this[i] = this[j],
        this[j] = x
      );
      return this;
    };
  }
}