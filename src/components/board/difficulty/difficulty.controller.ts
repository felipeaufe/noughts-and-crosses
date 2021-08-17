import { HTMLParser } from '../../../util/DOMParse';
import { DifficultyEnum } from '../../../enums/difficulty.enum';
import html from './difficulty.html?raw';
import { store } from '../../../store';
import './difficulty.scss';

export class DifficultyController {
  
  public element: Element;

  constructor () {
    this.element = HTMLParser(html);

    this._init();
  }

  private _init() {
    const select = this.element.querySelector('select') as Element;

    [
      DifficultyEnum.EASY,
      DifficultyEnum.MEDIUM,
      DifficultyEnum.HARD,
      DifficultyEnum.VERSUS
    ].forEach((difficulty) => {
      const option = document.createElement('option');
      option.value = difficulty;
      option.innerText = difficulty;
      select.appendChild(option);
    })
    
    select.addEventListener('change', (event: any) => {
      const value = event.target.value;
      store.setDifficulty(value);
    })
  }
}