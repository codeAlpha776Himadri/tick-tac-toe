const cells = document.querySelectorAll('[data-cell]');
console.log(cells);
const gameBoard = document.getElementById('game');
const winText = document.querySelector('[data-winning-message-text]');
const messageScreen = document.querySelector('.winning-message');
const restartbtn = document.querySelector('#restartButton');

let CIRCLETURN;
//applied classes
const X_CLASS = 'x';
const C_CLASS = 'c';

const Win_Combinations = [
    [0, 1, 2],  //row1 win combination   
    [3, 4, 5],  //row2 win combination 
    [6, 7, 8],  //row3 win combination 
    [0, 3, 6],  //col1 win combination 
    [1, 4, 7],  //col2 win combination 
    [2, 5, 8],  //col3 win combination 
    [0, 4, 8],  //diagonal1 win combination
    [2, 4, 6]    //diagonal2 win combination
];

// startGame();

function putMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurns() {
    CIRCLETURN = !CIRCLETURN;
}

function setHoverEffect() {
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(C_CLASS);

    if (CIRCLETURN)
        gameBoard.classList.add(C_CLASS)
    else
        gameBoard.classList.add(X_CLASS);
}

function handleClick(e) {
    //Here we : placemark , check for win , check for draw , switch turns of players 
    const cell = this;
    const currentClass = CIRCLETURN ? C_CLASS : X_CLASS;
    putMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchTurns();
        setHoverEffect();
    }

    // switchTurns() ;
    // setHoverEffect();
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(C_CLASS)
    })
}

function endGame(draw) {
    if (draw) {
        winText.innerText = 'Draw';
    }
    else
        winText.innerText = `${CIRCLETURN ? Oname : Xname} Wins !!`;

    messageScreen.classList.add('show');
}

function checkWin(currentClass) {
    return Win_Combinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}

function resetGame() {
    messageScreen.classList.remove('show');
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(C_CLASS)
    });
    startGame();
}

restartbtn.addEventListener('click', resetGame);

function startGame() {
    CIRCLETURN = false;
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick,
            { once: true });
    })
    switchTurns();
    setHoverEffect();
}

//setting names
const XplayerBtn = document.querySelector('.Xplayer');
const OplayerBtn = document.querySelector('.Oplayer');

let Xname, Oname;

let nameCount = 0;

XplayerBtn.addEventListener('click', () => {
    Xname = prompt("Enter Your Name : ");
    XplayerBtn.style.cursor = 'not-allowed';
    nameCount++;
}, { once: true });

OplayerBtn.addEventListener('click', () => {
    Oname = prompt("Enter Your Name : ");
    OplayerBtn.style.cursor = 'not-allowed';
    displayheader.textContent = `${Xname} Vs ${Oname}`;
    setTimeout(nameCount++, 10000);
    startGame()
}, { once: true });

const displayheader = document.querySelector('.player-names');