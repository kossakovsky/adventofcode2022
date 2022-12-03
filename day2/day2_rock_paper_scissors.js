const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/day2_rock_paper_scissors.txt`, 'utf8');

const parsedData = input.split('\n').map((item) => item.split(' '));

const shapesValues = { rock: 1, paper: 2, scissors: 3 };

const opponentMatching = { A: 'rock', B: 'paper', C: 'scissors' };

function getChoseScore(key) {
  return shapesValues[key];
}

let firstPartSum = 0;
const secondPartSum = 0;

function calculateFirstPartResult([opponentInput, playerInput]) {
  if (!opponentInput || !playerInput) {
    return;
  }

  const possibleMatchResults = {
    DRAW: 'draw',
    PLAYER_WIN: 'player_win',
    PLAYER_LOSS: 'player_loss',
  };

  const roundOutcome = {
    [possibleMatchResults.DRAW]: 3,
    [possibleMatchResults.PLAYER_WIN]: 6,
    [possibleMatchResults.PLAYER_LOSS]: 0,
  };

  const matchMatrix = {
    AX: possibleMatchResults.DRAW, // rock vs rock = draw
    AY: possibleMatchResults.PLAYER_WIN, // rock vs paper = player win
    AZ: possibleMatchResults.PLAYER_LOSS, // rock vs scissors = player loss
    BX: possibleMatchResults.PLAYER_LOSS, // paper vs rock = player loss
    BY: possibleMatchResults.DRAW, // paper vs paper = draw
    BZ: possibleMatchResults.PLAYER_WIN, // paper vs scissors = player win
    CX: possibleMatchResults.PLAYER_WIN, // scissors vs rock = player win
    CY: possibleMatchResults.PLAYER_LOSS, // scissors vs paper = player loss
    CZ: possibleMatchResults.DRAW, // scissors vs scissors = draw
  };

  const playerMatching = { X: opponentMatching.A, Y: opponentMatching.B, Z: opponentMatching.C };

  const matchResult = matchMatrix[opponentInput + playerInput];

  const playerChoseValue = getChoseScore(playerMatching[playerInput]);

  if (matchResult === possibleMatchResults.DRAW) {
    firstPartSum += playerChoseValue + roundOutcome[matchResult];
    return;
  }

  if (matchResult === possibleMatchResults.PLAYER_WIN) {
    firstPartSum += playerChoseValue + roundOutcome[matchResult];
    return;
  }

  if (matchResult === possibleMatchResults.PLAYER_LOSS) {
    firstPartSum += playerChoseValue + roundOutcome[matchResult];
  }
}

parsedData.forEach(calculateFirstPartResult);
console.log('🚀 ~ file: day2_rock_paper_scissors.js:46 ~ firstPartSum', firstPartSum);

// parsedData.forEach(calculateSecondPartResult);
console.log('🚀 ~ file: day2_rock_paper_scissors.js:47 ~ secondPartSum', secondPartSum);
