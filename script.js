const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const setField = (index, name) => {
    board[index] = name;
  };
  const getField = (index) => {
    return board[index];
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  return { setField, getField, reset };
})();

const uiController = (() => {
  const msg = document.getElementById("message");
  const playableFields = document.querySelectorAll(".field");
  const restartBtn = document.getElementById("restart-btn");

  playableFields.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (e.target.textContent !== "" || gameController.getGameOver()) return;
      gameController.play(parseInt(e.target.dataset.index));
      updateGameboard();
    });
  });

  restartBtn.addEventListener("click", () => {
    gameboard.reset();
    gameController.reset();
    updateGameboard();
    setMessage("Player X's turn");
  });
  const updateGameboard = () => {
    for (let i = 0; i < playableFields.length; i++) {
      playableFields[i].textContent = gameboard.getField(i);
    }
  };
  const setMessage = (text) => {
    msg.textContent = text;
  };

  return { setMessage };
})();

const gameController = (() => {
  let round = 1;
  let gameOver = false;

  const play = (idx) => {
    gameboard.setField(idx, getCurrentSign());
    console.log(checkWinner(idx));
    if(checkWinner(idx)){
        gameOver=true;
        uiController.setMessage(`${getCurrentSign()} won!`);
        return;
    }
    if (round === 9) {
      gameOver = true;
      uiController.setMessage("DRAW");
      return;
    }
    round++;
    uiController.setMessage(`Player ${getCurrentSign()}'s turn`);
  };

  const getCurrentSign = () => {
    return round % 2 === 1 ? "X" : "O";
  };
  const getGameOver = () => {
    return gameOver;
  };

  const checkWinner = (currIndex) => {
    const winCheck = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winCheck
      .filter((list) => list.includes(currIndex))
      .some((combi) =>
        combi.every((idx) => gameboard.getField(idx) === getCurrentSign())
      );
  };

  const reset = () => {
    round = 1;
    gameOver = false;
  };
  return { play, getGameOver, reset };
})();
