import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import { Route,RouterProvider,createRoutesFromElements } from "react-router";
import {  createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js"
//Private route
import PrivateRoute from "./components/PrivateRoute.jsx"
//Auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx"

import Profile from "./pages/user/Profile.jsx";
import AdminRoutes from "./pages/admin/AdminRoutes.jsx";
import UserList from "./pages/admin/UserList.jsx";

import CategoryList from "./pages/admin/CategoryList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import AllProducts from "./pages/admin/AllProducts.jsx";
import AdminProductUpdate from "./pages/admin/ProductUpdate.jsx";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/products/Favorites.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import UserOrder from "./pages/user/UserOrder.jsx";

import Shipping from "./pages/orders/Shipping.jsx";
import PlaceOrder from "./pages/orders/PlaceOrder.jsx";
import Order from "./pages/orders/Order.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import AdminDashBoard from "./pages/admin/AdminDashBoard.jsx";

import{PayPalScriptProvider} from '@paypal/react-paypal-js'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route  index={true} path="/" element={<Home/>}/>
         <Route path="/favorite" element={<Favorites/>}/>
         <Route path="/product/:id" element={<ProductDetails/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/shop" element={<Shop/>}/>
         <Route path="/user-orders" element={<UserOrder/>}/>


        {/* Registered User */}
         <Route path="" element={<PrivateRoute/>}>
             <Route path="/profile" element={<Profile/>}/>
             <Route path="/shipping" element={<Shipping/>}/>
             <Route path="/placeorder" element={<PlaceOrder/>}/>
             <Route path="/order/:id" element={<Order/>}/>
         </Route>

         {/* Admin Routes */}
         <Route path="/admin" element={<AdminRoutes/>}>
              <Route path="userlist" element={<UserList/>}/>
              <Route path="categorylist" element={<CategoryList/>}/>
              <Route path="productlist" element={<ProductList/>}/>
              <Route path="allproductslist" element={<AllProducts/>}/>
              <Route path="productlist/:pageNumber" element={<ProductList/>}/>
              <Route path="product/update/:_id" element={<AdminProductUpdate/>}/>
              <Route path="orderlist" element={<OrderList/>}/>
              <Route path="dashboard" element={<AdminDashBoard/>}/>
        
         </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(

 <Provider store={store}>
    <PayPalScriptProvider>
        <RouterProvider router={router}/>
    </PayPalScriptProvider>
 </Provider>
);
