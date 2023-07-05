import React, { useEffect, useState } from "react";
import "./CheckOut.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { productActions } from "../../stores/slices/products.slice";
import { convertToUSD } from "@mieuteacher/meomeojs";
import toast, { Toaster } from "react-hot-toast";

export default function CheckOut() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const userLoginStore = useSelector((store) => store.userLoginStore);
    const navigate = useNavigate();
    const [isInformationComplete, setIsInformationComplete] = useState(false);
    const [productCart, setProductCart] = useState([]);
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
    useEffect(() => {
        if (userLoginStore.userInfor) {
            setProductCart(userLoginStore.userInfor.carts);
        }
    }, []);
    const handleCheckOut = () => {
        if (name === "" || email === "" || phone === "" || address === "") {
            toastError("Please Check Your Information");
        } else {
            dispatch(
                productActions.checkOut({
                    id: userLoginStore.userInfor.id,
                    patchData: {
                        carts: [],
                        receip: [
                            ...userLoginStore.userInfor.carts,
                            ...userLoginStore.userInfor.receip,
                        ],
                    },
                })
            );
            setIsInformationComplete(true);
            navigate("/Menu/food");
        }
    };
    return (
        <div className="checkOut__main">
            <div className="chekOut__container">
                <div className="user__infor__container">
                    <div className="user__infor">
                        <h2>Check Login</h2>
                        <label name="email" className="checkOut__input">
                            email
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label name="userName" className="checkOut__input">
                            user name
                            <input
                                type="text"
                                name="userName"
                                className="form-control"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label name="phoneNumber" className="checkOut__input">
                            phone number
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </label>
                        <label name="Address" className="checkOut__input">
                            Add ress
                            <input
                                type="text"
                                name="Address"
                                className="form-control"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                        <div className="check__btn">
                            <Link to="/Cart" className="backToCart">
                                <button>Back To Cart</button>
                            </Link>
                            <div
                                className="checkOut__btn"
                                onClick={handleCheckOut}
                            >
                                Check Out
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__container">
                    {productCart.map((item) => (
                        <div className="product__detail">
                            <div className="product__img">
                                <img src={item.url} />
                            </div>
                            <div className="product__infor">
                                <h3>{item.name}</h3>
                                <h5>{item.quantity}</h5>
                                <h5> {convertToUSD(item.price)}</h5>
                            </div>
                        </div>
                    ))}
                    {productCart.length > 0 ? (
                        <h2>Quantity: {productCart.length}</h2>
                    ) : (
                        <h2>No item in shopping cart</h2>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
}
