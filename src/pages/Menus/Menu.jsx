import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../stores/slices/products.slice";
export default function Menu() {
    const navigator = useNavigate();
  const {type} = useParams();
  const dispatch=useDispatch();
  const productStore = useSelector(store => store.productStore.listProducts)

  useEffect(() => {
    dispatch(productActions.findAllProducts())
  },[])

//   console.log(productStore)
 
  return (
    // <div>Menu {type} </div>
 <div className="menu__conteiner">
        <div className="menu__nav">
            <div className="menu__nav__left">
                <button  onClick={() => navigator('/menu/food')}>Food</button>
            </div>
            <div className="menu__nav__right">
                <button  onClick={() => navigator('/menu/drink')}>Drinks</button>
            </div>
        </div>
        <div className="menu__detail">

            {productStore?.filter((product) => product.type == type).map((product) => 
            <div onClick={() => navigator('/detail/' + `${product.id}`)} className="menu__item">
                <div className="menu__item__img">
                    <img src={product.url} alt="" />
                </div>
                <div className="menu__item__info">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
            </div>)}
        </div>
    </div>
  )
}
