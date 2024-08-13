import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";

import { addToCart, removeFromCart } from "../Cart/cartSlice";
import { removeFromWishlist } from "./userSlice";
import "./WishlistItem.css";

const WishlistItem = ({ productId }) => {
  const dispatch = useDispatch();

  const { data } = useFetch(
    `https://8037780b-a0f1-4609-a1ce-7b6b2f72eab3-00-34jpps012tkgs.sisko.replit.dev/products/${productId}`,
  );

  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const product = data && data.data;

  const actualPrice =
    product &&
    (
      product.productPrice -
      (product.productPrice * product.discountRate) / 100
    ).toFixed(2);

  const item = cart.find((cartItem) => cartItem._id === productId);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const addToCartHandler = (productId, product) => {
    dispatch(addToCart({ productId, product }));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist({ username: user.username, productId }));
  };

  return (
    <>
      {product && user && (
        <>
          <div className="cart-item">
            <div className="wishlist-item-info">
              <img className="wishlist-item-img" src={product.productImageUrl} />
              <div className='wishlist-item-general-info'>
                <div>{product.productName}</div>
                <div><strong>Category: </strong>{product.productCategory}</div>
                <div className="wishlist-item-discount-rate">{product.discountRate}% off</div>
              </div>
            </div>
            <div className="cart-item-price-info">
              <span>${actualPrice}</span>
              <span className="cart-item-product-price">
                ${product.productPrice}
              </span>
              <div className="cart-item-savings">
                <span className="cart-item-save-badge">You Save</span>
                <span>${(product.productPrice - actualPrice).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="cart-actions-btns-container">
            <div className="cart-actions-btns">
              <button onClick={() => handleRemoveFromWishlist(product._id)}>
                Remove from wishlist
              </button>
            </div>
            {!item && (
              <div className="">
                <button
                  className="wishlist-add-to-cart-btn"
                  onClick={() => addToCartHandler(product._id, product)}
                >
                  Add to Cart
                </button>
              </div>
            )}
            {item && (
              <div className="cart-actions-items-btns">
                <button onClick={() => removeFromCartHandler(item._id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCartHandler(item._id, product)}>
                  +
                </button>
              </div>
            )}
          </div>
          <hr></hr>
        </>
      )}
    </>
  );
};

export default WishlistItem;
