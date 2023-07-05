// import React, { useEffect } from "react";
// import "./Cart.scss";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useDispatch, useSelector } from "react-redux";
// import { userLoginActions } from "../../stores/slices/userLogin.slice";
// import { productActions } from "../../stores/slices/products.slice";
// // import CartItem from './CartItem';

// function Cart() {
//     const [quantity, setQuantity] = useState(1);
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const dispatch = useDispatch();
//     const userLoginStore = useSelector((store) => store.userLoginStore);
//     const productStore = useSelector((store) => store.productStore);
//     const [cartData, setCartData] = useState(
//         userLoginStore.userInfor?.carts || []
//     );

//     useEffect(() => {
//         dispatch(
//             userLoginActions.checkTokenLocal(localStorage.getItem("token"))
//         );
//         dispatch(productActions.findAllProducts());
//     }, []);

//     useEffect(() => {
//         if (
//             userLoginStore.userInfor != null &&
//             productStore.listProducts.length > 0
//         ) {
//             let carts = [...userLoginStore.userInfor.carts];
//             let listProducts = productStore.listProducts;
//             for (let i = 0; i < carts.length; i++) {
//                 for (let j = 0; j < listProducts.length; j++) {
//                     if (carts[i].productId == listProducts[j].id) {
//                         carts[i] = Object.assign({}, carts[i], {
//                             url: listProducts[j].url,
//                         });
//                         carts[i] = Object.assign({}, carts[i], {
//                             price: listProducts[j].price,
//                         });
//                         carts[i] = Object.assign({}, carts[i], {
//                             name: listProducts[j].name,
//                         });
//                     }
//                 }
//                 setCartData(carts);
//             }
//             console.log("cartData", cartData);
//         }
//     }, [userLoginStore.userInfor]);

//     return (
//         <>
//             <Button
//                 variant="primary"
//                 onClick={handleShow}
//                 style={{
//                     backgroundColor: "#fff",
//                     color: "black",
//                     border: "none",
//                     width: "30px",
//                 }}
//             >
//                 <i className="fa-solid fa-cart-shopping"></i>
//             </Button>

//             <Modal show={show} onHide={handleClose} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>SHOPPING BAG</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         {/* {
//               cartData.map((item) => <CartItem item={item}/>)
//             } */}
//                         <div
//                             style={{ border: "1px solid" }}
//                             className="itemContainer"
//                         >
//                             {cartData.map((item) => (
//                                 <div className="item" key={item.productId}>
//                                     <div className="itemImage">
//                                         <img src={item?.url} alt="" />
//                                     </div>
//                                     <div className="detailItem">
//                                         <h5>Name :{item?.name}</h5>
//                                         <p>Price:{item?.price}</p>
//                                         <div className="quantity">
//                                             <i
//                                                 class="fa-solid fa-plus"
//                                                 onClick={() =>
//                                                     setQuantity(quantity + 1)
//                                                 }
//                                             ></i>
//                                             <span style={{ padding: "0 10px" }}>
//                                                 {quantity}
//                                             </span>
//                                             <i
//                                                 class="fa-solid fa-minus"
//                                                 onClick={() =>
//                                                     setQuantity(quantity - 1)
//                                                 }
//                                             ></i>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <i className="fa-solid fa-trash-can"></i>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="total">
//                             <p style={{ fontSize: "12px" }}>
//                                 FREE SHIPPING IN US FOR ORDERS OVER $200.00 USD
//                             </p>
//                             <p>Total : 3</p>
//                             <p>Total Price: 100</p>
//                         </div>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default Cart;
