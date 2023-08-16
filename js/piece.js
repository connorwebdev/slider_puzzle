class Piece {
	constructor(x,y,difficulty) {
		this.x = x;
		this.y = y;
		this.id = `piece-${x}-${y}`;
		this.correctX = x;
		this.correctY = y;
		this.difficulty = difficulty;
	}

	/** 
	 * Creates an HTML element for our piece and renders it on the board
	 */
	drawPiece(columnCount) {
		let piece = document.createElement('div');
		let count = document.createElement('span');
		piece.setAttribute('class', 'piece');
		
		
		piece.setAttribute('id', this.id);
		piece.setAttribute('data-x', this.x);
		piece.setAttribute('data-y', this.y);
		piece.setAttribute('data-x-original', this.x);
		piece.setAttribute('data-y-original', this.y);
		count.classList.add('count');
		count.classList.add('hide');
		count.innerText = (this.x + 1) + (this.y * columnCount);
		piece.style.left = (this.x * 160) + 'px';
		piece.style.top = (this.y * 160) + 'px';
		piece.style.backgroundPositionX = ( (this.x) * 320 )+"px";
		piece.style.backgroundPositionY = ( (this.y) * 320 )+"px";
		if(this.difficulty == '3x4') {
			piece.setAttribute('class', 'piece three-by-four');
			piece.style.backgroundPositionX = ( (this.x) * 480 )+"px";
		} else if(this.difficulty == '4x4') {
			piece.setAttribute('class', 'piece four-by-four');
			piece.style.backgroundPositionX = ( (this.x) * 480 )+"px";
			piece.style.backgroundPositionY = ( (this.y) * 480 )+"px";
		} else if(this.difficulty == '4x5') {
			piece.setAttribute('class', 'piece four-by-five');
			piece.style.backgroundPositionX = ( (this.x) * 640 )+"px";
			piece.style.backgroundPositionY = ( (this.y) * 480 )+"px";
		}
		piece.appendChild(count);
		document.getElementById("grid").appendChild(piece); 
	}

	/** 
	 * Updates the position and attributes for our piece after it has been shuffled or clicked
	 */
	updatePiece() {
		let piece = document.getElementById(this.id);
		piece.style.left = (this.x * 160) + 'px';
		piece.style.top = (this.y * 160) + 'px';
		piece.setAttribute('data-x', this.x);
		piece.setAttribute('data-y', this.y);
	}

	/** 
	 * check if the pieces x and y values are the same as it's correct x and y values, ie. is in the correct position
	 * @return  {boolean} - Is this piece in it's correct place, yes/no
	 */
	isCorrectPosition() {
		if(this.x === this.correctX && this.y === this.correctY){
			return true;
		} else {
			return false
		}
	}

}