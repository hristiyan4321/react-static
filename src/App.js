import { Component } from "react";
import { connect } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import './App.css';
import Login from "./components/Authentication/RegisterLogin/Login/Login";
import Register from "./components/Authentication/RegisterLogin/Register/Register";
import getCookie from "./components/Cookies/GetCookie";
import Header from "./components/Header/Header";
import Layout from "./components/Layout";
import CartPage from "./pages/CartPageHolder/CartPage";
import Home from "./pages/HomePageHolder/Home";
import ProductList from "./pages/ProductsPage/ProductList";
import UserProfile from "./pages/UserProfile/UserProfile";
import DeliveryAddress from "./pages/DetailPurchase/DeliveryAddress";
import { UserOrders } from "./pages/UserProfile/UserOrders/UserOrders";
import UserProductsComponent from "./pages/UserProfile/UserOrders/UserProducts/UserProductsComponent";
import AdminViewComponent from "./pages/AdminPageHolder/AdminView/AdminViewComponent";
import ParentCategoryAdminPage from "./pages/AdminPageHolder/Category/ParentCategoryAdminPage";
import CategoryAdminPage from "./pages/AdminPageHolder/Category/CategoryAdminPage";
import NotFound from "./pages/NotFoundPage/NotFount";
import ProductsAdminPage from "./pages/AdminPageHolder/Products/ProductsAdminPage";
import OrderAdminPage from "./pages/AdminPageHolder/Order/OrderAdminPage";

const administrator = "Administrator";
const employee = "Employee";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			checked: false,
		}
	}

	render() {

		const { user } = this.props;
		const roles = getCookie('roles');
		
		return (
			<div className="App">
				<Layout>
					<Router>
						
						<Header />
						{roles.includes(administrator) || roles.includes(employee) ?
							<AdminViewComponent />
						:
						null}

						<Switch>

							<Route exact path="/">
								<Home />
							</Route>

							<Route exact path="/profile">
								{user ? 
								<UserProfile />
								:
								<Login />
								}
							</Route>
							
							{/* TODO: */}
							<Route exact path="/orderProducts">
								{user ? 
								<UserProductsComponent />
								:
								<Login />
								}
							</Route>

							<Route exact path="/orders">
								{user ? 
								<UserOrders />
								:
								<Login />
								}
							</Route>

							<Route exact path="/deliverydetails">
								{user ? 
								<DeliveryAddress />
								:
								<Login />
								}
							</Route>

							<Route exact path="/cart">
								<CartPage />
							</Route>

							<Route exact path="/product">
								<ProductList />
							</Route>

							<Route exact path="/admin/orders">
								{roles.includes(administrator) || roles.includes(employee) ? 
								<OrderAdminPage />
								:
								<Login />
								}
							</Route>

							<Route exact path="/admin/products">
								{roles.includes(administrator) || roles.includes(employee) ? 
								<ProductsAdminPage />
								:
								<Login />
								}
							</Route>

							<Route exact path="/admin/parentCategories">
								{roles.includes(administrator) || roles.includes(employee) ? 
								<ParentCategoryAdminPage />
								:
								<Login />
								}
							</Route>

							<Route exact path="/admin/categories">
								{roles.includes(administrator) || roles.includes(employee) ? 
								<CategoryAdminPage />
								:
								<Login />
								}
							</Route>
							
							<Route exact path="/register">
								<Register />
							</Route>

							<Route exact path="/login">
								<Login />
							</Route>

							<Route path="*">
								<NotFound />
							</Route>

						</Switch>

						{/*TODO make footer component.*/}

					</Router>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(App);