class Game {
	constructor() {
		this.board = new Board(3,3,'3x3');
		this.ready = false;
		this.clickCounter = 0;
		// this.difficulty = '3x3';
	}

	/**
	 * Handles click events 
	 * @param   {Object}    e - Click event object
	 */
	handleClick(e) {

		if(e.srcElement.id === 'numbers') {
			this.handleNumberToggle(e);
		}

		//Piece click event handler
		if(e.srcElement.classList.contains('piece')){
			
			const clickedPieceElement = document.getElementById(e.srcElement.id);
			const clickedPieceCurrentYValue = parseInt(clickedPieceElement.getAttribute('data-y'));
			const clickedPieceCurrentXValue = parseInt(clickedPieceElement.getAttribute('data-x'));
			const clickedPieceOriginalYValue = parseInt(clickedPieceElement.getAttribute('data-y-original'));
			const clickedPieceOriginalXValue = parseInt(clickedPieceElement.getAttribute('data-x-original'));
			const clickedPieceObject = this.board.pieces[clickedPieceOriginalXValue][clickedPieceOriginalYValue];
			const clickedPieceSpace = this.board.spaces[clickedPieceCurrentXValue][clickedPieceCurrentYValue];
			
			// Check space to the right
			let spaceRight;
			if(clickedPieceCurrentXValue + 1 <= this.board.columns - 1) {
				spaceRight = this.board.spaces[clickedPieceCurrentXValue + 1][clickedPieceCurrentYValue];
				if(spaceRight != null){
					if(spaceRight.currentPiece === null) {
						//Remove piece from space so other pieces can move into it
						clickedPieceSpace.currentPiece = null;
						//Updating the space we're moving into with our clicked piece
						spaceRight.currentPiece = clickedPieceObject;
						//Update our clicked pieces position values
						clickedPieceObject.x ++;
						clickedPieceObject.updatePiece();
						this.clickCounter ++;
						this.checkForWin();
					}
				}
			}

			// Check space to the left
			let spaceLeft;
			let currentSpace;
			if(clickedPieceCurrentXValue - 1 >= 0) {
				spaceLeft = this.board.spaces[clickedPieceCurrentXValue - 1][clickedPieceCurrentYValue];
				if(spaceLeft != null){
					if(spaceLeft.currentPiece === null) {
						//Remove piece from space so other pieces can move into it
						clickedPieceSpace.currentPiece = null;
						//Updating the space we're moving into with our clicked piece
						spaceLeft.currentPiece = clickedPieceObject;
						//Update our clicked pieces position values
						clickedPieceObject.x --;
						clickedPieceObject.updatePiece();
						this.clickCounter ++;
						this.checkForWin();
					}
				}
			}

			// Check space above
			let spaceUp;
			if(clickedPieceCurrentYValue - 1 >= 0) {
				spaceUp = this.board.spaces[clickedPieceCurrentXValue][clickedPieceCurrentYValue - 1];
				if(spaceUp != null){
					if(spaceUp.currentPiece === null) {
						//Remove piece from space so other pieces can move into it
						clickedPieceSpace.currentPiece = null;
						//Updating the space we're moving into with our clicked piece
						spaceUp.currentPiece = clickedPieceObject;
						//Update our clicked pieces position values
						clickedPieceObject.y --;
						clickedPieceObject.updatePiece();
						this.clickCounter ++;
						this.checkForWin();
					}
				}

			}

			// Check space below
			let spaceDown;
			if(clickedPieceCurrentYValue + 1 <= this.board.rows - 1) {
				spaceDown = this.board.spaces[clickedPieceCurrentXValue][clickedPieceCurrentYValue + 1];
				if(spaceDown != null){
					if(spaceDown.currentPiece === null) {
						//Remove piece from space so other pieces can move into it
						clickedPieceSpace.currentPiece = null;
						//Updating the space we're moving into with our clicked piece
						spaceDown.currentPiece = clickedPieceObject;
						//Update our clicked pieces position values
						clickedPieceObject.y ++;
						clickedPieceObject.updatePiece();
						this.clickCounter ++;
						this.checkForWin();
					}
				}
			}
			
		}
	}

