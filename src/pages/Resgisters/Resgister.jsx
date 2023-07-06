import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@components/Loadings/Loading";
import { userLoginActions } from "../../stores/slices/userLogin.slice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Resgister.scss";
import axios from "axios";
export default function Resgister() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const userLoginStore = useSelector((store) => store.userLoginStore);
    const [loadingCheck, setLoadingCheck] = useState(false);
    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            if (localStorage.getItem("token")) {
                dispatch(
                    userLoginActions.checkTokenLocal(
                        localStorage.getItem("token")
                    )
                );
            }
        } else {
            navigate("/");
        }
    }, [userLoginStore.userInfor]);
    return (
        <div className="register__main">
            {userLoginStore.Loading || loadingCheck ? (
                <Loading></Loading>
            ) : (
                <></>
            )}
            <form
                onSubmit={async (eventForm) => {
                    eventForm.preventDefault();
                    if (
                        eventForm.target.inputPassword.value == "" ||
                        eventForm.target.inputUserName.value == "" ||
                        eventForm.target.inputUserEmail.value == ""
                    ) {
                        toastError("vui long dien thu thong tin");
                        return;
                    }
                    if (
                        eventForm.target.inputPassword.value !=
                        eventForm.target.inputRePassword.value
                    ) {
                        toastError("Mật khẩu xác nhận không đúng");
                        return;
                    }
                    if (loadingCheck) {
                        return;
                    }
                    setLoadingCheck(true);
                    let resultCheck = await axios.get(
                        process.env.REACT_APP_SERVER_JSON +
                            "users" +
                            "?userName=" +
                            eventForm.target.inputUserName.value
                    );
                    if (resultCheck.data.length != 0) {
                        toastError("ten gnuoi dung da ton tai");
                        setLoadingCheck(false);
                        return;
                    }
                    setLoadingCheck(false);
                    toastSuccess("bạn đã đăng ksy thành công");
                    dispatch(
                        userLoginActions.register({
                            userName: eventForm.target.inputUserName.value,
                            email: eventForm.target.inputUserEmail.value,
                            password: eventForm.target.inputPassword.value,
                            idAdmin: false,
                            firstName: "New",
                            lastName: "Member",
                            avatar: "../images/avatar/avatar.jpg",
                            carts: [],
                            receip: [],
                        })
                    );
                }}
                className="register__container"
            >
                <h1>Đăng Ký</h1>
                <div className="register__email">
                    <input
                        type="text"
                        name="inputUserEmail"
                        className="form-control"
                        placeholder="Nhập vào email đăng ký"
                    />
                    {/* <span class="form-message"></span> */}
                </div>
                <div className="register__name">
                    <input
                        type="text"
                        name="inputUserName"
                        class="form-control"
                        placeholder="Nhập tên người dùng"
                    />
                    {/* <span class="form-message"></span> */}
                </div>
                <div className="register__password">
                    <input
                        type="password"
                        name="inputPassword"
                        className="form-control"
                        placeholder="Nhập vào mật khẩu đăng ký"
                    />
                    {/* <span class="form-message"></span> */}
                </div>
                <div className="register__confirmPassword">
                    <input
                        type="password"
                        name="inputRePassword"
                        className="form-control"
                        placeholder="Xác nhận lại mật khẩu"
                    />
                    {/* <span class="form-message"></span> */}
                </div>
                <button className="buttonRegister" type="submit">
                    Đăng Ký
                </button>
                <div className="login__btn">
                    Bạn đã có tài khoản
                    <span onClick={() => navigate("/login")}>
                        {" "}
                        Đăng Nhập tại đây
                    </span>
                </div>
            </form>
            <Toaster />
        </div>
    );
}
