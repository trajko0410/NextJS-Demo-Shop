import style from "../Layout/mainNavigation.module.css";
import logo from "../../public/images/icons/logoFIRWL.png";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

//import NumberOfItemsInCart from "../Cart/NumberOfItems";
import Cart from "../Cart/Cart";
import CartIcon from "../Cart/CartIcon";

import useWindowSize from "../Hooks/useWindowSize";

function MainNavigation() {
  const router = useRouter();
  const isActive = (href) => router.pathname === href;

  const [cartOpen, setCartOpen] = useState(undefined);
  const [cartItemsLenght, setCartItems] = useState(0);

  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (cartItemsLenght > 0) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500); // Match the duration of the shake animation
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [cartItemsLenght]); // Only run when cart length changes

  const [menuOpen, setMenuOpen] = useState(undefined);
  const size = useWindowSize();

  //console.log(cartOpen);
  //console.log(menuOpen, "menu");

  //console.log(size);
  useEffect(() => {
    if (size.width > 900) {
      setMenuOpen(undefined);
    }
  }, [size]);

  function cartHandler() {
    setCartOpen(!cartOpen);
  }

  function menuHandler() {
    setMenuOpen(!menuOpen);
  }

  function closeMenuHandler() {
    if (size.width > 900) {
      setMenuOpen(undefined);
    } else {
      setMenuOpen(false);
    }
  }

  const totalCartItems = (totalCartItems) => {
    setCartItems(totalCartItems);
  }; //dobili smo tako sto smo slali od dole

  //console.log(cartItemsLenght, "treba");

  // console.log(cartOpen, "Cart open");

  return (
    <>
      <nav className={style.header}>
        <div className={style.logo}>
          <Link href="/" onClick={closeMenuHandler}>
            <Image src={logo} alt="logo" height={50} width={150}></Image>
          </Link>
        </div>
        <div
          className={`${
            menuOpen === undefined
              ? style.menuUndefined
              : !menuOpen
              ? style.containeraroundlinks
              : style.containeraroundlinksMenuOpen
          }`}
        >
          <div className={style.navigation}>
            <ul>
              <li>
                <Link href="/" onClick={closeMenuHandler}>
                  <h3 className={isActive("/") ? style.active : ""}>Home</h3>
                </Link>
              </li>
              <li>
                <Link href="/shop" onClick={closeMenuHandler}>
                  <h3 className={isActive("/shop") ? style.active : ""}>
                    Shop
                  </h3>
                </Link>
              </li>
            </ul>
          </div>
          <div className={style.personal}>
            <ul>
              <li>
                <Link
                  href="/login"
                  className={style.login}
                  onClick={closeMenuHandler}
                >
                  <h3 className={isActive("/login") ? style.active : ""}>
                    logIn
                  </h3>
                </Link>
              </li>
              <li className={isShaking ? style.shake : ""}>
                <CartIcon
                  cartHandler={cartHandler}
                  closeMenuHandler={closeMenuHandler}
                  cartOpen={cartOpen}
                  totalCartItems={totalCartItems}
                />
              </li>
            </ul>
          </div>
        </div>
        <div
          onClick={menuHandler}
          className={`${style.hamburgerMenu} ${
            menuOpen ? style.hamburgerMenuActive : ""
          } ${isShaking ? style.shake : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className={style.cartIcon}>
        <Cart
          cartState={cartOpen}
          cartItemsLenght={cartItemsLenght}
          cartHandler={cartHandler}
        ></Cart>

        <div
          className={`${style.overlay} ${
            cartOpen === undefined
              ? style.overlayUndefined
              : cartOpen
              ? style.overlayOpen
              : style.overlayClose
          }`}
          onClick={cartHandler}
        ></div>
      </div>

      <div
        className={`${style.overlay} ${
          menuOpen === undefined
            ? style.overlayUndefined
            : menuOpen
            ? style.overlayOpen
            : style.overlayClose
        }`}
        onClick={closeMenuHandler}
      ></div>
    </>
  );
}

export default MainNavigation;
