import { HTMLParser } from '../../util/DOMParse';
import html from './footer.html?raw';
import './footer.scss';

export class FooterController {
  
  public element: Element;

  constructor () {
    this.element = HTMLParser(html);
  }
}