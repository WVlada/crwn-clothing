import React from "react";
import "./cart-icon.styles.scss";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon"></ShoppingIcon>
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStatetoProps = state => ({
  itemCount: selectCartItemsCount(state)
  //itemCount: cartItems.reduce(
  //  (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
  //  0
  //)
});

export default connect(mapStatetoProps, mapDispatchToProps)(CartIcon);
