let currentPlayer = "X";
const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray =()=>{
    let board = [];
    for(let row = 0;row< NUMBER_OF_ROWS;row ++){
        board.push(Array.from({length:NUMBER_OF_ROWS},()=>"_"))
    }
    return board
}

let board = createBoardArray();


const resetBoard =()=>{
    document.querySelector(".board").remove();
    createBoard();
    board =createBoardArray();
    turnsCounter =0;
    currentPlayer = "X";
}

const checkRows = (currentPlayer)=>{
    let column = 0

    for(row = 0;row < NUMBER_OF_ROWS ;row ++){
        while(column < NUMBER_OF_ROWS){
            if(board[row][column]!== currentPlayer){
                column = 0;
                break
            }
            column ++;
        }
        if(column === NUMBER_OF_ROWS)return true;
    }
}
const checkColumns = (currentPlayer)=>{
    let row = 0

    for(column = 0;column < NUMBER_OF_ROWS ;column ++){
        while(row < NUMBER_OF_ROWS){
            if(board[row][column]!== currentPlayer){
                row = 0;
                break
            }
            row ++;
        }
        if(row === NUMBER_OF_ROWS)return true;
    }
}
const checkDiagonals = (currentPlayer)=>{
    let count = 0
        while(count < NUMBER_OF_ROWS){
            if(board[count][count]!== currentPlayer){
                count = 0;
                break
            }
            count ++;
        }
        if(count === NUMBER_OF_ROWS)return true;
}
const checkReverseDiagonals = (currentPlayer)=>{
    let count = 0
    while(count < NUMBER_OF_ROWS){
        if(board[count][NUMBER_OF_ROWS -1 - count]!== currentPlayer){
            count = 0;
            break
        }
        count ++;
    }
    if(count === NUMBER_OF_ROWS)return true;
}

const checkWin = (currentPlayer)=>{
    if(checkRows(currentPlayer)){
        return true
    }
    if(checkColumns(currentPlayer)){
        return true
    }
    if(checkDiagonals(currentPlayer)){
        return true
    }
    if(checkReverseDiagonals(currentPlayer)){
        return true
    }
};

const runWinEvent = (currentPlayer)=>{
    setTimeout(() => {
        alert(`Player ${currentPlayer} won!`);
        resetBoard();
    }, 100);
}
const runDrawEvent = ()=>{
    setTimeout(() => {
        alert("Draw");
        resetBoard();
    }, 100);
}

const getCellPlacement = (index,numberOfRows)=>{
    const row = Math.floor(index / numberOfRows);
    const col = index % numberOfRows
    return [ row, col]

}
const drawMarkInCell = (cell,currentPlayer)=>{
    cell.querySelector('.value').textContent = currentPlayer;
    cell.classList.add(`cell--${currentPlayer}`)
}

const cellClickHandler = (event,index) =>{
    const cell = event.target;
    const [row,col] = getCellPlacement(index,NUMBER_OF_ROWS);
    if (board[row][col]==="_"){
        turnsCounter++;
        board[row][col] = currentPlayer;
        drawMarkInCell(cell,currentPlayer);
       
        if (checkWin(currentPlayer)){
            runWinEvent(currentPlayer)
        }else{
            turnsCounter === turns && runDrawEvent();
            currentPlayer = currentPlayer === "X"?"O":"X";
        }
    }

    
  
}


const createCell = (index)=>{
    const cellElementString = `<div class="cell" role="button" tabindex="${index+1}"><span class="value"></span></div>`
    const cellElement = document.createRange().createContextualFragment(cellElementString)

    cellElement.querySelector(".cell").onclick = (event)=>cellClickHandler(event,index)
    cellElement.querySelector(".cell").onkeydown = (event)=>event.key === "Enter" ? cellClickHandler(event,index) :true;

    return cellElement;
}

const createBoard =()=>{
    const container = document.querySelector('.container');
    const board = document.createElement("div");
    board.classList.add("board");

    for(let i = 0; i < NUMBER_OF_ROWS ** 2; i++){
       const cellElement =createCell(i);
        board.appendChild(cellElement);
        document.documentElement.style.setProperty("--grid-rows",NUMBER_OF_ROWS)
    }
    container.insertAdjacentElement("afterbegin",board)
}
createBoard();
document.querySelector("#reset").onclick = ()=> resetBoard();