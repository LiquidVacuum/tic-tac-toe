class TicTacToe {
    constructor() {
        this.currentPlayerSymbol = 'x';
        this.field = [[null, null, null], 
                      [null, null, null], 
                      [null, null, null]];
        this.winner = null;
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.field[rowIndex][columnIndex] === null) {
            this.field[rowIndex][columnIndex] = this.currentPlayerSymbol;
            
            (() => {
                let rows = this.field.some(line => line.every((val, i, arr) => val === arr[0] && !!val));
                
                let cols = [];
                for (let i = 0; i < this.field.length; i++) {
                    let arr = [];
                    for (let j = 0; j < this.field[0].length; j++) {
                        arr.push(this.field[j][i]);
                    }
                    cols.push(arr.every((val, i, arr) => val === arr[0] && !!val));
                }
                cols = cols.some(val => val);
                
                let diag1 = [], diag2 = [];
                for (let i = 0; i < this.field.length; i++) {
                    diag1.push(this.field[i][i]);
                    diag2.push(this.field[i][this.field.length - i - 1]);
                }
                diag1 = diag1.every((val, i, arr) => val === arr[0] && !!val);
                diag2 = diag2.every((val, i, arr) => val === arr[0] && !!val);
                
                if(rows || cols || diag1 || diag2) {
                    this.winner = this.currentPlayerSymbol;
                }
            })();
            
            this.currentPlayerSymbol = this.currentPlayerSymbol === 'x' ? 'o' : 'x';
        } 
    }

    isFinished() {
        return this.winner !== null || this.isDraw();
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
       return !this.field.flat().some(e => e === null);
    }

    isDraw() {
        return this.noMoreTurns() && this.winner === null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
