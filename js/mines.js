'use strict'

const MINE_IMG = '💩'
const FLAG_IMG = '⛳'

var gBoard = {
}

var gLevel = {
    size: 4,
    mines: 2
};

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gRandomMines = [];

function initGame() {
    gBoard = createBoard();
    renderBoard();
    placeRandomMines()

}

function createBoard() {
    var SIZE = gLevel.size;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0, isShown: false,
                isMine: false, isMarked: false,
            };

            board[i][j] = cell;
        }
    }


    // Place 2 Mines manually

    // board[2][2].isMine = true;
    // board[3][0].isMine = true;
    // console.log('board', board);

    return board
}


function renderBoard() {
    var strHTML = '';

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            var currentCell = gBoard[i][j];
            if (!gGame.isOn) {
                strHTML += `<td class="cell">`;
            } else {
                strHTML += `<td onclick="cellClicked(this, ${i},${j})"
                class="cell cell-" oncontextmenu="cellMarked(this, ${i},${j})">`;
            }
            if (currentCell.isShown) {
                if (currentCell.isMine) {
                    strHTML += MINE_IMG;
                } else {
                    currentCell.minesAroundCount = getMinesNegsCount(i, j)
                    strHTML += currentCell.minesAroundCount
                }
            }
            if (currentCell.isMarked) {
                strHTML += FLAG_IMG
            }
            strHTML += `</td>`;

        }
        strHTML += '</tr>';
    }
    // console.log('strHTML' , strHTML);
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;

}

function getMinesNegsCount(cellI, cellJ) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine === true) negsCount++;


        }
    }
    // console.log('negsCount', negsCount);

    return negsCount;
}


function cellClicked(elCell, i, j) {
    // var cellClass = 'cell-' + i + '-' + j;

    // Implement that clicking a cell with “number” reveals the number of this cell

    if (gBoard[i][j].isMine === false) {
        gBoard[i][j].isShown = true;
        gGame.shownCount++;
        renderBoard()
        checkIfWin()
    } else {

        // when clicking a mine, all mines should be revealed
        for (var x = 0; x < gRandomMines.length; x++) {
            var randomMine = [{}];
            randomMine = gRandomMines[x]
            gBoard[randomMine.i][randomMine.j].isShown = true
        }
        GameOver()
    }
}

function placeRandomMines() {
    gRandomMines = [];
    for (var x = 0; x < gLevel.mines; x++) {
        var randI = getRandomInt(0, gLevel.size - 1);
        // console.log('randI', randI);
        var randJ = getRandomInt(0, gLevel.size - 1);
        // console.log('randJ', randJ);
        if (gBoard[randI][randJ].isMine) {
            x--
            continue
        }
        // model:
        gBoard[randI][randJ].isMine = true;

        // // DOM:
        renderBoard()
        gRandomMines.push({ i: randI, j: randJ })
    }

    // console.log('gLevel.mines', gLevel.mines);
    // console.log('gRandomMines', gRandomMines);
}

function cellMarked(elCell, i, j) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    gBoard[i][j].isMarked = true;
    gGame.markedCount++
    renderBoard();
    checkIfWin()
}


function GameOver() {
    gGame.isOn = false;
    renderBoard()
    var elMessage = document.querySelector('.win-message')
    elMessage.innerHTML = "Game Over!"
    

}

function checkIfWin() {

    for (var x = 0; x < gRandomMines.length; x++) {
        var mineLocation = gRandomMines[x]
        if (!gBoard[mineLocation.i][mineLocation.j].isMarked) {
            return
        }
    }


    if ((gBoard.length * gBoard.length) === gGame.shownCount + gGame.markedCount && gGame.markedCount === gRandomMines.length) {
        var elMessage = document.querySelector('.win-message')
        elMessage.innerHTML = "You Won!"
    }
}



function ChangeLevel(el) {
    // var data = el.dataset;
    var dataSize = el.dataset.size;
    var dataMines = el.dataset.mines;
    // console.log('dataSize', dataSize);
    // console.log('dataMines', dataMines);

    gLevel = {
        size: +dataSize,
        mines: +dataMines,
    }
    // console.log('gLevel', gLevel);

    initGame();
}

