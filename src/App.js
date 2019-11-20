import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";

import ShopPage from "./pages/shop/shop.component.jsx";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// header da bude outside Switcha
class App extends React.Component {
  unsubscrubiFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscrubiFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(
          snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          },
          () => {
            //console.log(this.state); // ovo znaci kada zavrsi setState
          }
        );
      } else {
        // else ako je null
        setCurrentUser(userAuth); //ovo je null
      }
    });
  }

  componentWillUnmount() {
    this.unsubscrubiFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
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

const mapSateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapSateToProps, mapDispatchToProps)(App);
