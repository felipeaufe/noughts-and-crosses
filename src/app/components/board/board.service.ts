import { HistoricController, IHistoricDB } from '../../../api';
import { PlayerEnum } from '../../enums/board.enum';
import { DifficultyEnum } from '../../enums/difficulty.enum';

export class BoardService {
  
  constructor () {}

  /**
   * Set new historic in database;
   * 
   * @param winner PlayerEnum
   * @param difficulty DifficultyEnum
   * @param board Array<Array<Element>>
   */
  public static setHistoric (
    winner: PlayerEnum,
    difficulty: DifficultyEnum,
    board: Array<Array<Element>>
  ) {

    const body: IHistoricDB = {
      winner,
      difficulty,
      board: board.map((array: Array<Element>) => array.map((item: Element) => item.innerHTML)).join().split(',')
    };

    HistoricController.create(body);
  }

  /**
   * List all historic in database
   */
  public static getHistoric () {
    const historic = HistoricController.list();

    return historic;
  }
}