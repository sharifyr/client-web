import * as path from "path";
import * as redux from "redux";

import * as http from "../utils/http";
import { config } from "../config";
import * as AuthActions from "../actions/auth";
import * as Store from "../reducers/reducer";
import Logger from "../utils/logger";
import { IState as ISignupState } from "../components/signup";

const logger = Logger(path.normalize(path.basename(__filename)));
console.log('server.ts creating logger: ', __filename);

export const signup = (state: ISignupState) => {
  return async (dispatch: redux.Dispatch<IUser>) => {
    try {
      let response = await http.post(config.serverURI + "/auth/signup", state);

      logger.info({obj: response}, "dispatching data: ");
      if(!response){
        throw Error("No response returned from server");
      }

      dispatch({
        type: AuthActions.AuthActionTypes.SIGN_UP,
        access_token: response.access_token
      });
    } catch (err) {
      logger.error("Error getting data: ", err);
    }
  }
}