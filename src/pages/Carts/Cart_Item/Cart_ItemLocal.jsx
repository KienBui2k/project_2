import React, { useEffect, useState } from "react";
import "./Cart_item.scss";
import { userLoginActions } from "../../../stores/slices/userLogin.slice";
import { useDispatch, useSelector } from "react-redux";
import { convertToUSD } from "@mieuteacher/meomeojs";
import { cartsActions } from "../../../stores/slices/cart.slice";
// const quantityRef = useRef();
export default function Cart_ItemLocal({
    item,
    setCartData,
    cartData,
    setSubTotal,
}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch();
    const userLoginStore = useSelector((store) => store.userLoginStore);
    const [priceItem, setPriceItem] = useState(item.price);
    useEffect(() => {
        dispatch(
            userLoginActions.checkTokenLocal(localStorage.getItem("token"))
        );
    }, []);
    useEffect(() => {
        setPriceItem(item.price * quantity);
    }, [quantity, item.price]);

    function handleDeleteProduct(productId) {
        let carts = userLoginStore.userInfor.carts;

        let updatedCart = carts.filter(
            (product) => product.productId !== productId
        );

        setCartData(updatedCart);

        dispatch(
            userLoginActions.updateCart({
                userId: userLoginStore.userInfor.id,
                carts: {
                    carts: updatedCart,
                },
            })
        );
    }
    function handleDecreaseQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setPriceItem(Number((quantity - 1) * item.price));
        }
    }

    function handleIncreaseQuantity() {
        setQuantity(quantity + 1);
        setPriceItem(Number((quantity + 1) * item.price));
    }

    return (
        <div className="cart__item__container">
            <div className="cart__item__left">
                <div className="item__img">
                    <img src={item.url} alt="" />
                </div>
            </div>
            <div className="cart__item_right">
                <div className="item__right__detail">
                    <div className="item__infor">
                        <h5>{item.name}</h5>
                        <i
                            onClick={() =>
                                dispatch(
                                    cartsActions.deleteItemInCart(
                                        item.productId
                                    )
                                )
                            }
                            class="fa-solid fa-trash"
                        ></i>
                    </div>
                    <div className="item__quantity">
                        <div className="quantity__yourcart">
                            <div className="quantity__yourCart">
                                <i
                                    onClick={() =>
                                        quantity > 1 ? (
                                            (handleDecreaseQuantity(),
                                            dispatch(
                                                cartsActions.updateItemInCart({
                                                    ...item,
                                                    quantity: quantity - 1,
                                                })
                                            ))
                                        ) : (
                                            <></>
                                        )
                                    }
                                    class="fa-solid fa-minus"
                                ></i>
                                <span>{quantity}</span>
                                <i
                                    onClick={() => {
                                        handleIncreaseQuantity();
                                        dispatch(
                                            cartsActions.updateItemInCart({
                                                ...item,
                                                quantity: quantity + 1,
                                            })
                                        );
                                    }}
                                    class="fa-solid fa-plus"
                                ></i>
                            </div>
                        </div>
                        <div className="price__yourcart">
                            <span>{convertToUSD(item.price)}</span>
                        </div>
                    </div>
                    <div className="item__total">
                        <h4>total : {convertToUSD(priceItem)}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
