import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { resetOrderStatus, userOrders } from "./userSlice";

import Header from "../../components/Header";
import OrderHistoryItem from "./OrderHistoryItem";
import "./OrderHistory.css";

const OrderHistory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, orders, error } = useSelector((state) => state.user);

  const message = location.state;

  console.log(orders, error);
  
  useEffect(() => {
    dispatch(resetOrderStatus());
    dispatch(userOrders({ userId: user._id }));
  }, []);
  
  return (
    <>
      <Header />
      <main className="order-history-main">
        {message && <h2>{message}</h2>}
        <section className="order-history-container">
          <h3>Order History</h3>
          {error && <p>{error.error}</p>}
          {orders &&
            orders.length > 0 &&
            orders.map((order) => {
              return <OrderHistoryItem orderInfo={order} />;
            })}
        </section>
      </main>
    </>
  );
};

export default OrderHistory;
