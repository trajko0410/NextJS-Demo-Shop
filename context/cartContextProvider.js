import { createContext, useReducer } from "react";

//export const shopContext = createContext(null);

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
}); //Ovo je da bi imali bolji autocompleate

//1.potrebno je dodati reducer funkciju

//action govori funckiji kako da updatuje state

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //... UPDATE the state to add a meal

    //Proveravam da li postoji u dosadasnjem statu

    const existingItemInCart = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // ako je state id === id koji dobijam posle akcije

    const updatedItems = [...state.items]; //ovo copy pravimo kako ne bi uticali na pocetni state

    if (existingItemInCart > -1) {
      //-1 jer ce find index vratiti to ako ne dobijemo nista nayad pa ako je vece onda vec postoji
      const existingItem = state.items[existingItemInCart];
      const updatedItem = {
        ...existingItem, //spredujemo vec postojeci item
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemInCart] = updatedItem; //updatujemo pcetnu kopiju
    } else {
      //console.log(existingItemInCart);
      updatedItems.push({ ...action.item, quantity: 1 });
      //ako ne postoji akcijom ce po pushovati novi item u copiju pocetnog skupa}
      //moramo doati quantitiy kako bi mogli da ga  kako bi novi itemi startovali sa quntity od 1
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    //... removes item from state

    const existingItemInCartIndex = state.items.findIndex(
      (item) => item.id === action.id ///promeniti na id yato sto mi dole treba samo id a ne sve
    );

    const existingCartItem = state.items[existingItemInCartIndex];
    //u sustini samo skracujemo kod
    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemInCartIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingItemInCartIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
  // ako ne udjem ni u jedan action hocu da vratim pocetni state
}

export const ShopContextProvider = (props) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  //Prvo prosledjujemo reduceer funkciju
  //Drugo mu porsledjujemo initial state ... items[] ce se gore proslediti kroz state
  //sastoji se iz cart , dispachera

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContextValue = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  //console.log(cartContextValue);

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
