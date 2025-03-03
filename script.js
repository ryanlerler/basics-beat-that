// More Comfortable
// Include base, score, leaderboard, lowest combined number mode, auto-generate combined number, variable number of dice features

// GLOBAL VARIABLES
const CHOOSE_DICECOUNT = "CHOOSE_DICECOUNT";
const ROLL = "ROLL";
const AUTO_GENERATE_NUMBER = "AUTO_GENERATE_NUMBER";
const LEADERBOARD = "LEADERBOARD";
const HIGHEST_COMBINED_NUMBER_MODE = "HIGHEST_COMBINED_NUMBER_MODE";
const LOWEST_COMBINED_NUMBER_MODE = "LOWEST_COMBINED_NUMBER_MODE";
let programState = CHOOSE_DICECOUNT;
let gameMode = "";
let diceCount = 0;
let currentPlayerDiceNumbers = [];
let currentPlayer = 1;
let player1FinalNumEachRound = [];
let player2FinalNumEachRound = [];

const rollOneDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

const rollMultipleDice = function (diceCount) {
  let rollStateMessage = `Player ${currentPlayer}'s turn: <br>`;
  for (i = 0; i < diceCount; i += 1) {
    currentPlayerDiceNumbers.push(rollOneDice());
    let diceId = i + 1;
    rollStateMessage += `You rolled ${currentPlayerDiceNumbers[i]} for Dice ${diceId}. <br>`;
  }
  if (gameMode === HIGHEST_COMBINED_NUMBER_MODE) {
    rollStateMessage += `Computer is about to automatically concatenate the ${diceCount} digits rolled to create the <b> largest </b> possible number. Please hit the "Submit" button to continue.`;
  } else if (gameMode === LOWEST_COMBINED_NUMBER_MODE) {
    rollStateMessage += `Computer is about to automatically concatenate the ${diceCount} digits rolled to create the <b> smallest </b> possible number. Please hit the "Submit" button to continue.`;
  }
  return rollStateMessage;
};

const autoGenerateOptimalCombinedNumber = function () {
  // MUST initialize this as an empty string or else the value will be undefined during reassignment later
  let currentPlayerFinalNum = "";

  // Arrange digits from big to small in the array, convert each of them to string and keep them in currentPlayerFinalNum variable
  if (gameMode === HIGHEST_COMBINED_NUMBER_MODE) {
    currentPlayerDiceNumbers.sort((a, b) => b - a);
    for (i = 0; i < currentPlayerDiceNumbers.length; i += 1) {
      currentPlayerFinalNum += String(currentPlayerDiceNumbers[i]);
    }
  }
  // Arrange digits from small to big in the array, etc..
  else if (gameMode === LOWEST_COMBINED_NUMBER_MODE) {
    currentPlayerDiceNumbers.sort((a, b) => a - b);
    for (i = 0; i < currentPlayerDiceNumbers.length; i += 1) {
      currentPlayerFinalNum += String(currentPlayerDiceNumbers[i]);
    }
  }

  // Transfer the final num to another variable for each player separately for LEADERBOARD later
  if (currentPlayer === 1) {
    player1FinalNumEachRound.push(Number(currentPlayerFinalNum));
  } else if (currentPlayer === 2) {
    player2FinalNumEachRound.push(Number(currentPlayerFinalNum));
  }
  return `Player ${currentPlayer}, your number is ${currentPlayerFinalNum}. <br>
          Player 2's turn now! <br>
          Please hit the "Submit" button to continue.`;
};

