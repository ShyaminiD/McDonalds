import "./App.css";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

const API = "https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7";

function App() {
  return (
    <div className="App">
      <AppBar style={{ backgroundColor: "#161925" }} position="static">
        <Typography variant="h3" className="heading">
          Mc Donalds
        </Typography>
      </AppBar>

      <MenuItems />
    </div>
  );
}
function MenuItems() {
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  console.log(quantity);
  const [cart, setCart] = useState([]);
  console.log("updated", cart);

  const getMenu = () => {
    fetch(`${API}`)
      .then((data) => data.json())
      .then((menu) => setMenu(menu));
  };
  useEffect(getMenu, []);

  return (
    <div className="menurow">
      <div className="list">
        {menu.map((m, index) => (
          <MenuitemDisplay
            key={index}
            itemid={m.id}
            itemname={m.item_name}
            itemprice={m.price}
            quantity={quantity}
            setQuantity={setQuantity}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>

      <div className="cart">
        <h2>Cart</h2>
        <p>Total Quantity:{quantity}</p>
        {cart.map((c) => (
          <MenuCart
            itemname={c.item_name}
            itemprice={c.price}
            quantity={quantity}
            setQuantity={setQuantity}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
}
function MenuitemDisplay({ itemname, itemprice, itemid, cart, setCart }) {
  console.log("indisaply", cart);
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="menuitem">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png"
          alt="mcdonalds-logo"
          width="100"
          height="100"
        />
      </div>
      <p className="itemname">{itemname}</p>
      <p className="itemprice">Rs {itemprice}</p>
      <button
        onClick={() => {
          console.log(itemid, itemname, itemprice);
          setCart([
            ...cart,
            {
              id: itemid,
              item_name: itemname,
              price: itemprice,
            },
          ]);
        }}
      >
        Add to cart
      </button>

      <button onClick={() => setQuantity(quantity - 1)}>-</button>
      {quantity < 0 ? 0 : quantity}
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
}

function MenuCart({ itemname, itemprice }) {
  const [quantity, setQuantity] = useState(0);
  const total = quantity * itemprice;
  return (
    <div>
      <div>
        <h5>{itemname}</h5>
        <p className="cartItemName">
          Rs {itemprice}
        </p>
        <p className="cartItemName">{quantity} Nos</p>
        <p>Sub total:{total}</p>
      </div>
      <button onClick={() => setQuantity(quantity - 1)}>-</button>
      {quantity < 0 ? 0 : quantity}
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      
    </div>
  );
}
export default App;
