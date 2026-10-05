//1. getting money from the user 

const PromptSync = require("prompt-sync");

//declaring global variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const prompt = require("prompt-sync")();

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount); //parseFloat to convert string to floating point number

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Please enter a valid number, try again.")
        } else {
            return numberDepositAmount;
        }
    }
};

//2. determine number of lines to bet on

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines); //parseFloat to convert string to floating point number

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("invalid number of lines, try again.")
        } else {
            return numberOfLines;
        }
    }
}

//3. collecting the betting amount against the value of the depositing amount
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("enter amount to bet per line: ");
        const numberBet = parseFloat(bet); //parseFloat to convert string to floating point number

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)) {
            console.log("invalid bet, try again.")
        } else {
            return numberBet;
        }
    }
}

//4. creating the slot machine
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

//in the spin function the constant reels is basically displaying columns in a pattern of the rows, now creating a function that basically keeps the format same but now is actually showing rows
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance);
const reels = spin();
const rows = transpose(reels);
console.log(reels);
console.log(rows);