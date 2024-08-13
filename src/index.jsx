import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import Products from "./features/Products/Products";
import ProductDetails from "./features/Products/ProductDetails";
import Cart from "./features/Cart/Cart";
import Login from "./features/User/Login";
import Signup from "./features/User/Signup";
import Wishlist from "./features/User/Wishlist";
import User from "./features/User/User";
import EditAddress from "./features/User/EditAddress";
import OrderHistory from "./features/User/OrderHistory";

import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/products",
		element: <Products />,
	},
	{
		path: "/products/:productId",
		element: <ProductDetails />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/wishlist",
		element: <Wishlist />,
	},
	{
		path: "/user",
		element: <User />,
	},
	{
		path: "/editAddress/:addressId",
		element: <EditAddress />,
	},
	{
		path: "/order",
		element: <OrderHistory />
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
