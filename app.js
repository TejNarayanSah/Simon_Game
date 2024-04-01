let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let hScor = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

//starting the gane
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;

    leveUp();
  }
});

//this func treger if update the game sequence or level
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

//this func treger if user click button
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

//upgrading the level
function leveUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  //random btn choose
  gameFlash(randBtn);
}

//checking game sequence and user sequence
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(leveUp, 1000);
    }
  } else {
    if (hScor < level) {
      hScor = level;
    }

    h2.innerHTML = `Game Over! your score was <b>${level}</b><br>Press any key to restart.`;
    h3.innerHTML = `Highest score is: <b>${hScor}</b>`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);

    //calling function if worng sequence enter user
    reset();
  }
}

//pusing the color in user sequence
function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  // checking user sequence and game sequence
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

//reseting the game data
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
