import React, { useState } from "react";
import "../styles/home.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import productList from "./api.js";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filteredProds, setFilteredProds] = useState(productList);

  const handleSearch = () => {
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProds(filtered);
  };

  const addToCartHandler = (options) => {
    // These "options" will be sent to payload in reducers.
    console.log(options);
    // this dispatch will be used to add the items to the cart
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    // Toast for adding to cart
    toast.success("Added To Cart");
  };

  return (
    <>
      {/* Search functionality STRUCTURE*/}
      <div className="search">
        <input
          type="text"
          className="input"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      
      <div className="home">
        {/* SEARCH FUNCTIONALITY IMPLEMENTED PROPERLY */}

        {search !== ""
          ? filteredProds.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imgSrc={product.imgSrc}
                name={product.name}
                price={product.price}
                handler={addToCartHandler}
              />
            ))
          : productList.map((i) => (
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
    </>
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
