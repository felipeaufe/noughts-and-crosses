import { PlayerEnum } from "../../enums/board.enum";

export class Winner {
  
  constructor () {}
  
  /**
   * Check the possible lines on the board
   */
  public static checkBoardWin(positions: Array<Element>[] = [[],[],[]]): PlayerEnum | Boolean {
    
    const result = positions.map((row: Array<Element>) => row.map((item: Element) => {
      if(item.innerHTML === PlayerEnum.PLAYER_X) {
        return 1;
      } else if(item.innerHTML === PlayerEnum.PLAYER_O) {
        return -1;
      }

      return 0;
    }));

    // Possibilities to win
    const win = [
      // Horizontal
      this._checkPlayerWin(result[0]),
      this._checkPlayerWin(result[1]),
      this._checkPlayerWin(result[2]),

      // Vertical
      this._checkPlayerWin([result[0][0], result[1][0], result[2][0]]),
      this._checkPlayerWin([result[0][1], result[1][1], result[2][1]]),
      this._checkPlayerWin([result[0][2], result[1][2], result[2][2]]),

      // Diagonal
      this._checkPlayerWin([result[0][0], result[1][1], result[2][2]]),
      this._checkPlayerWin([result[0][2], result[1][1], result[2][0]]),
    ].find((value: Number) => (value === 3 || value === -3));

    // Check if there is a winner and who is the winner
    if(win) {
      return win === 3 ? PlayerEnum.PLAYER_X : PlayerEnum.PLAYER_O;
    }

    // Check if tied game
    if (this._checkTied(result)) {
      return PlayerEnum.PLAYER_XO;
    }

    return false;
  }

  /**
   * Check if you are a winning player
   * 
   * @param row: Array<Number>
   */
  private static _checkPlayerWin(row: Array<number>): Number {
    return row.reduce((accumulator: number, current: number) => accumulator + current)
  }

  /**
   * Check if tied game
   * @param result Array<Array<Number>>
   */
  private static _checkTied (result: Array<Array<Number>>): Boolean {
    let isFinished = true;
    result.forEach((row: Array<Number>) => row.forEach((value: Number) => {
      if(value === 0) {
        isFinished = false;
      }
    }));

    return isFinished;
  }
}