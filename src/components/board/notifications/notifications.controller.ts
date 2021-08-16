import { HTMLParser } from '../../../util/DOMParse';
import { PlayerEnum, WinDescriptionEnum } from '../../../enums/board.enum';
import html from './notifications.html?raw';
import './notifications.scss';

export class NotificationsController {
  
  public element: Element;
  private _player: Element;
  private _description: Element;

  constructor () {
    this.element = HTMLParser(html);
    this._player = this.element.querySelector('#player') as Element;
    this._description = this.element.querySelector('#description') as Element;
  }

  /**
   * Show Player x win notification
   */
  public winPlayerX(): void {
    this._showWinner(PlayerEnum.PLAYER_X, WinDescriptionEnum.WINNER);
  }

  /**
   * Show Player o win notification
   */
  public winPlayerO(): void {
    this._showWinner(PlayerEnum.PLAYER_O, WinDescriptionEnum.WINNER);
  }

  /**
   * Show tie notification
   */
  public tiePlayers(): void {
    this._showWinner(PlayerEnum.PLAYER_XO, WinDescriptionEnum.TIE);
  }

  /**
   * Show notification
   */
  private _showWinner (player: PlayerEnum, description: WinDescriptionEnum) {
    const content = this.element.querySelector("div") as Element;
    this._player.innerHTML = player;
    this._description.innerHTML = description;
    
    this.element.classList.add('enable');

    // Show result fade-in
    setTimeout(() => {
      content.classList.add('show');
    });
    
    // Remove result fade-out
    setTimeout(() => {
      content.classList.remove('show');
    }, 2000);
    setTimeout(() => {
      this.element.classList.remove('enable');
    },2800);
  }
}