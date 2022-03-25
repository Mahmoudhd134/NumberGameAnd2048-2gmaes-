let btn1 = document.getElementById("startgame");

let box = document.querySelectorAll(".game > *");

btn1.onclick = function () {
  if (btn1.textContent == "Start") {
    btn1.textContent = "End";
    btn1.style.backgroundColor = "#8a8072";
    document.querySelector(".gameBox").style.height = "400px";
    document.querySelector(".game").style.height = "300px";
    document.querySelector(".game").style.opacity = 1;
    for (let i = 0; i < box.length; i++) {
      box[i].style.display = "flex";
    }
    btn1.style.boxShadow = "2px 2px 2px #534837";

    document.querySelector(".finished").style.display = "none";
    document.querySelector(".Congratulations").style.display = "none";

    let nums = [];
    for (let i = 0; i < box.length - 1; i++) {
      nums[i] = i + 1;
    }
    for (let i = 0; i < box.length - 1; i++) {
      let randomIndex = Math.floor(Math.random() * (nums.length - i));
      [nums[randomIndex], nums[nums.length - 1 - i]] = [
        nums[nums.length - 1 - i],
        nums[randomIndex],
      ];
    }
    box[8].setAttribute("id", "empty");

    // to cheat

    // for (let i = 0; i < box.length - 1; i++) {
    //   nums[i] = i + 1;
    // }

    for (let i = 0; i < box.length - 1; i++) {
      box[i].setAttribute("id", nums[i]);
    }
    let randomIndex = Math.floor(Math.random() * box.length);
    [box[8].id, box[randomIndex].id] = [box[randomIndex].id, box[8].id];

    for (let j = 0; j < box.length; j++) {
      if (box[j].id === "empty") box[j].textContent = "";
      else box[j].textContent = box[j].id;
    }
    console.log("***********************reset***************************");
    for (let j = 0; j < box.length; j++) {
      if (getIndexGenerally(box[j]) === +box[j].id - 1) {
        box[j].style.color = "gold";
        box[j].style.textShadow = "0px 0px 5px gold";
      } else {
        box[j].style.color = "black";
        box[j].style.textShadow = "0px 0px 15px black";
      }
    }
  } else if (btn1.textContent == "End") {
    btn1.textContent = "Start";
    for (let i = 0; i < box.length; i++) {
      box[i].textContent = "";
      box[i].style.display = "none";
    }
    btn1.style.boxShadow = "none";
    btn1.style.backgroundColor = "#a38b69";
    document.querySelector(".game").style.opacity = .5;
    document.querySelector(".Congratulations").textContent = "Play again";
  }
};

function getIndexForNumberGameOnly(ele) {
  let c = document.querySelectorAll(".game > *");
  for (let i = 0; i < c.length; i++) {
    if (c[i] === ele) return i;
  }
}

function getIndexGenerally(elm) {
  let c = elm.parentNode.children;
  for (let i = 0; i < c.length; i++) {
    if (c[i] == elm) return i;
  }
}

let canSwapOne = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [1, 3, 5, 7],
  5: [2, 4, 8],
  6: [3, 7],
  7: [4, 6, 8],
  8: [5, 7],
};

let canSwapTwo = {
  0: [2, 6],
  1: [7],
  2: [0, 8],
  3: [5],
  4: [],
  5: [3],
  6: [0, 8],
  7: [1],
  8: [2, 6],
};

function gameFinished() {
  for (let i = 0; i < box.length - 1; i++) {
    if (+box[i].id - 1 !== getIndexGenerally(box[i])) return false;
  }
  return true;
}

function swabBoxs(ele1, ele2) {
  [ele1.id, ele2.id] = [ele2.id, ele1.id];
}

for (let i = 0; i < box.length; i++) {
  box[i].onclick = () => {
    let embtyBoxPosition = getIndexGenerally(document.getElementById("empty"));
    let position = getIndexGenerally(box[i]);

    if (canSwapOne[embtyBoxPosition].some((el) => el === position)) {
      swabBoxs(box[i], box[embtyBoxPosition]);
    } else if (canSwapTwo[embtyBoxPosition].some((el) => el === position)) {
      if (
        embtyBoxPosition === 1 ||
        embtyBoxPosition === 3 ||
        embtyBoxPosition === 5 ||
        embtyBoxPosition === 7
      ) {
        swabBoxs(box[4], box[embtyBoxPosition]);
        swabBoxs(box[i], box[4]);
      } else if (
        embtyBoxPosition === 0 ||
        embtyBoxPosition === 2 ||
        embtyBoxPosition === 6 ||
        embtyBoxPosition === 8
      ) {
        if (
          (position === 0 || position === 2) &&
          (embtyBoxPosition === 0 || embtyBoxPosition === 2)
        ) {
          swabBoxs(box[1], box[embtyBoxPosition]);
          swabBoxs(box[i], box[1]);
        } else if (
          (position === 0 || position === 6) &&
          (embtyBoxPosition === 0 || embtyBoxPosition === 6)
        ) {
          swabBoxs(box[3], box[embtyBoxPosition]);
          swabBoxs(box[i], box[3]);
        } else if (
          (position === 6 || position === 8) &&
          (embtyBoxPosition === 6 || embtyBoxPosition === 8)
        ) {
          swabBoxs(box[7], box[embtyBoxPosition]);
          swabBoxs(box[i], box[7]);
        } else if (
          (position === 2 || position === 8) &&
          (embtyBoxPosition === 2 || embtyBoxPosition === 8)
        ) {
          swabBoxs(box[5], box[embtyBoxPosition]);
          swabBoxs(box[i], box[5]);
        }
      }
    }

    for (let j = 0; j < box.length; j++) {
      if (box[j].id === "empty") box[j].textContent = "";
      else box[j].textContent = box[j].id;
    }

    for (let j = 0; j < box.length; j++) {
      if (getIndexGenerally(box[j]) === +box[j].id - 1) {
        box[j].style.color = "gold";
        box[j].style.textShadow = "0px 0px 5px gold";
      } else {
        box[j].style.color = "black";
        box[j].style.textShadow = "0px 0px 15px black";
      }
    }

    if (gameFinished()) {
      document.querySelector(".finished").style.display = "block";
      document.querySelector(".Congratulations").style.display = "block";
      document.querySelector(".Congratulations").textContent = "Well done...";
    }
  };
}
