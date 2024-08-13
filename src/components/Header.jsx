import { NavLink, useNavigate } from "react-router-dom";

import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { debouncedFetchProducts } from "../features/Products/productsSlice";
import { useState } from "react";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (query) => {
    setSearchQuery(query);
    dispatch(debouncedFetchProducts(query));
  };

  const handleWishlistClick = () => {
    if (!user) {
      navigate("/login", {
        state: "Please login first to view your wishlist!",
      });
    } else {
      navigate("/wishlist");
    }
  };

  const handleUserIconClick = () => {
    if (!user) {
      navigate("/login", {
        state: "Please login first!",
      });
    } else {
      navigate("/user");
    }
  };
  const { searchedProducts, searchedProductsLoading, searchedProductsError } =
    useSelector((state) => state.products);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const itemsCount =
    cart !== undefined
      ? cart.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0)
      : 0;

  return (
    <header className="head">
      <nav className="nav">
        <NavLink to="/" className="nav-brand">
          <h2>MyShoppingSite</h2>
        </NavLink>
        <div className="search-bar-section">
          <form className="search-bar">
            <IoIosSearch size={25} />
            <input
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="search-bar-input"
              type="text"
              placeholder="Search"
            />
            {searchedProductsLoading === "idle" &&
              searchedProducts &&
              searchedProducts.length > 0 && (
                <div className="searched-products-div">
                  {searchedProducts.map((product) => {
                    return (
                      <>
                        <div className="searched-item">
                          <p>{product.productName}</p>
                          <NavLink
                            to={`/products/${product._id}`}
                            state={{ product: product }}
                          >
                            Go to product
                            <FaExternalLinkAlt />
                          </NavLink>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            {/* {(searchedProductsError ||
              (searchQuery !== "" &&
                searchedProductsLoading === "idle" &&
                searchedProducts.length === 0)) && (
              <div className="searched-products-div">No Products Found</div>
            )} */}
            {searchedProductsError && (
              <div className="searched-products-div">No Products Found</div>
            )}
          </form>
        </div>
        <div className="btn-grp">
          {!user && (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="login-btn"
            >
              <NavLink to="/login">Login</NavLink>
            </button>
          )}
          {user && (
            <button className="login-btn">
              <NavLink to="/logout">Logout</NavLink>
            </button>
          )}
          <div className="cart-count">
            <FaRegHeart
              className="wishlist-btn"
              onClick={handleWishlistClick}
              size={25}
            />
            {user && (
              <span className="cart-count-badge">
                {user && user.wishlist && user.wishlist.length}
              </span>
            )}
          </div>
          <div className="cart-count">
            <NavLink to="/cart" className="cart-redirect">
              <IoCartOutline size={25} />
              <span className="cart-count-badge">{itemsCount}</span>
              <span>Cart</span>
            </NavLink>
          </div>
          <div>
            <NavLink className="user-badge" onClick={handleUserIconClick}>
              <FaRegUser size={23} />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
