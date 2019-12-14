import { rmdir } from "fs";
import { promisify } from "util";

export default promisify(rmdir);
