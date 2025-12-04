import { addRoute, setTitle, type RouteHandlerReturn } from "@app/routing";
import tttPage from "./ttt.html?raw";
import { showError, showInfo, showSuccess } from "@app/toast";

type CellState = 'O' | 'X' | null

class TTC {
    private board: [
        CellState, CellState, CellState,
        CellState, CellState, CellState,
        CellState, CellState, CellState];
    private currentPlayer: 'O' | 'X';
    
    constructor() {
        this.board = [null,null,null,null,null,null,null,null,null];
        this.currentPlayer = 'X';
    }

    private changePlayer()
    {
        if (this.currentPlayer === 'X')
            this.currentPlayer = 'O';
        else 
            this.currentPlayer = 'X';
    }

    private checkState(): 'winX' | 'winO' | 'draw' | 'ongoing'
    {
        const checkRow = (row: number): ('X' | 'O' | null) =>  {
            if (this.board[row * 3] === null)
                return null;
            if (this.board[row * 3] === this.board[row * 3+1] && this.board[row + 1] === this.board[row * 3 + 2])
                return this.board[row * 3];
            return null;
        }

        const checkCol = (col: number): ('X' | 'O' | null) => {
            if (this.board[col] === null) return null;

            if (this.board[col] === this.board[col + 3] && this.board[col + 3] === this.board[col + 6])
                return this.board[col];
            return null;
        }

        const checkDiag = (): ('X' | 'O' | null) => {
            if (this.board[4] === null) return null

            if (this.board[0] === this.board[4] && this.board[4] === this.board[8]) 
                return this.board[4]

            if (this.board[2] === this.board[4] && this.board[4] === this.board[6]) 
                return this.board[4]
            return null;
        }

        
        const row = (checkRow(0) ?? checkRow(1)) ?? checkRow(2);
        const col = (checkCol(0) ?? checkCol(1)) ?? checkCol(2);
        const diag = checkDiag();

        if (row !== null) return `win${row}`;
        if (col !== null) return `win${col}`;
        if (diag !== null ) return `win${diag}`;

        if (this.board.filter(c => c === null).length === 0)
            return 'draw';
        return 'ongoing';
    }

    public makeMove(idx: number): 'winX' | 'winO' | 'draw' | 'ongoing' | 'invalidMove' {
        if (idx < 0 || idx >= this.board.length)
            return 'invalidMove';
        if (this.board[idx] !== null)
            return 'invalidMove';
        this.board[idx] = this.currentPlayer;
        this.changePlayer();
        return this.checkState();
    }

    public getBoard(): [
        CellState, CellState, CellState,
        CellState, CellState, CellState,
        CellState, CellState, CellState]
    {
        return this.board;
    }
}


async function handleTTT(): Promise<RouteHandlerReturn>
{
    let board = new TTC();

    return {
        html: tttPage,
        postInsert: async (app) => {
            let cells = app?.querySelectorAll<HTMLDivElement>(".ttt-grid-cell");

            console.log(cells);

            cells?.forEach(function (c, idx) {
                c.addEventListener('click', () => 
                {
                    const result = board.makeMove(idx);
                    switch(result)
                    {
                        case ('draw'): {
                            showInfo('Game is a draw');
                            break;
                        }
                        case ('invalidMove'): {
                            showError('Move is invalid');
                            break;
                        }

                        case ('winX'): {
                            showSuccess('X won');
                            break;
                        }
                        case ('winO'): {
                            showSuccess('O won');
                            break;
                        }
                    }
                    
                    const board_state = board.getBoard();
                    board_state.forEach( function (cell_state, cell_idx) {
                        cells[cell_idx].innerText = cell_state !== null ? cell_state : " ";
                    })
                })
            })
        }
    }
}


addRoute('/ttt', handleTTT)