const showLeaderboard = function () {
  // Calculate the sum of all player 1 optimal combined numbers
  let player1Sum = 0;
  for (i = 0; i < player1FinalNumEachRound.length; i += 1) {
    player1Sum += player1FinalNumEachRound[i];
  }

  // Calculate the sum of all player 2 optimal combined numbers
  let player2Sum = 0;
  for (i = 0; i < player2FinalNumEachRound.length; i += 1) {
    player2Sum += player2FinalNumEachRound[i];
  }

  let leaderboardMessage = `Player 1's score: ${player1Sum} | Player 2's score: ${player2Sum} <br>
          Press Submit to play again. <br> <br>
          <b> ------ LEADERBOARD ------ </b> <br>`;

  // Player 1 is leading
  if (
    (gameMode === HIGHEST_COMBINED_NUMBER_MODE && player1Sum > player2Sum) ||
    (gameMode === LOWEST_COMBINED_NUMBER_MODE && player1Sum < player2Sum)
  ) {
    leaderboardMessage += `Player 1 is currently winning!!! <br>
          Player 1: ${player1Sum} <br>
          Player 2: ${player2Sum}`;
  }

  // Player 2 is leading
  else if (
    (gameMode === HIGHEST_COMBINED_NUMBER_MODE && player1Sum < player2Sum) ||
    (gameMode === LOWEST_COMBINED_NUMBER_MODE && player1Sum > player2Sum)
  ) {
    leaderboardMessage += `Player 2 is currently winning!!! <br>
          Player 2: ${player2Sum} <br>
          Player 1: ${player1Sum}`;
  }

  // Draw condition for any mode
  else if (player1Sum === player2Sum) {
    leaderboardMessage += `DRAW! No one is currently winning!!!`;
  }
  return leaderboardMessage;
};

const resetGame = function () {
  programState = ROLL;
  currentPlayerDiceNumbers = [];
  currentPlayer = 1;
};

const main = function (input) {
  let myOutputValue;
  if (!gameMode) {
    if (input !== "h" && input !== "l") {
      return `Please choose a game mode: enter 'h' for highest combined number mode or 'l' for lowest combined number mode.`;
    } else if (input === "h") {
      gameMode = HIGHEST_COMBINED_NUMBER_MODE;
    } else if (input === "l") {
      gameMode = LOWEST_COMBINED_NUMBER_MODE;
    }
  }
  if (programState === CHOOSE_DICECOUNT) {
    if (!input || Number.isNaN(Number(input))) {
      return `Please enter a number to choose how many dice to roll.`;
    } else {
      diceCount = input;
      myOutputValue = `You have chosen to roll ${diceCount} dice. <br> Please hit the "Submit" button to continue.`;
      programState = ROLL;
    }
  } else if (programState === ROLL) {
    myOutputValue = rollMultipleDice(diceCount);
    programState = AUTO_GENERATE_NUMBER;
  } else if (programState === AUTO_GENERATE_NUMBER) {
    myOutputValue = autoGenerateOptimalCombinedNumber();
    if (currentPlayer === 1) {
      currentPlayer = 2;
      programState = ROLL;
      currentPlayerDiceNumbers = [];
    } else if (currentPlayer === 2) {
      myOutputValue = `${myOutputValue} <br> Let's see who the winner is!!!`;
      programState = LEADERBOARD;
    }
  } else if (programState === LEADERBOARD) {
    myOutputValue = showLeaderboard();
    // AFTER showing the result, game resets continuously without refreshing the browser
    resetGame();
  }
  return myOutputValue;
};

// // More Comfortable
// // Include base, score, leaderboard, lowest combined number mode, auto-generate combined number features

// // GLOBAL VARIABLES
// const ROLL = "ROLL";
// const AUTO_GENERATE_NUMBER = "AUTO_GENERATE_NUMBER";
// const LEADERBOARD = "LEADERBOARD";
// const HIGHEST_COMBINED_NUMBER_MODE = "1";
// const LOWEST_COMBINED_NUMBER_MODE = "2";
// let programState = ROLL;
// let gameMode = "";
// let currentPlayerDiceNumbers = [];
// let currentPlayer = 1;
// let player1FinalNumEachRound = [];
// let player2FinalNumEachRound = [];

// const rollOneDice = function () {
//   return Math.floor(Math.random() * 6) + 1;
// };

