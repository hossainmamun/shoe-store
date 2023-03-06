import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import DashboardIndex from './Components/Dashboard/DashboardIndex.jsx';
import EditProduct from './Components/Dashboard/EditProduct.jsx';
import OrderList from './Components/Dashboard/OrderList.jsx';
import ProductList from './Components/Dashboard/ProductList.jsx';
import UploadProduct from './Components/Dashboard/UploadProduct.jsx';
import Home from './Components/LandingPage/Home.jsx';
import { authContext } from './context/authContext.jsx';
import Layout from './Layout/Layout.jsx';
import Cart from './Pages/Cart.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import Login from './Pages/Login.jsx';
import ProductProfile from './Pages/ProductProfile.jsx';
import Register from './Pages/Register.jsx';
import Shiping from './Pages/Shiping.jsx';
import UserOrderList from './Pages/UserOrderList.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import UserProfileSetting from './Pages/UserProfileSetting.jsx';

export const cartProductContext = createContext()

function App() {
   const { user } = useContext(authContext);
   const [cartProduct, setCartProduct] = useState([])
   return (
      <cartProductContext.Provider value={[cartProduct, setCartProduct]}>
         <Layout>
            <BrowserRouter>
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='home' element={<Home />} />
                  <Route path='user/register' element={<Register />} />
                  <Route path='user/login' element={<Login />} />
                  <Route
                     path='product/:productId'
                     element={<ProductProfile />}
                  />
                  <Route path='cart' element={<Cart />} />
                  <Route path='user-profile' element={<UserProfile />}>
                     <Route index element={<UserProfileSetting />} />
                     <Route path='setting' element={<UserProfileSetting />} />
                     <Route path='order-list' element={<UserOrderList />} />
                  </Route>
                  <Route path='shipping' element={<Shiping />} />

                  {/* dashboard route */}
                  <Route path='dashboard' element={<Dashboard />}>
                     <Route index element={<DashboardIndex />} />
                     <Route
                        path='dashboard-status'
                        element={<DashboardIndex />}
                     />
                     <Route path='product-list' element={<ProductList />} />
                     <Route path='upload-product' element={<UploadProduct />} />
                     <Route path='order-list' element={<OrderList />} />
                     <Route
                        path='edit-product/:productId'
                        element={<EditProduct />}
                     />
                  </Route>

                  <Route path='*' element={<ErrorPage />} />
               </Routes>
            </BrowserRouter>
         </Layout>
      </cartProductContext.Provider>
   );
}

export default App;
