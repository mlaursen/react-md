import { writeFile } from "fs";
import { promisify } from "util";

export default promisify(writeFile);
