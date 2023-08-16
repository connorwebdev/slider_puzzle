class Space {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.id = `space-${x}-${y}`;
		this.currentPiece = null;
		this.correctPiece = null;
	}

	/** 
	 * Creates an HTML element for our piece
	 */
	createSpace() {
		const space = document.createElement('div');
		space.setAttribute('class', 'space');
		space.setAttribute('id', this.id);
		space.style.left = (this.x * 160) + 'px';
		space.style.top = (this.y * 160) + 'px';
		document.getElementById("grid").appendChild(space); 
	}

	/**
 	* Updates space to reflect which piece has been moved into it.
 	* @param {Array} Board pieces
 	*/
	markInitial(pieces) {
		pieces.forEach((piece, i) => {
			pieces.forEach((piece, j) => {
				if(pieces[i][j] != null) {
					if(pieces[i][j].x === this.x && pieces[i][j].y === this.y) {
						this.correctPiece = pieces[i][j];
					}
				}
			});
		});
	}

	/**
 	* Updates space to reflect which piece has been moved into it.
 	* @param {Array} Board pieces
 	*/
	mark(piece) {
		this.currentPiece = piece;
	}

}