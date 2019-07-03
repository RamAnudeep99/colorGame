var squares = document.querySelectorAll(".square");
var headColor = document.querySelector("h1 span");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#button");
var mode = document.querySelectorAll(".mode");

var numOfSquares = 6;
var colors = randomColorArrayGenerator(numOfSquares);
var goalColor = colors[colorPicker()];

headColor.textContent = goalColor;

function randomColorArrayGenerator(num){
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr[i] = randomColorGenrator();
  }
  return arr;
}

function randomColorGenrator(){
  var a = Number(Math.floor(Math.random()*255 + 1));
  var b = Number(Math.floor(Math.random()*255 + 1));
  var c = Number(Math.floor(Math.random()*255 + 1));
  return "rgb("+a+", "+b+", "+c+")";
}

function colorPicker(){
  var num = Math.floor(Math.random() * colors.length);
  return num;
}

function changeColor(element){
  for (var i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = element;
  }
}

function refresh(){
  reset.textContent = "new colors";
  colors = randomColorArrayGenerator(numOfSquares);
  goalColor = colors[colorPicker()];
  headColor.textContent = goalColor;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    else{
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  message.textContent = "";
}

for (var i = 0; i < mode.length; i++) {
  mode[i].addEventListener("click", function(){
    mode[0].classList.remove("selected")
    mode[1].classList.remove("selected")
    this.classList.add("selected");
    this.textContent === "EASY" ? numOfSquares = 3: numOfSquares = 6;
    refresh();
  })
}

for (var i = 0; i < colors.length; i++) {
  squares[i].style.backgroundColor = colors[i];         //adding initial colors to squares
  squares[i].addEventListener("click", function(){      //adding click event listener
    var pickedColor = this.style.backgroundColor;
    if (pickedColor === goalColor) {
      message.textContent = "Correct!";
      changeColor(goalColor);
      h1.style.backgroundColor = goalColor;
      reset.textContent = "Play again?";
    }
    else {
      this.style.backgroundColor = "rgb(0, 0, 0)";
      message.textContent = "Try again";
    }
  })
}

reset.addEventListener("click", function(){
  refresh();
})
