import { HTMLParser } from '../../util/DOMParse';
import { PlayerEnum } from '../../enums/board.enum';
import { DifficultyEnum } from '../../enums/difficulty.enum';
import { IBotMove, IScoreboard } from '../../interfaces/board.interface';
import { NotificationsController } from './notifications/notifications.controller';
import { DifficultyController } from './difficulty/difficulty.controller';
import { store } from '../../store';
import { Winner } from './winner';
import { BotPlayer } from './BotPlayer';
import html from './board.html?raw';
import './board.scss';

export class BoardController {
  
  public element: Element;
  
  private _currentPlayerElement: Element;
  private _positions: Array<Element>[] = [[],[],[]];
  private _playsCount = 0;
  private _difficultyElement: Element;
  private _scoreboard: IScoreboard;
  private _notification: NotificationsController;
  private _botPlayer: BotPlayer;

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

    this._notification = new NotificationsController();
    this.element.appendChild(this._notification.element);
    
    this._difficultyElement = new DifficultyController().element;
    this.element.insertBefore(this._difficultyElement, this.element.firstChild);

    this._botPlayer = new BotPlayer();

    this._initBoard();

    store.watches.difficulty.observe(() => {
      this._resetBoard();
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
    element.innerHTML = store.getCurrentPlayer();
    this._playsCount++;

    if(!this._checkBoardWin()) {
      this._changePlayer();
    }
  }

  /**
   * Toggle player
   */
  private _changePlayer(player?: PlayerEnum) {

    if(player) {
      store.setCurrentPlayer(player);
    } else {
      const _player = store.getCurrentPlayer() !== PlayerEnum.PLAYER_X 
        ? PlayerEnum.PLAYER_X
        : PlayerEnum.PLAYER_O;
      store.setCurrentPlayer(_player);
    }

    this._currentPlayerElement.innerHTML = store.getCurrentPlayer();

    if(store.getDifficulty() !== DifficultyEnum.VERSUS && store.getCurrentPlayer() === PlayerEnum.PLAYER_O) {
      this.element.querySelector('.board')?.classList.add('block');
      this._botMovePlay();
    } else {
      // Player Vs Player
      this.element.querySelector('.board')?.classList.remove('block');
    }
  }

  /**
   * Check the possible lines on the board
   */
  private _checkBoardWin(): Boolean {
    if(this._playsCount >= 3) {
      const winner = Winner.checkBoardWin(this._positions);

      if (winner) {
        if(winner === PlayerEnum.PLAYER_X) {
          this._notification.winPlayerX();
          this._scoreboard.player_x.count++;
          this._scoreboard.player_x.element.innerHTML = this._scoreboard.player_x.count.toString();
        }
    
        if(winner === PlayerEnum.PLAYER_O) {
          this._notification.winPlayerO();
          this._scoreboard.player_o.count++;
          this._scoreboard.player_o.element.innerHTML = this._scoreboard.player_o.count.toString();
        }

        if(winner === PlayerEnum.PLAYER_XO) {
          this._notification.tiePlayers();
        }
  
        this._resetBoard();

        return true;
      }
    }

    return false;
  }

  /**
   * Make a move by the bot
   */
  private _botMovePlay (): void {
    setTimeout(() => {
      const movement: IBotMove = this._botPlayer.chooseMove(this._positions, false);

      this._setPlayed(this._positions[movement.row][movement.column]);
    }, 300)
  }

  /**
   * Reset board
   */
  private _resetBoard(): void {
    setTimeout(() => {
      this._changePlayer(PlayerEnum.PLAYER_X);
      this._positions.forEach((row: Array<Element>) => row.forEach((element: Element) => element.innerHTML = ''));

    }, 300);
  };
}