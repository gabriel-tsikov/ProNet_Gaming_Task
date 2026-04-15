import { HouseBase } from './house-base';

export class HouseDetailModel extends HouseBase {
  words!: string;
  titles!: string[];
  seats!: string[];
  currentLord!: string;
  heir!: string;
  overlord!: string;
  founded!: string;
  founder!: string;
  diedOut!: string;
  ancestralWeapons!: string[];
  cadetBranches!: string[];
  swornMembers!: string[];
}