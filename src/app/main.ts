import { HeaderController } from './components/header/header.controller';
import { BoardController } from './components/board/board.controller';
import { HistoricController } from './components/historic/historic.controller';
import { FooterController } from './components/footer/footer.controller';

import './styles/base.scss';

const app: HTMLElement = document.querySelector<HTMLElement>('#app') || document.createElement('div');

app.appendChild(new HeaderController().element);
app.appendChild(new BoardController().element);
app.appendChild(new HistoricController().element);
app.appendChild(new FooterController().element);