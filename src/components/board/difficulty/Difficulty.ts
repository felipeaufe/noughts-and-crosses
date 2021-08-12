import { HTMLParser } from '../../../util/DOMParse';
import { DifficultyEnum } from '../board.enum';
import html from './difficulty.html?raw';
import './difficulty.scss';

export class Difficulty {
  
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
      console.log({value});
    })
  }
}