// const rollTwoDice = function () {
//   for (i = 0; i < 2; i += 1) {
//     currentPlayerDiceNumbers.push(rollOneDice());
//   }
//   let rollStateMessage = `Player ${currentPlayer}'s turn: <br>
//     You rolled ${currentPlayerDiceNumbers[0]} for Dice 1 and ${currentPlayerDiceNumbers[1]} for Dice 2. <br>
//     Please hit the "Submit" button to continue. <br>`;
//   if (gameMode === HIGHEST_COMBINED_NUMBER_MODE) {
//     rollStateMessage += `Computer is about to automatically concatenate the two digits rolled to create the <b> largest </b> possible number.`;
//   } else if (gameMode === LOWEST_COMBINED_NUMBER_MODE) {
//     rollStateMessage += `Computer is about to automatically concatenate the two digits rolled to create the <b> smallest </b> possible number.`;
//   }
//   return rollStateMessage;
// };

// const autoGenerateNumber = function () {
//   let currentPlayerFinalNum;
//   // First digit is greater
//   if (
//     (gameMode === HIGHEST_COMBINED_NUMBER_MODE &&
//       currentPlayerDiceNumbers[0] > currentPlayerDiceNumbers[1]) ||
//     (gameMode === LOWEST_COMBINED_NUMBER_MODE &&
//       currentPlayerDiceNumbers[1] > currentPlayerDiceNumbers[0])
//   ) {
//     currentPlayerFinalNum =
//       String(currentPlayerDiceNumbers[0]) + String(currentPlayerDiceNumbers[1]);
//   }

//   // Second digit is greater
//   else if (
//     (gameMode === HIGHEST_COMBINED_NUMBER_MODE &&
//       currentPlayerDiceNumbers[1] > currentPlayerDiceNumbers[0]) ||
//     (gameMode === LOWEST_COMBINED_NUMBER_MODE &&
//       currentPlayerDiceNumbers[0] > currentPlayerDiceNumbers[1])
//   ) {
//     currentPlayerFinalNum =
//       String(currentPlayerDiceNumbers[1]) + String(currentPlayerDiceNumbers[0]);
//   }

//   // NEED TO ACCOUNT FOR THE CHANCES THAT THE DIGITS MAY BE EQUAL IN ANY MODE. OR ELSE, currentPlayerFinalNum MAY BE NAN.
//   else if (currentPlayerDiceNumbers[0] === currentPlayerDiceNumbers[1]) {
//     currentPlayerFinalNum =
//       String(currentPlayerDiceNumbers[0]) + String(currentPlayerDiceNumbers[1]);
//   }

//   // Transfer the final num to another variable for each player separately for LEADERBOARD later
//   if (currentPlayer === 1) {
//     player1FinalNumEachRound.push(Number(currentPlayerFinalNum));
//   } else if (currentPlayer === 2) {
//     player2FinalNumEachRound.push(Number(currentPlayerFinalNum));
//   }
//   return `Player ${currentPlayer}, your number is ${currentPlayerFinalNum}. <br>
//           Player 2's turn now! <br>
//           Please hit the "Submit" button to continue.`;
// };

// const showLeaderboard = function () {
//   // Calculate the sum of all player 1 scores
//   let player1Sum = 0;
//   for (i = 0; i < player1FinalNumEachRound.length; i += 1) {
//     player1Sum += player1FinalNumEachRound[i];
//   }

//   // Calculate the sum of all player 2 scores
//   let player2Sum = 0;
//   for (i = 0; i < player2FinalNumEachRound.length; i += 1) {
//     player2Sum += player2FinalNumEachRound[i];
//   }

//   // Player 1 is leading
//   if (
//     (gameMode === HIGHEST_COMBINED_NUMBER_MODE && player1Sum > player2Sum) ||
//     (gameMode === LOWEST_COMBINED_NUMBER_MODE && player1Sum < player2Sum)
//   ) {
//     return `Player 1's score: ${player1Sum} | Player 2's score: ${player2Sum} <br>
//           Press Submit to play again. <br> <br>
//           <b> ------ LEADERBOARD ------ </b> <br>
//           Player 1 is currently winning!!! <br>
//           Player 1: ${player1Sum} <br>
//           Player 2: ${player2Sum}`;
//   }

