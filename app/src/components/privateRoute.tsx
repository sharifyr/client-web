import * as React from "react";
import { Route, Redirect, RouteProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Logger } from "../utils/logger";
import { IAppState } from "../stores/store";

const logger = new Logger();

interface IOwnProps {
  component: React.ComponentClass<Pick<IStateProps, never>> | (() => JSX.Element);
  path: string;
  exact?: boolean;
}

interface IStateProps extends IOwnProps {
  loggedIn: boolean;
  children?: any;
}

const mapStateToProps = (state: IAppState, ownProps: IOwnProps): IStateProps => {
  return {
    ...ownProps,
    ... {
      "loggedIn": state.userData.auth !== ""
    }
  };
};

const PrivateRouteComponent = (props: IStateProps) => {
  logger.info("PRIVATE RENDER");
  return (
    props.loggedIn ? (
      <Route {...props.exact} component={props.component} />
    ) : (
      <Redirect to={{
        "pathname": "/",
        "state": { "from": props.path }
      }} />
    )
  );
};

export default connect(mapStateToProps)(PrivateRouteComponent);
