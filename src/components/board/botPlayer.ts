import { PlayerEnum } from "../../enums/board.enum";
import { DifficultyPercentageEnum } from "../../enums/difficulty.enum";
import { IBotMove } from "../../interfaces/board.interface";
import { DifficultyEnum } from '../../enums/difficulty.enum';
import { store } from "../../store";
import { Winner } from "./winner"

export class BotPlayer {

  constructor () {}

  /**
   * Return the best movement;
   * 
   * @param positions Elements Matrix
   * @param maximizing Deep validation
   * @returns IBotMove position
   */
  public chooseMove(positions: Array<Array<Element>>, maximizing: Boolean): IBotMove {
    
    let movement: IBotMove = {
      row: 0,
      column: 0
    }

    const board = this._setBoard(positions);

    if(this._masterPlay()) {
      const bestMovement = this._getBestMove(board, maximizing);
      movement = this._getPosition(bestMovement);
    } else {
      const bestMovement = this._randomMove(board);
      movement = this._getPosition(bestMovement);
    }


    return movement;
  }

  /**
   * Convert the Elements Matrix to Array.
   * @param positions Elements Matrix
   */
  private _setBoard (positions: Array<Array<Element>>): Array<string> {
    return positions
      .map((array: Array<Element>) => array.map((element: Element) => element.innerHTML))
      .toString()
      .split(',');
  }


  /**
   * Find and return the best position movement;
   * 
   * @param board Array board
   * @param maximizing Max or Min
   * @param depth pontiation
   * @returns Index of the best position
   */
  private _getBestMove(board: Array<String>, maximizing: Boolean, depth = 0) {
    
    const _backupBoard = [...board];
    let best = -100;
    let _maximizing = false;
    let player = PlayerEnum.PLAYER_X;
    let _nodesMap = new Map();

    const winner = Winner.checkBoardWin([
    _backupBoard.splice(0,3),
    _backupBoard.splice(0,3),
    _backupBoard.splice(0,3),
    ]);

    if (!maximizing) {
      best = 100;
      _maximizing = true;
      player = PlayerEnum.PLAYER_O;
    }

    if(winner || depth === -1 ) {
      if(winner === PlayerEnum.PLAYER_X) {
        return 100 - depth;
      } else if(winner === PlayerEnum.PLAYER_O) {
        return -100 + depth;
      }
      return 0;
    }

     //Loop through all empty cells
    this._getAvailableMoves(board).forEach((index: Number) => {
            
      //Initialize a new board with a copy of our current state
      const child = [...board];

      //Create a child node by inserting the maximizing symbol x into the current empty cell
      child[index as number] = player;
      
      //Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
      const nodeValue = this._getBestMove(child, _maximizing, depth + 1);
      
      //Updating best value
      if (maximizing) {
        best = Math.max(best, nodeValue);
      } else {
        best = Math.min(best, nodeValue);
      }

      //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
      if (depth == 0) {
          //Comma separated indices if multiple moves have the same heuristic value
          const moves = _nodesMap.has(nodeValue)
              ? `${_nodesMap.get(nodeValue)},${index}`
              : index;
          _nodesMap.set(nodeValue, moves);
      }
    });

    //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
    if (depth == 0) {
        let returnValue;
        if (typeof _nodesMap.get(best) == "string") {
            const arr = _nodesMap.get(best).split(",");
            const rand = Math.floor(Math.random() * arr.length);
            returnValue = arr[rand];
        } else {
            returnValue = _nodesMap.get(best);
        }

        return returnValue;
    }

     return best;
  }

  /**
   * Return all available movements
   * 
   * @param board Board array position
   * @returns 
   */
  private _getAvailableMoves (board: Array<String>): Array<Number> {
    const moves: Array<Number> = [];

    board.forEach((cell: String, index: number) => {
      if(cell === "") {
        moves.push(index);
      }
    });

    return moves;
  }

  /**
   * Get the row and column index to matrix
   * 
   * @param bestMovement Number
   * @returns IBotMove object
   */
  private _getPosition(bestMovement: Number): IBotMove {
    const movement: IBotMove = {
      row: 0,
      column: 0
    };

    let count = 0;
    for(let index = 0; index <= bestMovement; index++) {
      
      if(count == 3) {
        count = 0;
      }

      if(index <= 2) {
        movement.row = 0
        movement.column = count;
      } else if (index > 2 && index <=5) {
        movement.row = 1
        movement.column = count;
      } else {
        movement.row = 2
        movement.column = count;
      }

      count++;
    }

    return movement;
  }

  /**
   * Return a random available move
   * 
   * @param board Array
   */
  private _randomMove (board: Array<String>): Number {
    const cells = this._getAvailableMoves(board);
    return cells[Math.floor(Math.random() * cells.length)];
  }

  /**
   * Random change based on level difficulty
   * 
   * @returns Boolean
   */
  private _masterPlay (): Boolean {
    const percentage = Math.floor(Math.random() * 101);
    
    if(
      store.getDifficulty() === DifficultyEnum.EASY &&
      percentage <= DifficultyPercentageEnum.EASY
    ) {
      return true;
    } else if(
      store.getDifficulty() === DifficultyEnum.MEDIUM &&
      percentage <= DifficultyPercentageEnum.MEDIUM
    ) {
      return true;
    } else if(
      store.getDifficulty() === DifficultyEnum.HARD &&
      percentage <= DifficultyPercentageEnum.HARD
    ) {
      return true;
    };

    return false;
  }
}