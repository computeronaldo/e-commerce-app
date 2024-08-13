import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Cart.css";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  emptyCart,
} from "./cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  placeOrder,
} from "../User/userSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { user, selectedAddress, orderStatus } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (orderStatus === "placed") {
      dispatch(emptyCart());
      navigate("/order", { state: "Order placed!!" });
    }
  }, [orderStatus]);

  const deleteFromCartHandler = (productId) => {
    dispatch(deleteFromCart({ productId }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const addToCartHandler = (productId, product) => {
    dispatch(addToCart({ productId, product }));
  };

  const cartItemsCount = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const cartTotalPrice = cart
    .reduce((acc, cur) => {
      return acc + cur.productPrice * cur.quantity;
    }, 0)
    .toFixed(2);

  const cartTotalDiscount = cart
    .reduce((acc, cur) => {
      const discountPrice =
        ((cur.productPrice * cur.discountRate) / 100) * cur.quantity;
      return acc + discountPrice;
    }, 0)
    .toFixed(2);

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist({ username: user.username, productId }));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist({ username: user.username, productId }));
  };

  const handlePlaceOrder = () => {
    if (!user) {
      navigate("/login", { state: "Please login first!" });
    } else if (user && !selectedAddress) {
      navigate("/user", { state: "Please select an address for delivery!!" });
    } else {
      // place order
      const orderAddress = user.addresses.find(
        (address) => address._id === selectedAddress,
      );

      const clonedOrderAddress = { ...orderAddress };
      delete clonedOrderAddress["_id"];

      const products = cart.map((cartItem) => {
        return {
          product: cartItem._id,
          quantity: cartItem.quantity,
        };
      });

      const orderInfo = {
        user: user._id,
        products: products,
        address: clonedOrderAddress,
        cost: (cartTotalPrice - cartTotalDiscount).toFixed(2)
      };

      dispatch(placeOrder({ orderInfo }));
    }
  };

  return (
    <>
      <Header />
      <main className="cart-main">
        <div className="cart-hero">
          {!orderStatus && cart.length === 0 && (
            <h3>
              Cart is empty. Please add items to your cart by clicking{" "}
              <NavLink to="/products">here.</NavLink>
            </h3>
          )}
          {cart.length > 0 && (
            <div className="cart-container">
              <h2>Cart ({cartItemsCount} items)</h2>
              {cart.map((item) => {
                const productExistsInWishlist =
                  user &&
                  user.wishlist &&
                  user.wishlist.some(
                    (wishlistItemId) => wishlistItemId === item._id,
                  );
                const product = {
                  ...item,
                };
                delete product["quantity"];

                const actualPrice = (
                  item.productPrice -
                  (item.productPrice * item.discountRate) / 100
                ).toFixed(2);
                return (
                  <>
                    <div className="cart-item">
                      <div className="cart-item-info">
                        <img
                          className="cart-item-img"
                          src={item.productImageUrl}
                        />
                        <span>{item.productName}</span>
                      </div>
                      <div className="cart-item-price-info">
                        <span>${(actualPrice * item.quantity).toFixed(2)}</span>
                        <span className="cart-item-product-price">
                          ${(item.productPrice * item.quantity).toFixed(2)}
                        </span>
                        <div className="cart-item-savings">
                          <span className="cart-item-save-badge">You Save</span>
                          <span>
                            $
                            {(
                              (item.productPrice - actualPrice) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="cart-actions-btns-container">
                      <div className="cart-actions-btns">
                        <button onClick={() => deleteFromCartHandler(item._id)}>
                          Remove from cart
                        </button>
                        {user && !productExistsInWishlist && (
                          <button
                            className="user-actions-btn-wishlist-add"
                            onClick={() => handleAddToWishlist(item._id)}
                          >
                            Add to wishlist
                          </button>
                        )}
                        {user && productExistsInWishlist && (
                          <button
                            onClick={() => handleRemoveFromWishlist(item._id)}
                          >
                            Remove from wishlist
                          </button>
                        )}
                      </div>
                      <div className="cart-actions-items-btns">
                        <button onClick={() => removeFromCartHandler(item._id)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCartHandler(item._id, product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <hr></hr>
                  </>
                );
              })}
              <div>Subtotal ({cartItemsCount}) items</div>
            </div>
          )}
          {cart.length > 0 && (
            <div className="cart-summary">
              {(!orderStatus || orderStatus === "rejected") && (
                <button
                  onClick={() => handlePlaceOrder()}
                  className="cart-checkout-btn"
                >
                  Place Order
                </button>
              )}
              {orderStatus === "placing" && (
                <p className="order-placing-info">Placing your order!!</p>
              )}
              {orderStatus === "rejected" && (
                <p className="order-reject-info">
                  Couldn't place your order!!!!! Please try again.
                </p>
              )}
              <div className="cart-summary-item">
                <span>Subtotal ({cartItemsCount}) items</span>
                <span className="cart-summary-item-price">
                  ${cartTotalPrice}
                </span>
              </div>
              <div className="cart-summary-item">
                <span>Savings</span>
                <span className="cart-summary-item-price">
                  ${cartTotalDiscount}
                </span>
              </div>
              <span className="cart-summary-item-price">
                ${(cartTotalPrice - cartTotalDiscount).toFixed(2)}
              </span>
              {user && !selectedAddress && (
                <div>
                  <div>Select delivery address</div>
                  <NavLink to="/user">Select</NavLink>
                </div>
              )}
              {!user && (
                <div>
                  <div>Select delivery address</div>
                  <NavLink to="/login">Select</NavLink>
                </div>
              )}
              <span>Taxes calculates at checkout</span>
              <div className="cart-summary-item">
                <span>Estimated Total</span>
                <span className="cart-summary-item-price">
                  ${(cartTotalPrice - cartTotalDiscount).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
