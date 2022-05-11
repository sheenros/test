import { Race } from "./race";
export class Dog {
  id: bigint = BigInt(0);
  name: string='';
  age: number =0;
  color: string='';
  race!:Race
}
