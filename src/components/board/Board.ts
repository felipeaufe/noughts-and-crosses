import { HTMLParser } from '../../util/DOMParse';
import { PlayerEnum } from '../../enums/board.enum';
import { DifficultyEnum } from '../../enums/difficulty.enum';
import { IScoreboard } from '../../interfaces/board.interface';
import { Notifications } from './notifications/Notifications';
import { Difficulty } from './difficulty/Difficulty';
import { store } from '../../sotre';
import { Observer } from '../../util/Observer';
import html from './board.html?raw';
import './board.scss';

export class Board {
  
  public element: Element;
  
  private _currentPlayer: PlayerEnum = PlayerEnum.PLAYER_X;
  private _currentPlayerElement: Element;
  private _positions: Array<Element>[] = [[],[],[]];
  private _playedCount = 0;
  private _difficulty: Element;
  private _scoreboard: IScoreboard;
  private _notification: Notifications;

  constructor () {
    this.element = HTMLParser(html);
    this._currentPlayerElement = this.element.querySelector('#player') as Element;
    this._scoreboard = {
      player_x: {
        count: 0,
        element: this.element.querySelector('#player-x .count') as Element
      },
      player_o: {
        count: 0,
        element: this.element.querySelector('#player-o .count') as Element
      } 
    }

    this._notification = new Notifications();
    this.element.appendChild(this._notification.element);
    
    this._difficulty = new Difficulty().element;
    this.element.insertBefore(this._difficulty, this.element.firstChild);

    this._initBoard();

    store.watch.observe(() => {
      this.resetBoard();
    });
  }

  /**
   * Mapping the DOM Elements of the Board into matrix
   */
  private _initBoard(): void {
    
    this.element
      .querySelectorAll('.board button')
      .forEach((item: Element, index: number) => {
      
      if(index < 3) {
        this._positions[0].push(item);
      } else if(index < 6) {
        this._positions[1].push(item);
      } else {
        this._positions[2].push(item);
      }

      item.addEventListener('click', (event) => this._onClick(event.target as Element));
    });
  }

  /**
   * Click capture and validate if the field of play is valid
   * 
   * @param element Element
   */
  private _onClick(element: Element): void {
    const content = element.innerHTML;
    
    if(!content) {
      this._setPlayed(element);
    }
  }

  /**
   * Set new play
   * 
   * @param element Element
   */
  private _setPlayed(element: Element): void {
    element.innerHTML = this._currentPlayer;
    this._playedCount++;
    this._changePlayer();
    this._checkBoardWin();
  }

  /**
   * Toggle player
   */
  private _changePlayer(player?: PlayerEnum) {

    if(player) {
      this._currentPlayer = player;
    } else {
      this._currentPlayer = this._currentPlayer !== PlayerEnum.PLAYER_X 
        ? PlayerEnum.PLAYER_X
        : PlayerEnum.PLAYER_O;
    }

    this._currentPlayerElement.innerHTML = this._currentPlayer;

    console.log(store.state.difficulty);
    if(store.state.difficulty !== DifficultyEnum.VERSUS && this._currentPlayer === PlayerEnum.PLAYER_O) {
      // Player Vs IA
      this.element.querySelector('.board')?.classList.add('block');
    } else {
      // Player Vs Player
      this.element.querySelector('.board')?.classList.remove('block');
    }
  }

  /**
   * Check the possible lines on the board
   */
  private _checkBoardWin(): void {
    if(this._playedCount >= 3) {
      const result = this._positions.map((row: Array<Element>) => row.map((item: Element) => {
        if(item.innerHTML === PlayerEnum.PLAYER_X) {
          return 1;
        } else if(item.innerHTML === PlayerEnum.PLAYER_O) {
          return -1;
        }

        return 0;
      }));

      // Possibilities to win
      // Horizontal
      this._checkPlayerWin(result[0]);
      this._checkPlayerWin(result[1]);
      this._checkPlayerWin(result[2]);

      // Vertical
      this._checkPlayerWin([result[0][0], result[1][0], result[2][0]]);
      this._checkPlayerWin([result[0][1], result[1][1], result[2][1]]);
      this._checkPlayerWin([result[0][2], result[1][2], result[2][2]]);

      // Diagonal
      this._checkPlayerWin([result[0][0], result[1][1], result[2][2]]);
      this._checkPlayerWin([result[0][2], result[1][1], result[2][0]]);

      // Check if tied game
      this._checkTied(result);
    }
  }

  /**
   * Check if you are a winning player
   * 
   * @param row: Array<Number>
   */
  private _checkPlayerWin(row: Array<number>): void {
    const result = row.reduce((accumulator: number, current: number) => accumulator + current)
    
    if(result === 3) {
      this._notification.winPlayerX();
      this._scoreboard.player_x.count++;
      this._scoreboard.player_x.element.innerHTML = this._scoreboard.player_x.count.toString();
    }

    if(result === -3) {
      this._notification.winPlayerO();
      this._scoreboard.player_o.count++;
      this._scoreboard.player_o.element.innerHTML = this._scoreboard.player_o.count.toString();
    }

    if(result === 3 || result === -3) {
      this.resetBoard();
    }
  }

  /**
   * Check if tied game
   * @param result Array<Array<Number>>
   */
  private _checkTied (result: Array<Array<Number>>): void {
    let isFinished = true;
    result.forEach((row: Array<Number>) => row.forEach((value: Number) => {
      if(value === 0) {
        isFinished = false;
      }
    }));

    if(isFinished) {
      this._notification.tiePlayers();
      this.resetBoard();
    }
  }

  /**
   * Reset board
   */
  public resetBoard(): void {
    setTimeout(() => {
      this._changePlayer(PlayerEnum.PLAYER_X);
      this._positions.forEach((row: Array<Element>) => row.forEach((element: Element) => element.innerHTML = ''));

    }, 300);
  };
}