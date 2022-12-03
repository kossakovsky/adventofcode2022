const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/day2_rock_paper_scissors.txt`, 'utf8');
const parsedData = input.split('\n').map((item) => item.split(' '));

const shapesValues = { rock: 1, paper: 2, scissors: 3 };
const opponentMatching = { A: 'rock', B: 'paper', C: 'scissors' };
const playerMatching = { X: opponentMatching.A, Y: opponentMatching.B, Z: opponentMatching.C };

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

function getPlayerInputScore(key) {
  return shapesValues[key];
}

let firstPartSum = 0;
let secondPartSum = 0;

function calculateFirstPartResult([opponentInput, playerInput]) {
  if (!opponentInput || !playerInput) {
    return;
  }

  const matchMatrix = {
    // rock
    AX: possibleMatchResults.DRAW, // vs rock = draw
    AY: possibleMatchResults.PLAYER_WIN, // vs paper = player win
    AZ: possibleMatchResults.PLAYER_LOSS, // vs scissors = player loss
    // paper
    BX: possibleMatchResults.PLAYER_LOSS, // vs rock = player loss
    BY: possibleMatchResults.DRAW, // vs paper = draw
    BZ: possibleMatchResults.PLAYER_WIN, // vs scissors = player win
    // scissors
    CX: possibleMatchResults.PLAYER_WIN, // vs rock = player win
    CY: possibleMatchResults.PLAYER_LOSS, // vs paper = player loss
    CZ: possibleMatchResults.DRAW, // vs scissors = draw
  };

  const matchResult = matchMatrix[opponentInput + playerInput];

  const playerChoseValue = getPlayerInputScore(playerMatching[playerInput]);

  firstPartSum += playerChoseValue + roundOutcome[matchResult];
}

function calculateSecondPartResult([opponentInput, result]) {
  if (!opponentInput || !result) {
    return;
  }

  const matchResult = {
    X: possibleMatchResults.PLAYER_LOSS,
    Y: possibleMatchResults.DRAW,
    Z: possibleMatchResults.PLAYER_WIN,
  }[result];

  const playerInputMatrix = {
    // rock
    AX: playerMatching.Z, // + loss = player has scissors
    AY: playerMatching.X, // + draw = player has rock
    AZ: playerMatching.Y, // + win = player has paper
    // paper
    BX: playerMatching.X, // + loss = player has rock
    BY: playerMatching.Y, // + draw = player has paper
    BZ: playerMatching.Z, // + win = player has scissors
    // scissors
    CX: playerMatching.Y, // + loss = player has paper
    CY: playerMatching.Z, // + draw = player has scissors
    CZ: playerMatching.X, // + win = player has rock
  };

  const playerChoseValue = getPlayerInputScore(playerInputMatrix[opponentInput + result]);

  secondPartSum += playerChoseValue + roundOutcome[matchResult];
}

parsedData.forEach(calculateFirstPartResult);
console.log('🚀 ~ file: day2_rock_paper_scissors.js:46 ~ firstPartSum', firstPartSum);

parsedData.forEach(calculateSecondPartResult);
console.log('🚀 ~ file: day2_rock_paper_scissors.js:47 ~ secondPartSum', secondPartSum);
