import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { userLoginActions } from "../../stores/slices/userLogin.slice";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../stores/slices/products.slice";
import { convertToUSD } from "@mieuteacher/meomeojs";
export default function Navbar() {
    const dispatch = useDispatch();
    const userLoginStore = useSelector((store) => store.userLoginStore);
    const navigator = useNavigate();
    const productStore = useSelector((store) => store.productStore);
    const [showResult, setShowResult] = useState(false);
    const result = productStore.searchName;

    const handleOnChange = (e) => {
        clearTimeout(timeOutTarget);
        setTimeOutTarget(
            setTimeout(() => {
                if (!userLoginStore.loading) {
                    if (e.target.value != "") {
                        setShowResult(true);
                        dispatch(
                            productActions.searchProductByName(e.target.value)
                        );
                    }
                    if (e.target.value == "") {
                        setShowResult(false);
                    }
                }
            }, 1000)
        );
    };
    const [timeOutTarget, setTimeOutTarget] = useState(null);
    const handleOnClick = (e, itemId) => {
        navigator("/detail/" + itemId);
        setShowResult(false);
    };
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const checkToken = localStorage.getItem("token");
        if (checkToken !== "") {
            setCartQuantity(userLoginStore.userInfor?.carts?.length || 0);
        } else {
            const carts = JSON.parse(localStorage.getItem("carts")) || [];
            setCartQuantity(carts.length);
        }
    }, [userLoginStore]);
    console.log(cartQuantity);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar__container">
                <div className="container-fluid">
                    <div className="navbar__logo">
                        <img
                            onClick={() => {
                                navigator("");
                            }}
                            className="navbar__logo__img"
                            src="../images/logo/logo.svg"
                        ></img>
                    </div>
                    <div className="navbar__toggler__container">
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav__item__main">
                                <li className="nav-item ">
                                    <Link
                                        className="nav-link active sub-nav-item"
                                        aria-current="page"
                                        to=""
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <span
                                        className="nav-link dropdown-toggle sub-nav-item"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Menu
                                    </span>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <Link
                                            to="menu/food"
                                            className="dropdown-item sub-nav-item_menu"
                                        >
                                            FOOD
                                        </Link>
                                        <Link
                                            to="menu/drink"
                                            className="dropdown-item sub-nav-item_menu"
                                        >
                                            DRINKS
                                        </Link>
                                    </ul>
                                </li>
                                <li className="nav-item ">
                                    <Link
                                        className="nav-link active sub-nav-item"
                                        aria-current="page"
                                        to="about"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link
                                        className="nav-link active sub-nav-item"
                                        aria-current="page"
                                        to="contact"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                            <form className="d-flex search__container">
                                <input
                                    className="form-control me-2 search__input"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <button
                                    className="btn btn-outline-success search__btn"
                                    type="submit"
                                >
                                    <span className="material-symbols-outlined search__icon">
                                        search
                                    </span>
                                </button>
                            </form>
                            <div className="user__nav">
                                {userLoginStore.userInfor ? (
                                    <>
                                        <div className="cart__icon">
                                            <span
                                                onClick={() =>
                                                    navigator("cart")
                                                }
                                                class="material-symbols-outlined item__cart"
                                            >
                                                shopping_cart
                                                <span className="cart__quantity">
                                                    {cartQuantity}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="user__avatar">
                                            <img
                                                src={
                                                    userLoginStore?.userInfor
                                                        .avatar
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="user__icon">
                                            <Link
                                                to="/login"
                                                onClick={() => {
                                                    alert(
                                                        "Ban co muon dang xuat khong"
                                                    );
                                                    localStorage.removeItem(
                                                        "token"
                                                    );
                                                    dispatch(
                                                        userLoginActions.logOut()
                                                    );
                                                    navigator("/login");
                                                }}
                                            >
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                            </Link>
                                        </div>
                                        <div className="hello__user">
                                            <h5>
                                                hello{" "}
                                                {
                                                    userLoginStore?.userInfor
                                                        .userName
                                                }
                                                !
                                            </h5>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="cart__icon">
                                            <span
                                                onClick={() =>
                                                    navigator("cart")
                                                }
                                                class="material-symbols-outlined"
                                            >
                                                shopping_cart
                                                <span className="cart__quantity">
                                                    {cartQuantity}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="user__icon">
                                            <Link
                                                to="/login"
                                                className="registerIcon"
                                            >
                                                <i className="fa-regular fa-user"></i>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {showResult ? (
                <div className="search__box">
                    <div className="search__container">
                        {result.map((item) => (
                            <div
                                onClick={(e) => handleOnClick(e, item.id)}
                                className="menu__item"
                            >
                                <div className="menu__item__img">
                                    <img src={item.url} alt="" />
                                </div>
                                <div className="menu__item__info">
                                    <p>{item.name}</p>
                                    <p>{convertToUSD(item.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
