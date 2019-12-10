import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";

import ShopPage from "./pages/shop/shop.component.jsx";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// header da bude outside Switcha

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUsersSession } from "./redux/user/user.actions";

import CheckOutPage from "./pages/checkout/checkout.component";
//import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubscrubeFromAuth = null;

  componentDidMount() {
    const { checkUsersSession } = this.props;
    checkUsersSession(); // so we fire it when our app initializes
  }

  componentWillUnmount() {
    this.unsubscrubeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//const mapSateToProps = ({ user }) => ({
//  currentUser: user.currentUser
//});
const mapSateToProps = createStructuredSelector({
  currentUser: selectCurrentUser //,
  //collectionsArray: selectCollectionsForPreview
});

//wich gets dispatch, and its a methos that dispatches our action
const mapDispatchToProps = dispatch => ({
  checkUsersSession: () => dispatch(checkUsersSession())
});

export default connect(mapSateToProps, mapDispatchToProps)(App);
