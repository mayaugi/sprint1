'use strict'

const MINE_IMG = '💩'

var gBoard = {
    minesAroundCount: 0,
    isShown: true,
    isMine: false,
    isMarked: false
}

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    gBoard = createBoard();
    renderBoard(gBoard);


}

function createBoard() {
    var SIZE = 4;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0, isShown: true,
                isMine: false, isMarked: true
            };

            board[i][j] = cell;
        }
    }
    // Place 2 Mines manually

    board[2][2].isMine = true;
    board[3][0].isMine = true;
    console.log('board', board);
    return board
}



function renderBoard(board) {
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currentCell = board[i][j];
            strHTML += `<td onclick="cellClicked(this, ${i},${j})" class="cell cell-">`;
            if (currentCell.isShown) {
                if (currentCell.isMine) {
                    strHTML += MINE_IMG;
                } else {
                    currentCell.minesAroundCount = getMinesNegsCount(i , j, board)
                    strHTML += `${currentCell.minesAroundCount}`
                }
            }
            strHTML += `</td>`;
        }
        strHTML += '</tr>';
    }
    // console.log('strHTML' , strHTML);
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;

}


function getMinesNegsCount(cellI, cellJ, board) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine === true) negsCount++;

        }
    }
    console.log('negsCount', negsCount);

    return negsCount;
}


function cellClicked(elCell, i, j) {
    var cellClass = 'cell-' + i + '-' + j;
    

    console.log(cellClass);

}

function getCellLocation(location) { // {i:2,j:7}
    var cellClass = 'cell-' + location.i + '-' + location.j; // 'cell-2-7'
    console.log(cellClass);
    return cellClass;
}






