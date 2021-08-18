import { IHistoricDB } from '../../../api';
import { HTMLParser } from '../../util/DOMParse';
import html from './historic.html?raw';

import './historic.scss';

export class HistoricController {
  
  public element: Element;
  private _template: String = '';
  private static instance: HistoricController;

  constructor () {
    this.element = HTMLParser(html);
    this._setTemplate();
    this.element.querySelector('.close')?.addEventListener('click', this._close)

    if (HistoricController.instance) {
      return HistoricController.instance;
    }

    HistoricController.instance = this;
  }

  /**
   * Open historic page
   * 
   * @param historics Historic data
   */
  public open(historics: Array<IHistoricDB>) {
    const listElement = this.element.querySelector("ul") as Element;
    listElement.innerHTML = '';

    historics.forEach((historic: IHistoricDB) => {
      const element = document.createElement('li');
      element.innerHTML =  this._createElement(historic);
      listElement.appendChild(element);
    });

    this.element.classList.add('show');
  }

  /**
   * Close historic page
   * 
   * @param event Any
   */
  private _close (event: any) {
    console.log(event.target)
    event.target.closest('#historic').classList.remove('show');
  }
  /**
   * Set list template
   */
  private _setTemplate() {
    const liElement = this.element.querySelector("li");
    this._template = liElement?.innerHTML as String;
    liElement?.remove();
  }
  
  /**
   * Create a item to historic list
   * 
   * @param historics Historic data
   * @returns String
   */
  private _createElement (historics: IHistoricDB) {
    const board = historics.board.map((cell: String) => `<div>${cell}</div>`).join().replaceAll(',', '');
    
    return this._template
      .replace('{{ winner }}', historics.winner)
      .replace('{{ difficulty }}', historics.difficulty)
      .replace('{{ board }}', board)
  }
}