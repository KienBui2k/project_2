import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUSD } from "@mieuteacher/meomeojs";
export default function Contact() {
    const userLoginStore = useSelector((store) => store.userLoginStore);
    const [yourOrder, setYourOrder] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (userLoginStore.userInfor) {
            setYourOrder(userLoginStore.userInfor);
        }
    }, [yourOrder.receipt]);

    useEffect(() => {
        let sum = 0;
        for (let i in yourOrder.receipt) {
            sum += Number(
                yourOrder.receipt[i].quantity * yourOrder.receipt[i].price
            );
        }
        setTotal(sum);
    }, [yourOrder.receipt]);

    return (
        <div className="contact__container">
            <section className="h-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: 10 }}>
                                <div className="card-header px-4 py-5">
                                    <h5 className="text-muted mb-0">
                                        Thanks for your Order,{" "}
                                        <span style={{ color: "#a8729a" }}>
                                            {yourOrder.userName}
                                        </span>
                                        !
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p
                                            className="lead fw-normal mb-0"
                                            style={{ color: "#a8729a" }}
                                        >
                                            Receipt
                                        </p>
                                        <p className="small text-muted mb-0">
                                            Receipt Voucher : 1KAU9-84UIL
                                        </p>
                                    </div>
                                    {yourOrder.receipt?.map((item) => (
                                        <div className="card shadow-0 border mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <img
                                                            src={item.url}
                                                            className="img-fluid"
                                                            alt="Phone"
                                                        />
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">
                                                            {item.des}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">
                                                            {convertToUSD(
                                                                item.quantity *
                                                                    item.price
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr
                                                    className="mb-4"
                                                    style={{
                                                        backgroundColor:
                                                            "#e0e0e0",
                                                        opacity: 1,
                                                    }}
                                                />
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-md-2">
                                                        <p className="text-muted mb-0 small">
                                                            Track Order
                                                        </p>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div
                                                            className="progress"
                                                            style={{
                                                                height: 6,
                                                                borderRadius: 16,
                                                            }}
                                                        >
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{
                                                                    width: "65%",
                                                                    borderRadius: 16,
                                                                    backgroundColor:
                                                                        "#a8729a",
                                                                }}
                                                                aria-valuenow={
                                                                    65
                                                                }
                                                                aria-valuemin={
                                                                    0
                                                                }
                                                                aria-valuemax={
                                                                    100
                                                                }
                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-around mb-1">
                                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                                Out for delivary
                                                            </p>
                                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                                Delivered
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="card-footer border-0 px-4 py-5"
                                    style={{
                                        backgroundColor: "#a8729a",
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}
                                >
                                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                        Total paid:{" "}
                                        <span className="h2 mb-0 ms-2">
                                            {convertToUSD(total)}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
