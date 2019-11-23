import React from "react";
import "./cart-icon.styles.scss";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import {
  selectCartItemsCount,
  selectCartItems
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon"></ShoppingIcon>
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});
//const mapStateToProps = state => ({
//  itemCount: selectCartItemsCount(state)
//  //itemCount: cartItems.reduce(
//  //  (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
//  //  0
//  //)
//});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
