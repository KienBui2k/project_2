import React, { useEffect, useState } from "react";
import "./Cart_item.scss";
import { userLoginActions } from "../../../stores/slices/userLogin.slice";
import { useDispatch, useSelector } from "react-redux";
import { convertToUSD } from "@mieuteacher/meomeojs";
import { cartsActions } from "../../../stores/slices/cart.slice";

export default function Cart_ItemLocal({
    item,
    setCartData,
    cartData,
    setSubTotal,
}) {
    const [itemData, setItemData] = useState(item);
    const dispatch = useDispatch();
    const userLoginStore = useSelector((store) => store.userLoginStore);
    const [priceItem, setPriceItem] = useState(0);
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        dispatch(
            userLoginActions.checkTokenLocal(localStorage.getItem("token"))
        );
    }, []);

    useEffect(() => {
        setItemData(item);
        setPriceItem(item.price * itemData.quantity);
    }, [item]);

    useEffect(() => {
        setCartData((prevCartData) => [...prevCartData]);
    }, [cartData]);

    useEffect(() => {
        setPriceItem(itemData.price * itemData.quantity);
    }, [itemData]);

    return (
        <div className="cart__item__container">
            <div className="cart__item__left">
                <div className="item__img">
                    <img src={itemData.url} alt="" />
                </div>
            </div>
            <div className="cart__item_right">
                <div className="item__right__detail">
                    <div className="item__infor">
                        <h5>{itemData.name}</h5>
                        <i
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Bạn có muốn xóa sản phẩm này không ?"
                                    )
                                ) {
                                    dispatch(
                                        cartsActions.deleteItemInCart(
                                            itemData.productId
                                        )
                                    );
                                }
                            }}
                            className="fa-solid fa-trash"
                        ></i>
                    </div>
                    <div className="item__quantity">
                        <div className="quantity__yourcart">
                            <div className="quantity__yourCart">
                                <i
                                    onClick={() => {
                                        setQuantity(quantity - 1);
                                        dispatch(
                                            cartsActions.updateItemInCart({
                                                ...item,
                                                quantity: quantity - 1,
                                            })
                                        );
                                    }}
                                    className="fa-solid fa-minus"
                                ></i>
                                <span>{quantity}</span>
                                <i
                                    onClick={() => {
                                        setQuantity(quantity + 1);
                                        dispatch(
                                            cartsActions.updateItemInCart({
                                                ...item,
                                                quantity: quantity + 1,
                                            })
                                        );
                                    }}
                                    className="fa-solid fa-plus"
                                ></i>
                            </div>
                        </div>
                        <div className="price__yourcart">
                            <span>{convertToUSD(itemData.price)}</span>
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
