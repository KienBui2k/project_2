import "./App.scss";
import { Routes, Route } from "react-router-dom";
import LazyLoad from "./LazyLoad";
import Navbar from "@components/Navbars/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <div className="nav__container">
                <div className="navber__content">
                    <Navbar></Navbar>
                </div>
            </div>

            <div className="app_container">
                <Routes>
                    <Route
                        path=""
                        element={LazyLoad(() => import("@pages/Homes/Home"))()}
                    />
                    <Route
                        path="login"
                        element={LazyLoad(() =>
                            import("@pages/Logins/Login")
                        )()}
                    />
                    <Route
                        path="resgister"
                        element={LazyLoad(() =>
                            import("@pages/Resgisters/Resgister")
                        )()}
                    />
                    <Route
                        path="menu/:type"
                        element={LazyLoad(() => import("@pages/Menus/Menu"))()}
                    ></Route>
                    <Route
                        path="detail/:id"
                        element={LazyLoad(() =>
                            import("@pages/Menus/Menu_Items/Menu_Item")
                        )()}
                    ></Route>
                    <Route
                        path="about"
                        element={LazyLoad(() =>
                            import("@pages/Abouts/About")
                        )()}
                    ></Route>
                    <Route
                        path="contact"
                        element={LazyLoad(() =>
                            import("@pages/Contacts/Contact")
                        )()}
                    ></Route>
                    <Route
                        path="checkOut"
                        element={LazyLoad(() =>
                            import("@pages/CheckOuts/CheckOut")
                        )()}
                    />
                    <Route
                        path="cart"
                        element={LazyLoad(() => import("@pages/Carts/Cart"))()}
                    />
                </Routes>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default App;
