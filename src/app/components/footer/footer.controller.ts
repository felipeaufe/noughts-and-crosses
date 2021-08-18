import { HTMLParser } from '../../util/DOMParse';
import html from './footer.html?raw';
import { BoardService } from '../board/board.service';
import { HistoricController } from '../historic/historic.controller';

import './footer.scss';

export class FooterController {
  
  public element: Element;

  constructor () {
    this.element = HTMLParser(html);
    this.element.querySelector('button')?.addEventListener('click', this._onClick);
  }

  private _onClick () {
    let historic = BoardService.getHistoric();

    if (!Array.isArray(historic)) {
      historic = [historic];
    }

    new HistoricController().open(historic);
  }
}