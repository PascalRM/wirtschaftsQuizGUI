import { Fragebogen } from './fragebogen.model';
import { Frage} from './frage.model';

export class FragebogenDetail{
  static fragebogenDetail : FragebogenDetail = new FragebogenDetail();

  id_fragebogen: number;
  fragebogen: Fragebogen;
  fragen: Frage[];
}
