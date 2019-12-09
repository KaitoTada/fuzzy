// 2019 12.06
// made by Kaito Tada

// ファジィ推論とその応用1

// normalize
var normalize = function (start, end, apex) {
  midpoint = (start + end) / 2
  radius = end - midpoint;
  return (apex - midpoint) / radius;
};

// normalize multiple
var normalize_multi = function (start, end, ...apexes) {
  midpoint = (start + end) / 2
  radius = end - midpoint;
  results = [];
  for (let i = 0, max = apexes.length; i < max; i++) {
    results.push((apexes[i] - midpoint) / radius);
  }
  return results;
};

var Plot = function({name, canvas, x_start=-1, x_end=1, roop=100, scale_interval=1}){
  this.name = name;
  this.canvas = document.getElementById(canvas);

  if (!this.canvas.getContext) {
    alert("Not support canvas.");
    exit();
  }

  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.x_start = x_start;
  this.x_end = x_end;
  this.x_delta = (x_end - x_start) / roop;
  this.horizontal_delta = (this.width - 20) / roop;

  // title
  this.ctx.font = "16px sans-serif";
  this.ctx.fillText(name, 10, 20);

  // vertical line
  this.ctx.beginPath();
  this.ctx.moveTo(8, this.height / 4 * 1 - 20);
  this.ctx.lineTo(3, this.height / 4 * 1 - 15);
  this.ctx.lineTo(13, this.height / 4 * 1 - 15);
  this.ctx.fill();

  this.ctx.beginPath();
  this.ctx.moveTo(8, this.height / 4 * 1 - 20);
  this.ctx.lineTo(8, this.height / 4 * 3);
  this.ctx.stroke();

  // horizontal line
  this.ctx.beginPath();
  this.ctx.moveTo(8, this.height / 4 * 3);
  this.ctx.lineTo(this.width - 8, this.height / 4 * 3);
  this.ctx.stroke();
  this.ctx.font = "12px sans-serif";
  let scale = x_start;
  let scale_total = x_end - x_start;
  this.scale_interval = (this.width - 16) / (scale_total / scale_interval);
  for (var i = 8; i <= this.width - 8; i+=this.scale_interval) {
    this.ctx.fillText(scale, i-10, this.height / 4 * 3 + 30);
    scale +=scale_interval;
  }

  this.ctx.beginPath();
  this.ctx.moveTo(this.width - 8, this.height / 4 * 3);
  this.ctx.lineTo(this.width - 13, this.height / 4 * 3 - 5);
  this.ctx.lineTo(this.width - 13, this.height / 4 * 3 + 5);
  this.ctx.fill();
};

Plot.prototype.plot = function (fuzzy, color="red"){
  // plot
  this.ctx.beginPath();
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = color;
  for (let i = 8, x = this.x_start; i <= this.width-16; x+=this.x_delta, i+=this.horizontal_delta) {
    this.ctx.lineTo(i, this.height / 4 * (3 - 2 * fuzzy.getT(x)));
    // console.log("x:", x, " y:", fuzzy.getT(x));
  }
  this.ctx.stroke();
}
