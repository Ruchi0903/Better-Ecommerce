import React from "react";
import "../styles/home.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";

const Home = () => {
  const productList = [
    {
      id: 1,
      name: "Sony WH-CH520",
      price: "5470",
      imgSrc: "https://m.media-amazon.com/images/I/41JACWT-wWL._SY355_.jpg",
    },
    {
      id: 2,
      name: "JBL Tune 760NC",
      price: "5499",
      imgSrc: "https://m.media-amazon.com/images/I/61QZnJ+vJyL._SY355_.jpg",
    },
    {
      id: 3,
      name: "Redmi 12C",
      price: "8999",
      imgSrc:
        "https://m.media-amazon.com/images/I/41-T2ODZmDL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      id: 4,
      name: "Galaxy A34 5G",
      price: "28,999",
      imgSrc:
        "https://m.media-amazon.com/images/I/31uajoTE1jL._SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      id: 5,
      name: "beatXP Flare Pro",
      price: "1199",
      imgSrc:
        "https://m.media-amazon.com/images/I/41eTR9-WvDL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      id: 6,
      name: "Noise Pulse 2 Max",
      price: "1499",
      imgSrc:
        "https://m.media-amazon.com/images/I/41UoKKWuxjL._SX300_SY300_QL70_FMwebp_.jpg",
    },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    // These "options" will be sent to payload in reducers.
    console.log(options);
    // this dispatch will be used to add the items to the cart
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };

  return (
    <div className="home">
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          id={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => {
  return (
    <div className="product-card">
      <img src={imgSrc} alt={name} />
      <p>{name}</p>
      <h4>${price}</h4>
      <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
        Add To Cart
      </button>
    </div>
  );
};

export default Home;