//   // Player 2 is leading
//   else if (
//     (gameMode === HIGHEST_COMBINED_NUMBER_MODE && player1Sum < player2Sum) ||
//     (gameMode === LOWEST_COMBINED_NUMBER_MODE && player1Sum > player2Sum)
//   ) {
//     return `Player 1's score: ${player1Sum} | Player 2's score: ${player2Sum} <br>
//           Press Submit to play again. <br> <br>
//           <b> ------ LEADERBOARD ------ </b> <br>
//           Player 2 is currently winning!!! <br>
//           Player 2: ${player2Sum} <br>
//           Player 1: ${player1Sum}`;
//   }

//   // Draw condition for any mode
//   else if (player1Sum === player2Sum) {
//     return `Player 1's score: ${player1Sum} | Player 2's score: ${player2Sum} <br>
//           Press Submit to play again. <br> <br>
//           <b> ------ LEADERBOARD ------ </b> <br>
//           DRAW! No one is currently winning!!!`;
//   }
// };

// const resetGame = function () {
//   programState = ROLL;
//   currentPlayerDiceNumbers = [];
//   currentPlayer = 1;
// };

// const main = function (input) {
//   let myOutputValue;
//   if (!gameMode) {
//     if (input != "1" && input != "2") {
//       return `Please choose a game mode: enter '1' for highest combined number mode or '2' for lowest combined number mode.`;
//     } else if (input === "1") {
//       gameMode = HIGHEST_COMBINED_NUMBER_MODE;
//     } else if (input === "2") {
//       gameMode = LOWEST_COMBINED_NUMBER_MODE;
//     }
//   }
//   if (programState === ROLL) {
//     myOutputValue = rollTwoDice();
//     programState = AUTO_GENERATE_NUMBER;
//   } else if (programState === AUTO_GENERATE_NUMBER) {
//     myOutputValue = autoGenerateNumber();
//     if (currentPlayer === 1) {
//       currentPlayer = 2;
//       programState = ROLL;
//       currentPlayerDiceNumbers = [];
//     } else if (currentPlayer === 2) {
//       myOutputValue = `${myOutputValue} <br> Let's see who the winner is!!!`;
//       programState = LEADERBOARD;
//     }
//   } else if (programState === LEADERBOARD) {
//     myOutputValue = showLeaderboard();
//     // AFTER showing the result, game resets continuously without refreshing the browser
//     resetGame();
//   }
//   return myOutputValue;
// };

// --- BASE ---
// --- SECOND ATTEMPT ---
// const ROLL = "ROLL";
// const CHOOSE = "CHOOSE";
// const RESULT = "RESULT";
// let mode = ROLL;
// let currentPlayerDiceNumbers = [];
// let currentPlayer = 1;
// let player1FinalNum = 0;
// let player2FinalNum = 0;

// const rollOneDice = function () {
//   return Math.floor(Math.random() * 6) + 1;
// };

// const rollTwoDice = function () {
//   let i = 0;
//   while (i < 2) {
//     currentPlayerDiceNumbers.push(rollOneDice());
//     i += 1;
//   }
//   return `Player ${currentPlayer}'s turn: <br>
//     You rolled ${currentPlayerDiceNumbers[0]} for Dice 1 and ${currentPlayerDiceNumbers[1]} for Dice 2. <br>
//     You are about to concatenate the two digits rolled to create the largest possible number. <br>
//     Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
//     Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
// };