	/**
	* Loops through our pieces and check their position is correct to see if all pieces are in correct place. 
	*/
	checkForWin() {
		const counter = this.clickCounter;
		let win = true;
		this.board.pieces.forEach((piece, x) => {
			this.board.pieces.forEach((piece, y) => {
				if(this.board.pieces[x][y] != null){
					if(this.board.pieces[x][y].isCorrectPosition() === false){
						win = false;
					}
				}
			})
		});
		if(win){
			this.insertWinMessage(counter);
		}
	}

	/**
	* Inserts the message that the player has won the game and the reset button. 
	*/
	insertWinMessage(counterValue) {
		//Create message wrapper
		let winMessageWrap = document.createElement('div');
		winMessageWrap.classList.add('winMessageWrap');

		//Create win message
		let winMessage = document.createElement('p');
		winMessage.classList.add('winMessage');
		winMessage.innerText = `Congratulations, you won in ${counterValue} moves! `;

		//Create reset button
		let resetButton = document.createElement('p');
		resetButton.classList.add('resetButton');
		resetButton.innerText = 'Reset';
		resetButton.addEventListener('click', () => {
			location.reload();
		})

		//Add message and button to wrapper element
		winMessageWrap.appendChild(winMessage);
		winMessageWrap.appendChild(resetButton);

		const gameElement = document.querySelector('.game');
		const colElement = document.querySelector('.col');

		setTimeout(function () { 
				gameElement.insertBefore(winMessageWrap, colElement);
		},  150);
	}

	/**
	* Toggles the visibility of numbers of squares in the upper left corner
	* @param {Object}    e - Click event object
	*/
	handleNumberToggle(e) {
		const numberToggle = e.srcElement,
		numbers = document.querySelectorAll('.count');
		numberToggle.addEventListener('change', ()=>{
			if(numberToggle.value === 'numbers'){
				numbers.forEach(number => number.classList.contains('hide') ? number.classList.remove('hide') : null );
			} else if(numberToggle.value === 'nonumbers') {
				numbers.forEach(number => number.classList.contains('hide') ? null : number.classList.add('hide') );
			}
		});
	}

	getDifficulty() {
		const difficulty =  document.getElementById('difficulty').value;
		this.difficulty = difficulty;
	}

	changeDifficulty() {
			const difficulty =  document.getElementById('difficulty').value;
			this.difficulty = difficulty;
			switch (difficulty) {
			  case '3x3':
				this.changeDifficultyUpdate(3,3);
			    break;
			  case '3x4':
				this.changeDifficultyUpdate(3,4);
			    break;
			  case '4x4':
				this.changeDifficultyUpdate(4,4);
			    break;
		      case '4x5':
			 	this.changeDifficultyUpdate(4,5);
			    break;
			  default:
			    console.log('Woops, no valid difficulty.');
			}
	}

	/** 
	* Creates a new board to reflect the updated difficulty value.
	* @param {int}  y - The number of rows for the new board
	* @param {int}  x - The number of columns for the new board 
	*/
	changeDifficultyUpdate(y,x) {
		this.board.reset();
		const numberSelector = document.querySelector('#numbers');
		numberSelector.value = 'nonumbers';
		this.board = new Board(y,x, y+'x'+x);
		this.board.createBoard();
		this.board.createSpaces();
		this.board.createPieces();
		this.board.updatePieces();
		this.clickCounter = 0;
		//Move pieces 100 times to shuffle
		[...Array(100)].forEach(() => this.board.shufflePieces());
		//Keep shuffling until there is no piece in the bottom right
		while(this.board.checkPieces()) {
			this.board.shufflePieces();
		};
	}
	
}