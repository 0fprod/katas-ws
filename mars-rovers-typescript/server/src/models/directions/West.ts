import { Direction } from "../../interfaces";
import { North } from "./North";
import { South } from "./South";

export class West implements Direction {
  turnRight(): Direction {
    return new North();
  }
  turnLeft(): Direction {
    return new South();
  }
}
