import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@components/Loadings/Loading";
import { userLoginActions } from "@stores/slices/userLogin.slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        <div className="register_container">
            {userLoginStore.loading || loadingCheck ? (
                <Loading></Loading>
            ) : (
                <></>
            )}
            <form
                onSubmit={async (eventForm) => {
                    eventForm.preventDefault(); // vô hiệu hành vi mặc định form

                    if (
                        eventForm.target.inputPassword.value == "" ||
                        eventForm.target.inputUserName.value == "" ||
                        eventForm.target.inputUserEmail.value == ""
                    ) {
                        alert("vui lòng điền đầy đủ các trường");
                        return;
                    }

                    if (
                        eventForm.target.inputPassword.value !=
                        eventForm.target.inputRePassword.value
                    ) {
                        alert("....");
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
                        alert("User Name da ton tai");
                        setLoadingCheck(false);
                        return;
                    }
                    setLoadingCheck(false);

                    dispatch(
                        userLoginActions.register({
                            userName: eventForm.target.inputUserName.value,
                            email: eventForm.target.inputUserEmail.value,
                            password: eventForm.target.inputPassword.value,
                            isAdmin: false,
                            firstName: "New",
                            lastName: "Member",
                            avatar: "https://png.pngtree.com/png-clipart/20210608/ourmid/pngtree-gray-silhouette-avatar-png-image_3418406.jpg",
                        })
                    );
                }}
                className="register_form"
            >
                <p className="form_title">Register</p>
                {/* input User Name */}
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="User name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="inputUserName"
                    />
                </div>

                {/* input email */}
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="inputUserEmail"
                    />
                </div>
                {/* input password */}
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="inputPassword"
                    />
                </div>
                <div className="form_input input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="inputRePassword"
                    />
                </div>
                <button
                    style={{ width: "100%" }}
                    type="submit"
                    className="btn btn-success"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
