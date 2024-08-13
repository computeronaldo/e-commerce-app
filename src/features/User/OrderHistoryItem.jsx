import "./OrderHistoryItem.css";

const OrderHistoryItem = ({ orderInfo }) => {
  const orderId = orderInfo._id;

  const orderedItems = orderInfo.products;
  const deliveryAddress = orderInfo.address;

  const totalCost = orderInfo.cost;
  
  const date = new Date(orderInfo.createdAt);
  const yyyyMMdd = date.toISOString().split("T")[0];
  const hhmmss = date.toISOString().split("T")[1].split(".")[0];

  return (
    <div className="order-history-item-main">
      <h4>Order Id: {orderId}</h4>
      <div className="order-history-item-container">
        <div>
          <ol>
            {orderedItems.map((orderedItem) => {
              return (
                <li>
                  <p>
                    {orderedItem.product.productName} X {orderedItem.quantity}
                  </p>
                </li>
              );
            })}
          </ol>
          <p className="order-history-item-total-price"><strong>Total Price:</strong> ${totalCost}</p>
        </div>
        <div>
          <p>
            <strong>Placed On:</strong>
             {yyyyMMdd} <strong>at</strong> {hhmmss}
          </p>
          <div>
            <h4><strong>Delivered At:</strong></h4>
            <p>
              {deliveryAddress.buildingNumber} {deliveryAddress.streetName}{" "}
              {deliveryAddress.location} {deliveryAddress.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
