import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.componenet";
import { connect } from "react-redux";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { withRouter } from "react-router-dom";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      Got to checkout
    </CustomButton>
  </div>
);

//const mapStateToProps = state => ({
//  cartItems: selectCartItems(state)
//});
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// connect automatski passuje dispath kao property, ako ne stavimo drugi argument
export default withRouter(connect(mapStateToProps)(CartDropdown));