// const chooseDiceMode = function (playerChoice) {
//   let currentPlayerFinalNum;
//   if (playerChoice != 1 && playerChoice != 2) {
//     return `Please enter '1' if you want ${currentPlayerDiceNumbers[0]} or enter '2' if you want ${currentPlayerDiceNumbers[1]} to be in the tens place.`;
//   } else if (playerChoice == 1) {
//     currentPlayerFinalNum =
//       String(currentPlayerDiceNumbers[0]) + String(currentPlayerDiceNumbers[1]);
//     // transfer the final num to another variable for each player separately for result mode later
//     if (currentPlayer == 1) {
//       player1FinalNum = Number(currentPlayerFinalNum);
//     } else if (currentPlayer == 2) {
//       player2FinalNum = Number(currentPlayerFinalNum);
//     }
//     return `Player ${currentPlayer}, you choose Dice 1 first. <br>
//           Your number is ${currentPlayerFinalNum}. <br>
//           Player 2's turn now! <br>
//           Please hit the "Submit" button to continue.`;
//   } else if (playerChoice == 2) {
//     currentPlayerFinalNum =
//       String(currentPlayerDiceNumbers[1]) + String(currentPlayerDiceNumbers[0]);
//     // transfer the final num to another variable for each player separately for result mode later
//     if (currentPlayer == 1) {
//       player1FinalNum = Number(currentPlayerFinalNum);
//     } else if (currentPlayer == 2) {
//       player2FinalNum = Number(currentPlayerFinalNum);
//     }
//     return `Player ${currentPlayer}, you choose Dice 2 first. <br>
//           Your number is ${currentPlayerFinalNum}. <br>
//           Player 2's turn now! <br>
//           Please hit the "Submit" button to continue.`;
//   }
// };

// const enterResultMode = function () {
//   if (player1FinalNum > player2FinalNum) {
//     myOutputValue = `Player 1 has won. <br>
//       Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//       Press Submit to play again.`;
//   } else if (player1FinalNum < player2FinalNum) {
//     myOutputValue = `Player 2 has won. <br>
//           Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//           Press Submit to play again.`;
//   } else {
//     myOutputValue = `DRAW!!! <br>
//           Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//           Press Submit to play again.`;
//   }
//   return myOutputValue;
// };

// const resetGame = function () {
//   mode = ROLL;
//   currentPlayerDiceNumbers = [];
//   currentPlayer = 1;
// };

// const main = function (input) {
//   let myOutputValue;
//   if (mode == ROLL) {
//     myOutputValue = rollTwoDice();
//     mode = CHOOSE;
//   } else if (mode == CHOOSE) {
//     myOutputValue = chooseDiceMode(input);
//     // switch to player 2's roll dice mode only after user has entered 1 or 2
//     if (input == 1 || input == 2) {
//       if (currentPlayer == 1) {
//         currentPlayer = 2;
//         mode = ROLL;
//         currentPlayerDiceNumbers = [];
//       } else if (currentPlayer == 2) {
//         myOutputValue = `${myOutputValue} <br> Let's see who the winner is!!!`;
//         mode = RESULT;
//       }
//     }
//   } else if (mode == RESULT) {
//     myOutputValue = enterResultMode();
//     // AFTER showing the result, game resets continuously without refreshing the browser
//     resetGame();
//   }

//   return myOutputValue;
// };

// // --- FIRST ATTEMPT ---
// // global variables
// var mode = "waiting for click";
// var player1Num1 = 0;
// var player1Num2 = 0;
// var player2Num1 = 0;
// var player2Num2 = 0;
// var player1FinalNum = [];
// var player2FinalNum = [];
// var myOutputValue = "";

// var getRandomInteger = function () {
//   return Math.floor(Math.random() * 6) + 1;
// };

// var enterPlayer1RollMode = function () {
//   player1Num1 = getRandomInteger();
//   player1Num2 = getRandomInteger();
//   player1FinalNum.push(player1Num1, player1Num2);
//   myOutputValue = `Player 1's turn: <br>
//     You rolled ${player1Num1} for Dice 1 and ${player1Num2} for Dice 2. <br>
//     You are about to concatenate the two digits rolled to create the largest possible number. <br>
//     Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
//     Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
//   mode = "player1 choose dice";

//   return myOutputValue;
// };

