import { Fragebogen } from './fragebogen.model';
export class FragebogenDetail{
  static fragebogenDetail : FragebogenDetail = new FragebogenDetail();

  id_fragebogen: number;
  fragebogen: Fragebogen;
}
