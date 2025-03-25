const board = document.getElementById("chessboard");
let selectedPiece = null;
let currentPlayer = "white";

const pieces = {
    "pawn": "♙",
    "rook": "♖",
    "knight": "♘",
    "bishop": "♗",
    "queen": "♕",
    "king": "♔"
};

const initialSetup = [
    ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
];

function createBoard() {
    board.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;
            if ((row + col) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }
            
            if (initialSetup[row][col]) {
                let piece = document.createElement("span");
                piece.classList.add("piece");
                piece.innerText = pieces[initialSetup[row][col]];
                piece.dataset.piece = initialSetup[row][col];
                piece.dataset.color = row < 2 ? "black" : "white";
                piece.addEventListener("click", selectPiece);
                square.appendChild(piece);
            }
            
            square.addEventListener("click", movePiece);
            board.appendChild(square);
        }
    }
}

function selectPiece(event) {
    if (event.target.dataset.color !== currentPlayer) return;
    selectedPiece = event.target;
}

function movePiece(event) {
    if (!selectedPiece) return;
    
    let targetSquare = event.currentTarget;
    if (targetSquare.children.length > 0) return;
    
    targetSquare.appendChild(selectedPiece);
    selectedPiece = null;
    
    currentPlayer = currentPlayer === "white" ? "black" : "white";
}

createBoard();