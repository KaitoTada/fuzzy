// 2019 12.06
// made by Kaito Tada

// ファジィ推論とその応用1

let Fuzzy = function (start, end, flip = false){
  this.start = start;
  this.end = end;
  this.startVal = Number(flip);
  this.endVal = Number(!flip);
  this.slope = (this.endVal - this.startVal) / (this.end - this.start);

  // 出力値
  this.getT = function (x) {
    return (x <= this.start)? this.startVal
          : (x >= this.end)? this.endVal
          : this.startVal + this.slope * (x - this.start);
  };
}

Fuzzy.prototype = {
  /*
  論理演算
  x: オブジェクトのx地点
  fuzzy: 演算するFuzzyオブジェクトまたは値
  */
  and: function(x, fuzzy) {
    return Math.min(
      this.getT(x), fuzzy.getT(x));
  },

  or : function(x, fuzzy){
    return Math.max(
      this.getT(x), fuzzy.getT(x));
  },
  not : function(x){
    return 1 - this.getT(x);
  }
};

// サブクラス
// 三角形(引数:始点，頂点，終点)
Fuzzy.Triangle = function(start, apex, end){
  let fuzzyUp = new Fuzzy(start, apex);
  let fuzzyDown = new Fuzzy(apex, end, true);
  let Triangle = function(){
    this.getT = function(x){
      return fuzzyUp.and(x, fuzzyDown);
    }
  }
  return new Triangle();
}

// 台形(引数:上がりの始点，上がりの頂点，下がりの始点，下がりの終点)
Fuzzy.Trapezoid = function(upStart, upEnd, downStart, downEnd){
  let fuzzyUp = new Fuzzy(upStart, upEnd);
  let fuzzyDown = new Fuzzy(downStart, downEnd, true);
  let Trapezoid = function(){
    this.getT = function(x){
      return fuzzyUp.and(x, fuzzyDown);
    }
  }
  return new Trapezoid();
}
