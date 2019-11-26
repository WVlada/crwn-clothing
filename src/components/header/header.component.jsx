import React from "react";
import "./header.component.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo-container" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">Shop</OptionLink>
      <OptionLink to="/shop">Contact</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          Sign Out
        </OptionLink>
      ) : (
        <OptionLink className="option" to="/signin">
          Sign in
        </OptionLink>
      )}
      <CartIcon></CartIcon>
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);
// ovako bi bilo bez structured
//const mapStateToProps = state => ({
//currentUser: selectCurrentUser(state),
//hidden: selectCartHidden(hidden)
//});
const mapStateToProps = state =>
  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
  });

export default connect(mapStateToProps)(Header);
