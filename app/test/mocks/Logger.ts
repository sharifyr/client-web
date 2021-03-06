import * as util from "util";
const bunyanLumberjack = require("bunyan-lumberjack");

import { ILogger } from "../../src/utils/ILogger";

export class Logger implements ILogger {

  public info = (...args: any[]) => {
    console.log("INFO:",util.inspect([args.reverse()], false, null, true));
  }

  public warn = (...args: any[]) => {
    console.log("WARN:", util.inspect([args.reverse()], false, null, true));
  }

  public debug = (...args: any[]) => {
    console.log("DEBUG:",util.inspect([args.reverse()], false, null, true));
  }

  public error = (...args: any[]) => {
    console.log("ERROR:",util.inspect([args.reverse()], false, null, true));
  }
}
