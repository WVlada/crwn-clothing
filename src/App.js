import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";

import ShopPage from "./pages/shop/shop.component.jsx";

import {
  auth,
  createUserProfileDocument //,
  //addCollectionAndCocuments
} from "./firebase/firebase.utils";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// header da bude outside Switcha

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";

import CheckOutPage from "./pages/checkout/checkout.component";
//import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubscrubeFromAuth = null;

  componentDidMount() {
    //const { setCurrentUser, collectionsArray} = this.props;
    const { setCurrentUser } = this.props;
    this.unsubscrubeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
      // ne ubacujemo ceo collectionsArray, jer nam ne trebaju: id, url... nego samo title i items
      //addCollectionAndCocuments(
      //  "collections",
      //  collectionsArray.map(({ title, items }) => ({ title, items }))
      // vraca novi objekat u kojem je: title = title, items = items
      //);
    });
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapSateToProps, mapDispatchToProps)(App);
