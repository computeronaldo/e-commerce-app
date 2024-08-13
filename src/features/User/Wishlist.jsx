import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import WishlistItem from "./WishlistItem";
import Header from "../../components/Header";
import "./Wishlist.css";

const Wishlist = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <main className="wishlist-main">
        <section className="wishlist-container">
          <h2>Wishlist</h2>
          {user && user.wishlist && user.wishlist.length === 0 && (
            <div>
              Their are no items in your wishlist.{" "}
              <NavLink to="/products">
                Explore our products to add to your favorites.
              </NavLink>
            </div>
          )}
          {user &&
            user.wishlist &&
            user.wishlist.map((wishlistItemId) => {
              return <WishlistItem productId={wishlistItemId} />;
            })}
          {!user && (
            <div className="wishlist-error">
              <p>
                Please login first. <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Wishlist;
