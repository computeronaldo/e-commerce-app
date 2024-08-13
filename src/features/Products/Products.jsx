import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdStar } from "react-icons/io";
import { fetchCategories, fetchProducts } from "./productsSlice";
import { addToCart, removeFromCart } from "../Cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import "./Products.css";

export default function Products() {
  const location = useLocation();
  const dispatch = useDispatch();

  const category = location.state?.category || "Men";

  const [selectedCatgories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState("3");
  const [sortingOrder, setSortingOrder] = useState("lowToHigh");

  const { categories, categoriesLoading, products, productsLoading } =
    useSelector((state) => state.products);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, []);

  // once productsInfo is fetched successfully
  // updated selected categories information
  useEffect(() => {
    if (products && productsLoading === "idle") {
      setSelectedCategories([category]);
    }
  }, [products, productsLoading, category]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelectedCategories) => {
      if (!checked && prevSelectedCategories.includes(value)) {
        // remove this category
        return prevSelectedCategories.filter((category) => category !== value);
      } else if (checked && !prevSelectedCategories.includes(value)) {
        // add this category
        return [...prevSelectedCategories, value];
      } else {
        return [...prevSelectedCategories];
      }
    });
  };

  const handleRatingChange = (event) => {
    const { value } = event.target;
    setRating(value);
  };

  const handleOrderChange = (event) => {
    const { value } = event.target;
    setSortingOrder(value);
  };

  const handleClearFilters = () => {
    setSelectedCategories(["Men"]);
    setRating("3");
    setSortingOrder("lowToHigh");
  };

  const handleAddToCart = (productId, product) => {
    dispatch(addToCart({ productId, product }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const productsToDisplay =
    products.length > 0
      ? products
          .filter((product) =>
            selectedCatgories.includes(product.productCategory),
          )
          .filter((product) => {
            return product.productRating >= parseInt(rating);
          })
          .sort((a, b) => {
            if (sortingOrder === "lowToHigh") {
              return a.productPrice - b.productPrice;
            } else if (sortingOrder === "highToLow") {
              return b.productPrice - a.productPrice;
            } else {
              return 0;
            }
          })
      : [];

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="filters-section">
            <div className="filters-head">
              <h4>Filters</h4>
              <button className="" onClick={() => handleClearFilters()}>
                Clear all
              </button>
            </div>
            <div className="categories-filter">
              <h4>Categories</h4>
              <ul className="categories-filter-list">
                {categoriesLoading === "idle" &&
                  categories &&
                  categories.map((category) => {
                    return (
                      <li
                        className="categories-filter-list-item"
                        key={category._id}
                      >
                        <input
                          className="categories-filter-list-item-input"
                          type="checkbox"
                          value={category.categoryName}
                          checked={selectedCatgories.includes(
                            category.categoryName,
                          )}
                          onClick={handleCategoryChange}
                        />
                        <label className="categories-filter-list-item-label">
                          {category.categoryName}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="ratings-filter">
              <h4>Rating</h4>
              <div className="ratings-filter-item">
                <input
                  className="ratings-filter-item-input"
                  id="fourOrAboveRating"
                  type="radio"
                  name="rating"
                  value="4"
                  checked={rating === "4"}
                  onChange={handleRatingChange}
                />
                <label
                  className="ratings-filter-item-label"
                  htmlFor="fourOrAboveRating"
                >
                  4 stars or above
                </label>
              </div>
              <div className="ratings-filter-item">
                <input
                  className="ratings-filter-item-input"
                  id="threeOrAboveRating"
                  type="radio"
                  name="rating"
                  value="3"
                  checked={rating === "3"}
                  onChange={handleRatingChange}
                />
                <label
                  className="ratings-filter-item-label"
                  htmlFor="threeOrAboveRating"
                >
                  3 stars or above
                </label>
              </div>
              <div className="ratings-filter-item">
                <input
                  className="ratings-filter-item-input"
                  id="twoOrAboveRating"
                  type="radio"
                  name="rating"
                  value="2"
                  checked={rating === "2"}
                  onChange={handleRatingChange}
                />
                <label
                  className="ratings-filter-item-label"
                  htmlFor="twoOrAboveRating"
                >
                  2 stars or above
                </label>
              </div>
              <div className="ratings-filter-item">
                <input
                  className="ratings-filter-item-input"
                  id="oneOrAboveRating"
                  type="radio"
                  name="rating"
                  value="1"
                  checked={rating === "1"}
                  onChange={handleRatingChange}
                />
                <label
                  className="ratings-filter-item-label"
                  htmlFor="oneOrAboveRating"
                >
                  1 stars or above
                </label>
              </div>
            </div>
            <div className="sorting-filter">
              <h4>Sort By</h4>
              <div className="sorting-filter-item">
                <input
                  className="sorting-filter-item-input"
                  type="radio"
                  name="order"
                  value="lowToHigh"
                  id="lowToHighOrder"
                  checked={sortingOrder === "lowToHigh"}
                  onChange={handleOrderChange}
                />
                <label
                  className="sorting-filter-item-label"
                  htmlFor="lowToHighOrder"
                >
                  Low to High
                </label>
              </div>
              <div className="sorting-filter-item">
                <input
                  className="sorting-filter-item-input"
                  type="radio"
                  name="order"
                  value="highToLow"
                  id="highToLowOrder"
                  checked={sortingOrder === "highToLow"}
                  onChange={handleOrderChange}
                />
                <label
                  className="sorting-filter-item-label"
                  htmlFor="highToLowOrder"
                >
                  High to Low
                </label>
              </div>
            </div>
          </div>
          <div className="products">
            <div className="products-section">
              <h3>
                Showing All Products (Show {productsToDisplay.length} products)
              </h3>
              <div>
                <div className="products-grid">
                  {productsToDisplay.length === 0 ? (
                    <h3 className="products-grid-empty">
                      No products to display
                    </h3>
                  ) : (
                    productsToDisplay.map((product) => {
                      const productExistInWishlist =
                        user &&
                        user.wishlist &&
                        user.wishlist.some(
                          (wishlistItemId) => wishlistItemId === product._id,
                        );
                      const acutalPrice = (
                        product.productPrice -
                        (product.productPrice * product.discountRate) / 100
                      ).toFixed(2);
                      const productExistInCart = cart.find(
                        (cartItem) => cartItem._id === product._id,
                      );
                      const itemCount = cart.find(
                        (cartItem) => cartItem._id === product._id,
                      )?.quantity;
                      return (
                        <div key={product._id} className="product-grid-item">
                          <div className="product-card">
                            <div className="product-card-img-section">
                              <img
                                className="product-card-img"
                                src={product.productImageUrl}
                                alt={`${product.productName}-img`}
                              />
                              <span>
                                {product.productRating} <IoMdStar />
                              </span>
                              {user && productExistInWishlist && (
                                <FaHeart
                                  style={{
                                    color: "red",
                                    fontSize: "1rem",
                                    position: "absolute",
                                    right: "14.5rem",
                                    top: "0.5rem"
                                  }}
                                />
                              )}
                            </div>
                            <div className="product-card-body">
                              <h5>
                                <NavLink
                                  to={`/products/${product._id}`}
                                  state={{ product: product }}
                                  className="product-card-body-title"
                                >
                                  {product.productName}
                                </NavLink>
                              </h5>
                              <div className="product-price">
                                <div className="">
                                  <div className="product-actual-price">
                                    ${product.productPrice}
                                  </div>
                                  <div className="product-discounted-price">
                                    ${acutalPrice}
                                  </div>
                                </div>
                                <p className="product-discount-rate">
                                  {product.discountRate}%off
                                </p>
                              </div>
                              {productExistInCart ? (
                                <div className="product-card-btns">
                                  <button
                                    className="product-card-btn"
                                    onClick={() =>
                                      handleRemoveFromCart(product._id)
                                    }
                                  >
                                    Remove
                                  </button>
                                  <span>{itemCount}</span>
                                  <button
                                    className="product-card-btn"
                                    onClick={() =>
                                      handleAddToCart(product._id, product)
                                    }
                                  >
                                    Add
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="product-card-btn"
                                  onClick={() =>
                                    handleAddToCart(product._id, product)
                                  }
                                >
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
