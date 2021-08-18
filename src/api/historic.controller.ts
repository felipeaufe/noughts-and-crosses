import { db } from '../database/connect';
import { PlayerEnum } from '../app/enums/board.enum';
import { DifficultyEnum } from '../app/enums/difficulty.enum';

export interface IHistoricDB {
  winner: PlayerEnum,
  difficulty: DifficultyEnum,
  board: Array<String>
}
const  HISTORIC = 'historic';

export class HistoricController {
  /**
   * Insert a new historic in database
   */
  public static create (body: IHistoricDB) {
    db.create(HISTORIC, body);
  }

  /**
   * Get all historic in database
   */
  public static list () {
    return db.get(HISTORIC);
  }
}
