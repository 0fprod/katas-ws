import { Direction } from "../../interfaces";
import { East } from "./East";
import { West } from "./West";


export class South implements Direction {
  turnRight(): Direction {
    return new West();
  }
  turnLeft(): Direction {
    return new East();
  }
}