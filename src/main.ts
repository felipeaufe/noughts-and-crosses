import { Header } from './components/header/Header';
import { Board } from './components/board/Board';
import { Footer } from './components/footer/Footer';

import './styles/base.scss';

const app: HTMLElement = document.querySelector<HTMLElement>('#app') || document.createElement('div');

app.appendChild(new Header().element)
app.appendChild(new Board().element)
app.appendChild(new Footer().element)