import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../stores/slices/products.slice";
import { userLoginActions } from "../../stores/slices/userLogin.slice";
import Cart_item from "./Cart_Item/Cart_item";
import { Link, useNavigate } from "react-router-dom";
import { convertToUSD } from "@mieuteacher/meomeojs";
import Cart_ItemLocal from "./Cart_Item/Cart_ItemLocal";
function Carts() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [cartDataLoaded, setCartDataLoaded] = useState(false);
    const [cartsLocal, setCartsLocal] = useState(() =>
        JSON.parse(localStorage.getItem("carts"))
    );

    const cartsLocalStore = useSelector((store) => store.cartsLocalStore);

    console.log(cartsLocalStore);

    const navigator = useNavigate();
    const dispatch = useDispatch();
    const userLoginStore = useSelector((store) => store.userLoginStore);
    const [cartData, setCartData] = useState(
        userLoginStore.userInfor?.carts || []
    );
    useEffect(() => {
        dispatch(
            userLoginActions.checkTokenLocal(localStorage.getItem("token"))
        );
    }, []);
    useEffect(() => {
        if (userLoginStore.userInfor != null) {
            let carts = [...userLoginStore.userInfor.carts];
            setCartData(carts);
            setCartDataLoaded(true);
        }
    }, [userLoginStore.userInfor]);
    const foodSubTotal = cartData.reduce((total, food) => {
        return total + food.price * food.quantity;
    }, 0);

    const [subTotal, setSubTotal] = useState(foodSubTotal);

    return (
        <>
            <div className="cart__container">
                {/* {cartData.map((item) => {
                    return (
                        <Cart_item
                            item={item}
                            setCartData={setCartData}
                            cartData={cartData}
                            setSubTotal={setSubTotal}
                        ></Cart_item>
                    );
                })} */}

                {cartsLocal
                    ? cartsLocalStore?.map((item) => (
                          <Cart_ItemLocal item={item} />
                      ))
                    : cartData?.map((item) => (
                          <Cart_item
                              item={item}
                              setCartData={setCartData}
                              cartData={cartData}
                              setSubTotal={setSubTotal}
                          />
                      ))}

                <div className="cart__total">
                    <div className="check__out__total">
                        <span>total : </span>
                        {convertToUSD(subTotal)}
                        <span></span>
                    </div>
                    <Link
                        to="/checkOut"
                        className="check__out__btn"
                        onClick={handleClose}
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Carts;
