import { Direction } from "../../interfaces";
import { East } from "./East";
import { West } from "./West";


export class North implements Direction {
  turnRight(): Direction {
    return new East();
  }
  turnLeft(): Direction {
    return new West();
  }
}
