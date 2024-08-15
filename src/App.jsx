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
            <img src="https://s3-alpha-sig.figma.com/img/fe14/415d/464018ba1d0295f41b6c56c9b15d0da6?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P48cUkTbK6qR5n6GDdXyeW1BZbgdx-mJz0bHK-mVvgpDQiVc2b9m7DwiV3ikljcsGi8nYRUdq5JgwpZ~G2hUUOV8~fZwA1X6I4ByFEWDlBXRHVd57UYPPAz-pWe0YO8mTh2h7-9m-nhJjlcNGoFDj9mmfSFyx6VxXmtvN-bBtDmB6SKQbJyq0E5NJ~-lbIyiHVwkuisEQ2CBfbQR3b7NLxyoWMzP1e3Srgh~bNnulXqL-xhk-N5oXiHh~4PQlYnyBHauDIDkL5XjO8QEHarneD6buSU4RuRxoUBgMPilc4MJBfgBr8roS7pgN04CtqF8BgU1o0TfJ91kfnWp4RHqVQ__" />
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
            <img src="https://s3-alpha-sig.figma.com/img/8b73/a365/d0e1b53845d493ea11a12d4db9ea2584?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Zjt8eQm6SodqTVLbsX3V5J8cJGjeUmoqahpoLPl~y9ec1m-xM2SbiiRWuVRAP-TKK-LM2vS5-jSMqtdj1CZ~Mb3mwMJEg4dcsTERuVYI9mbftdjCaQwxYJiONAgEh7Di9-ggnnrrPOEsg2HANUvEDYNVQlDpAytfgzL-dDCoDEEwaYKP-VgzDcSvrDbOs3rSqz3cL1goGrKVcPxxnY0TVUWbAErUSSL6WykiPxRfNdzrIWrKPekTRctZd0UvSb9mP0ahxFGM33HBkNWS5QsN2~T2fpn0Y1746D6RNXvqajdjUmBQR0Ug5s5A1ZrOvd3y4BXPKTVbj6oFn4JDLplbdw__" />
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
