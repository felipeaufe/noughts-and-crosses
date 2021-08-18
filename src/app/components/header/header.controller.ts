import { HTMLParser } from '../../util/DOMParse';
import html from './header.html?raw';
import './header.scss';

export class HeaderController {
  
  public element: Element;

  constructor () {
    this.element = HTMLParser(html);
  }
}