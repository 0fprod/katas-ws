import { Direction } from "../../interfaces";
import { North } from "./North";
import { South } from "./South";


export class East implements Direction {
  turnRight(): Direction {
    return new South();
  }
  turnLeft(): Direction {
    return new North();
  }
}
