let game = new Game();

game.board.createBoard();
game.board.createSpaces();
game.board.createPieces();
game.board.updatePieces();

//Move pieces 100 times to shuffle
[...Array(100)].forEach(() => game.board.shufflePieces());

//Keep shuffling until there is no piece in the bottom right
while(game.board.checkPieces()) {
    game.board.shufflePieces();
};


 // Listen for mouse clicks
document.addEventListener('click', function(event){
	game.handleClick(event);
});

const difficulty =  document.getElementById('difficulty');
difficulty.addEventListener('change', ()=>{
    game.changeDifficulty();
});