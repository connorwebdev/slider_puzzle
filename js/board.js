class Board {
	constructor(rows, columns, difficulty) {
		this.rows = rows;
		this.columns = columns;
		this.difficulty = difficulty;
		this.pieces = this.createPieces(difficulty);
		this.spaces = this.createSpaces();
	}

	/** 
	 * Removes all current pieces and spaces on the board
	 */
	reset() {
		const htmlPieces = document.querySelectorAll('.piece');
		const htmlSpaces = document.querySelectorAll('.space');
		const winMessage = document.querySelector('.winMessageWrap');
		
		winMessage != null ? winMessage.remove() : null;
		htmlPieces.forEach(htmlPiece => htmlPiece.remove());
		htmlSpaces.forEach(htmlSpace => htmlSpace.remove());
	}

	/** 
	 * Generates 2D array of spaces. 
	 * @return  {array} - An array of space objects
	 */
	createSpaces() {
		let spaces = [];
		for(let x = 0; x < this.columns; x++){
			const column = [];
			for(let y = 0; y < this.rows; y++){
				column.push(new Space(x, y));
			}
			spaces.push(column);
		}
		return spaces;
	}

	/** 
	 * Generates 2D array of pieces. 
	 * @return  {array} - An array of pieces objects
	 */
	createPieces() {
		let pieces = [];
		for(let x = 0; x < this.columns; x++){
			const column = [];
			for(let y = 0; y < this.rows; y++){
				//Do not create piece if is last piece in the bottom right
				if( y !== (this.rows -1) || x !== (this.columns -1)){
					column.push(new Piece(x, y, this.difficulty));
				}
				
			}
			pieces.push(column);
		}
		return pieces;
	}

	/** 
	 * Loops through our spaces and pieces arrays and creates an element for each.
	 */
	createBoard(difficulty) {
		this.difficulty = difficulty;
		let boardElement = document.getElementById('grid');
		boardElement.style.width = (this.columns * 160) + 'px';
		boardElement.style.height = (this.rows * 160) + 'px';
		for (let column of this.pieces) {
			for (let piece of column) {
				piece.drawPiece(this.columns);
			}
		}
		for (let column of this.spaces) {
			for (let space of column) {
				space.createSpace();
				space.markInitial(this.pieces);
			}
		}
	}

	/** 
	 * Looks for the piece to the top, left, right or below and returns it.
	 * @param {string} direction - Which direction around the epmty square we want to get
	 * @param {int} x - The X axis position of the empty square
	 * @param {int} y - The Y axis position of the empty square
	 * @return {obj} - The adjacent piece in the direction given.
	 */
	getPiece(direction, x, y) {
		//Loop through our pieces.
		for(let j = 0; j < this.columns; j++){
			for(let k = 0; k < this.rows; k++){
				//Make sure we're not looking for a piece in the bottom right where there is none
				if(j !== (this.columns - 1) || k !== (this.rows - 1)) {
					switch (direction) {
						case 'up':
							//Looping through our pieces to find the one with the same X value and minus 1 Y value, ie. the piece above
							if(this.pieces[j][k].x === x && this.pieces[j][k].y === (y - 1) ) {
								return this.pieces[j][k];
							}
						 	break;
						case 'right':
							//Looping through our pieces to find the one with the same Y value and plus 1 X value, ie. the piece to the right
							if(this.pieces[j][k].x === (x + 1) && this.pieces[j][k].y === y ) {
								return this.pieces[j][k];
							}
						 	break;
						case 'down':
							//Looping through our pieces to find the one with the same X value and plus 1 Y value, ie. the piece below
							if(this.pieces[j][k].x === x && this.pieces[j][k].y === (y + 1) ) {
								return this.pieces[j][k];
							}
						  	break;
						case 'left':
							//Looping through our pieces to find the one with the same Y value and minus 1 X value, ie. the piece to the left
							if(this.pieces[j][k].x === (x - 1) && this.pieces[j][k].y === y ) {
								return this.pieces[j][k];
							}
						  	break;
						default:
						  console.log('checkPiece function wasn\'t given a direction');
					  }
				}
			}
		}
	}

	/** 
	 * Loops through our pieces to find the empty square, finds adjacent squares and randomly selects one
	 * to move into the empty square.
	 */
	shufflePieces() {
		let surroundingPieces = [];
		for(let x = 0; x < this.columns; x++){
			for(let y = 0; y < this.rows; y++){

				// Find the empty space
				if(this.spaces[x][y].currentPiece === null) {
					// Find the surrounding pieces
					// Get piece above
					if( y > 0 ) {
						surroundingPieces.push( this.getPiece('up', x, y) );
					}
					// Get piece below
					if( y < this.rows - 1 ) {
						surroundingPieces.push( this.getPiece('down', x, y) );
					}
					// Get piece left
					if( x > 0 ) {
						surroundingPieces.push( this.getPiece('left', x, y) );
					}
					// Get piece right
					if( x  < this.columns - 1 ) {
						surroundingPieces.push( this.getPiece('right', x, y) );
					}

					//Randomly pick a surrounding piece;
					let randomSurroundPiece = surroundingPieces[ this.getRandomNumber( surroundingPieces.length ) ];

					//Remove piece from space so other pieces can move into it
					this.spaces[randomSurroundPiece.x][randomSurroundPiece.y].currentPiece = null;

					//Updating the space we're moving into with our moving piece
					this.spaces[x][y].currentPiece = randomSurroundPiece;

					//Update our random pieces position and re-render it
					switch(true) {
						case (randomSurroundPiece.x === x - 1):
							randomSurroundPiece.x++;
							break;
						case (randomSurroundPiece.x === x + 1):
							randomSurroundPiece.x--;
							break;
						case (randomSurroundPiece.y === y - 1):
							randomSurroundPiece.y++;
							break;
						case (randomSurroundPiece.y === y + 1):
							randomSurroundPiece.y--;
							break;
						default:
							break;
					}
					
					randomSurroundPiece.updatePiece();
					
					return;
				}
			}
		}
	}

	/** 
	 * Checks if a piece is in the bottom right.
	 * @return  {boolean} - Is there a piece in the bottom right?
	 */
	checkPieces() {
		let piecesAreInvalid = true;
		let bottomRightSpace = this.spaces[this.columns - 1][this.rows - 1].currentPiece;
		if(bottomRightSpace === null) {
			piecesAreInvalid = false;
		} else {
			piecesAreInvalid = true;
		}
		return piecesAreInvalid;
	}

	/** 
	 * Generates a random number between 0 and the row length or column length.
	 * @param {int} - gridDirection - The length of board columns or rows.
	 * @return {int} - Random row or column position value.
	 */
	getRandomNumber(gridDirection) {
		let randomNumber = Math.floor(Math.random() * (gridDirection ));
		return randomNumber;
	}

	/** 
	 * Loops through our pieces updates their position on the board and assign them to their new space.
	 */
	updatePieces() {
		for(let x = 0; x < this.columns; x++){
			for(let y = 0; y < this.rows; y++){
				
				let isLastSpace = false;
				if(x === (this.columns - 1) && y === (this.rows - 1)){
					isLastSpace = true;
				}
				if(isLastSpace === false) {
					this.pieces[x][y].updatePiece();
					this.spaces[this.pieces[x][y].x][this.pieces[x][y].y].currentPiece = this.pieces[x][y];
				}
			}
		}
	}

}

