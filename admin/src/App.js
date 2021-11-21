import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import EmployeeList from "./pages/employeeList/EmployeeList";
import NewEmployee from "./pages/newEmployee/NewEmployee";
import Employee from "./pages/employee/Employee";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
import CurrentUser from "./pages/currentUser/CurrentUser";
function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currentUser" element={<CurrentUser />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employee/:employeeId" element={<Employee />} />
          <Route path="/newEmployee" element={<NewEmployee />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:orderId" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