// var enterPlayer1ChooseDiceMode = function (player1Choice) {
//   if (player1Choice == 1) {
//     player1FinalNum = String(player1FinalNum[0]) + String(player1FinalNum[1]);
//     myOutputValue = `Player 1, you choose Dice 1 first. <br>
//       Your number is ${player1FinalNum}. <br>
//       Player 2's turn now! <br>
//       Please hit the "Submit" button to continue.`;
//   } else if (player1Choice == 2) {
//     player1FinalNum = String(player1FinalNum[1]) + String(player1FinalNum[0]);
//     myOutputValue = `Player 1, you choose Dice 2 first. <br>
//       Your number is ${player1FinalNum}. <br>
//       Player 2's turn now! <br>
//       Please hit the "Submit" button to continue.`;
//   } else {
//     myOutputValue = `Please enter '1' if you want ${player1Num1} or enter '2' if you want ${player1Num2} to be in the tens place.`;
//   }
//   if (player1Choice == 1 || player1Choice == 2) {
//     mode = "waiting for click 2";
//   }
//   return myOutputValue;
// };

// var enterPlayer2RollMode = function () {
//   player2Num1 = getRandomInteger();
//   player2Num2 = getRandomInteger();
//   player2FinalNum.push(player2Num1, player2Num2);
//   myOutputValue = `Player 2's turn: <br>
//     You rolled ${player2Num1} for Dice 1 and ${player2Num2} for Dice 2. <br>
//     You are about to concatenate the two digits rolled to create the largest possible number. <br>
//     Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
//     Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
//   mode = "player2 choose dice";
//   return myOutputValue;
// };

// var enterPlayer2ChooseDiceMode = function (player2Choice) {
//   if (player2Choice == 1) {
//     player2FinalNum = String(player2FinalNum[0]) + String(player2FinalNum[1]);
//     myOutputValue = `Player 2, you choose Dice 1 first. <br>
//       Your number is ${player2Num1}${player2Num2}. <br>
//       Please hit the "Submit" button to see the result.`;
//   } else if (player2Choice == 2) {
//     player2FinalNum = String(player2FinalNum[1]) + String(player2FinalNum[0]);
//     myOutputValue = `Player 2, you choose Dice 2 first.  <br>
//       Your number is ${player2Num2}${player2Num1}. <br>
//       Please hit the "Submit" button to see the result.`;
//   } else {
//     myOutputValue = `Please enter '1' if you want ${player2Num1} or enter '2' if you want ${player2Num2} to be in the tens place.`;
//   }
//   if (player2Choice == 1 || player2Choice == 2) {
//     mode = "waiting for click 3";
//   }
//   return myOutputValue;
// };

// var enterResultMode = function () {
//   if (player1FinalNum > player2FinalNum) {
//     myOutputValue = `Player 1 has won. <br>
//       Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//       Press Submit to play again.`;
//   } else {
//     myOutputValue = `Player 2 has won. <br>
//       Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//       Press Submit to play again.`;
//   }
//   // reset
//   mode = "waiting for click";
//   player1Num1 = 0;
//   player1Num2 = 0;
//   player2Num1 = 0;
//   player2Num2 = 0;
//   player1FinalNum = [];
//   player2FinalNum = [];
//   return myOutputValue;
// };

// var main = function (input) {
//   // player 1
//   if (mode == "waiting for click") {
//     if (input) {
//       myOutputValue = 'Please hit the "Submit" button to continue.';
//     } else {
//       mode = "player1 roll";
//     }
//   }
//   if (mode == "player1 roll") {
//     return enterPlayer1RollMode();
//   } else if (mode == "player1 choose dice") {
//     return enterPlayer1ChooseDiceMode(input);
//   }

//   // player 2
//   else if (mode == "waiting for click 2") {
//     if (input) {
//       myOutputValue = `Player 2's turn now! Please hit the "Submit" button to continue.`;
//     } else {
//       mode = "player2 roll";
//     }
//   }
//   if (mode == "player2 roll") {
//     return enterPlayer2RollMode();
//   } else if (mode == "player2 choose dice") {
//     return enterPlayer2ChooseDiceMode(input);
//   }

//   // result
//   else if (mode == "waiting for click 3") {
//     if (input) {
//       myOutputValue = `End of the game! Please hit the "Submit" button to see the result.`;
//     } else {
//       mode = "result";
//     }
//   }
//   if (mode == "result") {
//     return enterResultMode();
//   }
//   return myOutputValue;
// };
