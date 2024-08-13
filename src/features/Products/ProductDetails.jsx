import Header from "../../components/Header";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Cart/cartSlice";
import { emptySearchQuery } from "./productsSlice.js";
import { addToWishlist, removeFromWishlist } from "../User/userSlice.js";

import "./ProductDetails.css";
import { IoMdStar } from "react-icons/io";

export default function ProductDetails() {
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const {
    data,
    loading,
    error,
  } = useFetch(
    `https://8037780b-a0f1-4609-a1ce-7b6b2f72eab3-00-34jpps012tkgs.sisko.replit.dev/products/${productId}`,
  );

  const product = data && data.data;

  useEffect(() => {
    dispatch(emptySearchQuery());
  }, [productId]);

  const handleAddToCart = (productId, product) => {
    dispatch(addToCart({ productId, product }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleAddToWishlist = (productId) => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(addToWishlist({ username: user.username, productId }));
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist({ username: user.username, productId }));
  };

  const productIndexInCart = cart.findIndex((item) => item._id === productId);

  let cartItem = null;
  if (productIndexInCart !== -1) {
    cartItem = cart[productIndexInCart];
  }

  const actualPrice =
    product &&
    (
      product.productPrice -
      (product.productPrice * product.discountRate) / 100
    ).toFixed(2);

  const productExistsInWishlist =
    user && user.wishlist && user.wishlist.some((item) => item === productId);
  
  return (
    <>
      <Header />
      <main className="product-details-main">
        {product && (
          <h4>
            Home / Products /{" "}
            <span className="product-name">{product.productName}</span>
          </h4>
        )}
        {product && (
          <div className="product-details-container">
            <div className="">
              <img
                className="product-details-img"
                src={product.productImageUrl}
                alt={`${product.productName}-img`}
              />
            </div>
            <div className="product-details-info">
              <div className="user-actions-btn">
                {!user && (
                  <button
                    onClick={() => handleAddToWishlist(product._id)}
                    className="user-actions-login-btn"
                  >
                    <NavLink to="/login">Login</NavLink>
                  </button>
                )}
                {user && !productExistsInWishlist && (
                  <button
                    onClick={() => handleAddToWishlist(product._id)}
                    className="user-actions-wishlist-btn"
                  >
                    Add to wishlist
                  </button>
                )}
                {user && productExistsInWishlist && (
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="user-actions-wishlist-remove-btn"
                  >
                    Remove from wishlist
                  </button>
                )}
              </div>
              <div className="product-details-name">
                <h3>{product.productName}</h3>
                <div>
                  <strong>Category: </strong>
                  {product.productCategory}
                </div>
              </div>
              <div>
                <strong>Description: </strong>
                <br></br>
                {product.productDescription}
              </div>
              <div className="product-details-rating">
                <span>{product.productRating}</span>
                <IoMdStar size={15} />
              </div>
              <div className="product-details-pricing">
                <span className="product-details-pricing-price">
                  ${product.productPrice}
                </span>
                <span className="product-details-pricing-actual-price">
                  ${actualPrice}
                </span>
              </div>
              <div>
                <strong>Discount: </strong>
                {product.discountRate}%
              </div>
              <div className="product-details-offers">
                <h3>Best Offers</h3>
                <p>This product is already at it's best price</p>
                <p>7.5% Discount on Myntra Kotak Credit Card.</p>
              </div>
              <div>
                <p>Get it by Wednesday 31st, Aug</p>
              </div>
              {!cartItem && (
                <button
                  className="product-details-add-to-cart-btn"
                  onClick={() => handleAddToCart(productId, product)}
                >
                  Add To Cart
                </button>
              )}
              {cartItem && (
                <div className="product-details-btns">
                  <button
                    className="product-details-add-to-cart-btn"
                    onClick={() => handleRemoveFromCart(productId)}
                  >
                    Remove
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    className="product-details-add-to-cart-btn"
                    onClick={() => {
                      handleAddToCart(productId, product);
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
