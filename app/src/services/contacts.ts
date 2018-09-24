import * as path from "path";
import * as redux from "redux";

import * as http from "../utils/http";
import { config } from "../config";
import * as UserActions from "../actions/user";
import Logger from "../utils/logger";
import { IUserSerialized } from "../models/IUserSerialized";

const logger = Logger(path.normalize(path.basename(__filename)));

export const createRequest = (userId: number) => {

  // response structure:
  /*
  {
    "id": 1,
    "fromUser": 6,
    "toUser": 1
  }
  */
  return async (dispatch: redux.Dispatch<IUserSerialized>) => {
    try {
      const response = await http.put(config.authDomain + "/contacts/requests/" + userId, {});

      logger.info({"obj": response}, "signup response data: ");
      if (!response) {
        throw Error("No response returned from server");
      }

      // dispatch({
      //   "type": UserActions.UserActionTypes.SIGN_UP,
      //   "authToken": response.authToken,
      //   "user": response.user
      // });
    } catch (err) {
      logger.error("Error getting data: ", err);
    }
  };
};