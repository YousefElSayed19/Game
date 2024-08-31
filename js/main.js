let game = document.querySelector(".game");
let trys = 0;
let first;
let firstId;
let second;
let secondId;

function updataCards() {
  function generateDoubleNumbers() {
    const numbers = [];
    for (let i = 1; i <= 8; i++) {
      numbers.push(i, i);
    }

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
  }

  const doubleNumbers = generateDoubleNumbers();

  let cards;
  cards = doubleNumbers.map((number) => {
    return `
        <div class="cord">
            <div class="front"><img src="image/backcard.jpg" alt="" draggable="false"></div>
            <div class="back"><img src="image/${number}.jpg" alt="" id=${number} draggable="false"></div>
        </div>
        `;
  });
  cards.forEach((card) => {
    game.innerHTML += card;
  });
}

updataCards();

let fronts = document.querySelectorAll(".front");

fronts.forEach((front, ind) => {
  front.onclick = () => {
    if (dat == 0) {
      Swal.fire({
        icon: "error",
        title: "The Game Is End",
        text: "Cant Play",
      });
    } else {
      trys++;
      switch (trys) {
        case 1:
          front.style.transform = "rotateY(-180deg)";
          front.parentElement.children[1].style.transform = "rotateY(0deg)";
          first = front.parentElement.children[1];
          firstId = first.children[0].id;
          break;
        case 2:
          front.style.transform = "rotateY(-180deg)";
          front.parentElement.children[1].style.transform = "rotateY(0deg)";
          second = front.parentElement.children[1];
          secondId = second.children[0].id;
          answer = firstId == secondId ? true : false;
          if (!answer) {
            setTimeout(() => {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "error",
                title: "This Is Wrong !",
              });
              first.parentElement.children[0].style.transform = "rotateY(0deg)";
              second.parentElement.children[0].style.transform =
                "rotateY(0deg)";
            }, 1000);
          } else {
            setTimeout(() => {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-start",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Good Jop !",
              });
            }, 1000);
            first.parentElement.classList.add("done");
            second.parentElement.classList.add("done");
            endGame();
          }
          setTimeout(() => {
            trys = 0;
          }, 1000);
          break;
        default:
          break;
      }
    }
  };
});

let time = document.querySelector(".time");
let dat = 60;

let count;
window.onload = () => {
  reloadTime();
};

function reloadTime() {
  Swal.fire({
    title: "Agree To Start Game !",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Start",
  }).then((result) => {
    if (result.isConfirmed) {
      count = setInterval(() => {
        time.innerHTML = --dat;
        if (dat == 0) {
          clearInterval(count);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Game Is End",
          });
        }
      }, 1000);
    }
  });
}

let buttonReturn = document.querySelector(".ret");

buttonReturn.onclick = () => {
  setTimeout(() => {
    location.reload();
  }, 1000);
};

let arrOfDoneCards = [];
function endGame() {
  fronts.forEach((front) => {
    let listOfNameClasses = [...front.parentElement.classList];
    listOfNameClasses.length == 2
      ? arrOfDoneCards.push(listOfNameClasses.length)
      : "";
    if (arrOfDoneCards.length == 72) {
      setTimeout(() => {
        Swal.fire({
          title: "WOW",
          text: "You Win ! 🎉",
          imageUrl:
            "https://img.freepik.com/free-vector/you-win-surprise-vector-open-lucky-gift-prize_107791-29720.jpg?ga=GA1.1.1800147712.1724849844&semt=ais_hybrid",
          imageWidth: 300,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
        clearInterval(count);
      }, 2000);
    }
  });
}
