import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider 
} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store";
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './Routes/HomePage';
import Products from './Routes/Products';
import CartScreen from './Routes/CartScreen';
import LoginScreen from './Routes/LoginScreen';
import RegisterScreen from './Routes/RegisterScreen';
import ShippingScreen from './Routes/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreen from './Routes/PaymentScreen';
import PlaceOrderScreen from './Routes/PlaceOrderScreen';
import OrderScreen from './Routes/OrderScreen';
import ProfileScreen from './Routes/ProfileScreen';
import OrderListScreen from './Routes/admin/OrderListScreen';
import ProductListScreen from './Routes/admin/ProductListScreen';
import UserListScreen from './Routes/admin/UserListScreen';
import ProductEditScreen from './Routes/admin/ProductEditScreen';
import UserEditScreen from './Routes/admin/UserEditScreen';


/*const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/products' element={<HomePage/>}/>
      <Route path='/products/:id' element={<Products/>}/>
      
    </Route>
  )
  
)*/

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
      children: [
        {
          index: true,
          element: <HomePage/>,
        },
        {
          path: '/products',
          element: <HomePage/>,
        },
        {
          path: '/products/:id',
          element: <Products/>
        },
        {
          path: '/cart',
          element: <CartScreen/>
        },
        {
          path: '/login',
          element: <LoginScreen/>
        },
        {
          path: '/register',
          element: <RegisterScreen/>
        },
        {
          path: '',
          element: <PrivateRoute/>,
          children: [
            {
              path: '/shipping',
              element: <ShippingScreen/>
            },
            {
              path: '/payment',
              element: <PaymentScreen/>
            },
            {
              path: '/placeOrder',
              element: <PlaceOrderScreen/>
            },
            {
              path: '/order/:id',
              element: <OrderScreen/>
            },
            {
              path: '/profile',
              element: <ProfileScreen/>
            }
          ]
        },
        {
          path: '',
          element: <AdminRoute/>,
          children: [
            {
              path: 'admin/orderList',
              element: <OrderListScreen/>
            },
            {
              path: 'admin/productList',
              element: <ProductListScreen/>
            },
            {
              path: 'admin/userList',
              element: <UserListScreen/>
            },
            {
              path: 'admin/product/:id/edit',
              element: <ProductEditScreen/>
            },
            {
              path: 'admin/user/:id/edit',
              element: <UserEditScreen/>
            }
          ]
        }
      ],
    },
    
  ]
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
