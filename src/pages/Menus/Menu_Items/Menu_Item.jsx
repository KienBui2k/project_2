import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Menu_Item.scss";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../stores/slices/products.slice";
import { userLoginActions } from "../../../stores/slices/userLogin.slice";
import toast, { Toaster } from "react-hot-toast";
import { cartsActions } from "../../../stores/slices/cart.slice";
import { convertToUSD } from "@mieuteacher/meomeojs";
export default function Menu_Item() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const quantityRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toastSuccess = (text) => {
        toast.success(text, {
            position: "top-center",
        });
    };
    const toastError = (text) => {
        toast.error(text, {
            position: "top-center",
        });
    };
    const productStore = useSelector(
        (store) => store.productStore.listProducts
    );
    const userLoginStore = useSelector((store) => store.userLoginStore);
    useEffect(() => {
        dispatch(productActions.findAllProducts());
        dispatch(
            userLoginActions.checkTokenLocal(localStorage.getItem("token"))
        );
    }, []);

    console.log(userLoginStore);

    const product = productStore.find((product) => {
        return product.id == id;
    });

    function addToCart(buyItem) {
        console.log("da vao add", buyItem);
        if (localStorage.getItem("token")) {
            let carts = [];
            let flag = false;
            carts = userLoginStore.userInfor.carts?.slice().map((item) => {
                if (item.productId == buyItem.productId) {
                    let temp = { ...item };
                    temp.quantity += buyItem.quantity;
                    flag = true;
                    return temp;
                }
                return item;
            });

            if (!flag) {
                carts?.push(buyItem);
            }
            dispatch(
                userLoginActions.updateCart({
                    userId: userLoginStore.userInfor.id,
                    carts: {
                        carts: carts,
                    },
                })
            );
            return;
        }

        // chưa đăng nhập

        if (localStorage.getItem("carts")) {
            // đã từng có giỏ hàng
            let carts = JSON.parse(localStorage.getItem("carts"));
            // console.log(carts);
            let flag = false;
            carts.map((item) => {
                if (item.productId == buyItem.productId) {
                    item.quantity += buyItem.quantity;
                    flag = true;
                }
                return item;
            });
            if (!flag) {
                carts?.push(buyItem);
            }
            dispatch(cartsActions.updateCartlocal(carts));
            localStorage.setItem("carts", JSON.stringify(carts));
        } else {
            // chưa từng có
            let carts = [buyItem];
            dispatch(cartsActions.updateCartlocal(carts));
            localStorage.setItem("carts", JSON.stringify(carts));
        }
    }

    return (
        <div className="container">
            <div className="item__container">
                <div className="item__left">
                    <div className="item__img">
                        <img src={`${product?.url}`} alt="" />
                    </div>

                    <div className="yourCart">
                        <div className="quantity__yourCart">
                            <i
                                onClick={() =>
                                    quantity > 1 ? (
                                        setQuantity(quantity - 1)
                                    ) : (
                                        <></>
                                    )
                                }
                                class="fa-solid fa-minus"
                            ></i>
                            <span ref={quantityRef}>{quantity}</span>
                            <i
                                onClick={() =>
                                    quantity < product.stock ? (
                                        setQuantity(quantity + 1)
                                    ) : (
                                        <></>
                                    )
                                }
                                class="fa-solid fa-plus"
                            ></i>
                        </div>
                        <div className="price__yourCart">
                            <p>{convertToUSD(product?.price)}</p>
                        </div>
                    </div>
                    <div className="item__option">
                        <div
                            onClick={() => navigate("/menu/food")}
                            className="back__to__menu"
                        >
                            Back To Menu
                        </div>
                        <div className="addToCart">
                            <button
                                onClick={() => {
                                    let quantity = Number(
                                        quantityRef.current.innerText
                                    );
                                    let setStock = Number(
                                        product.stock -
                                            quantityRef.current.innerText
                                    );
                                    addToCart({
                                        productId: product.id,
                                        quantity: quantity,
                                        des: "đã mua sản phẩm",
                                        url: product.url,
                                        name: product.name,
                                        price: product.price,
                                    });
                                    toastSuccess(
                                        `bạn vừa mua ${quantity} ${product.name}`
                                    );
                                }}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
                <div className="item__right">
                    <div className="item__content">
                        <h2>{product?.name}</h2>

                        <p>
                            The USDA Prime is the highest grade of beef in the
                            USA and properly aged in our cold storage for
                            additional 21 to 28 days to fully develop the
                            flavour and tenderness for that melt in your mouth
                            and consistent quality experience. Taken from the
                            smaller end of the tenderloin and located between
                            the sirloin and rib, hand-cut and hand-trimmed by
                            the El Gaucho butchers, the filet steak is a feast
                            for the eye and the mouth.
                        </p>
                    </div>
                    <div className="item__content__sub">
                        <p> quantity left in cart {product?.stock}</p>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
