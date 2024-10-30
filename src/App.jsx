import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchCategories } from "./features/Products/productsSlice";
import Header from "./components/Header";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, categoriesLoading } = useSelector(
    (state) => state.products,
  );

  console.log(categories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleClick = (event) => {
    navigate("/products", {
      state: { category: event.target.textContent },
    });
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="categories-cards">
          {categoriesLoading === "loading" && (
            <h3 className="categories-cards-loading">Loading categories...</h3>
          )}
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <div key={category._id} className="category-card">
                  <img src={category.categoryImageUrl} />
                  <span
                    onClick={handleClick}
                    className="border-0 text-black bg-light w-100 text-center"
                  >
                    {category.categoryName}
                  </span>
                </div>
              );
            })}
        </div>
        <div className="banner">
          <img src="https://png.pngtree.com/thumb_back/fh260/background/20240701/pngtree-two-shopping-carts-on-a-laptop-image_15838517.jpg" />
        </div>
        <div className="promo-cards">
          <div className="promo-card">
            <img src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <div className="promo-details">
              <p>New Arrivals</p>
              <h2>Summer Collections</h2>
              <p>
                Checkout our best winter collection to stay warm in style in
                this season.
              </p>
              <button className="checkout-btn">Checkout Now</button>
            </div>
          </div>
          <div className="promo-card">
            <img src="https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            <div className="promo-details">
              <p>New Arrivals</p>
              <h2>Summer Collections</h2>
              <p>
                Checkout our best winter collection to stay warm in style in
                this season.
              </p>
              <button className="checkout-btn">Checkout Now</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
