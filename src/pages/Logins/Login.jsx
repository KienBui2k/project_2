import React, { useEffect } from "react";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@components/Loadings/Loading";
import { userLoginActions } from "../../stores/slices/userLogin.slice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLoginStore = useSelector((store) => store.userLoginStore);
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
        <div className="login_container">
            {userLoginStore.loading ? <Loading></Loading> : <></>}
            <form
                onSubmit={(eventForm) => {
                    eventForm.preventDefault();

                    if (
                        eventForm.target.inputUserName.value == "" ||
                        eventForm.target.inputPassword.value == ""
                    ) {
                        toastError("please provide the following information");
                        return;
                    } else {
                        toastSuccess("wellcome!");
                        dispatch(
                            userLoginActions.login({
                                userName: eventForm.target.inputUserName.value,
                                password: eventForm.target.inputPassword.value,
                            })
                        );
                    }
                }}
                className="login_form"
            >
                <p className="form_title">Login Form</p>
                {/* input User Name */}
                <div className="form_input input-group mb-3 input__infor">
                    <label name="inputUserName">
                        User Name
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="inputUserName"
                        />
                    </label>
                </div>
                {/* input User Name */}
                <div className="form_input input-group mb-3 input__infor">
                    <label name="inputPassword">
                        Password
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="inputPassword"
                        />
                    </label>
                </div>
                <div className="btn__option">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <button
                        className="btn btn-primary register_btn"
                        onClick={() => navigate("/resgister")}
                    >
                        Resgister
                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    );
}
