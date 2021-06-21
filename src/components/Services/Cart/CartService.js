import FetchData from "../../FetchRestAPI/FetchData";
import { CREATE_ORDER_URL, GET_CART_ITEMS_URL, CART_NAME } from "../../QueryLinks/QueryLinks";
import { setBasket } from "../../Redux/Actions/Basket/BasketCount";
import store from "../../Redux/store";
import { POST } from "../../RequestMethods/Methods";

export const AddToCartProduct = (payload, currentQuantity, id) => {
    
    const cart = localStorage.getItem("cart");
    if (cart == null) {
           
        // Check browser support
        if (typeof(Storage) !== "undefined") {
            // Store
            const cart = [];
            
            cart.push(payload);
            localStorage.setItem(CART_NAME, JSON.stringify(cart));

            // setting basket.
            store.dispatch(setBasket(cart));
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    } else {
        // Check browser support
        if (typeof(Storage) !== "undefined") {
            // Store
            const cart = JSON.parse(localStorage.getItem(CART_NAME));
            let isFound = false;
            
            // Check if the product is in the cart and update his quantity.
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                if (element.id === id) {
                    // cart[i + 1] = cart[i + 1] + this.state.quantity;
                    element.quantity = Number(currentQuantity);
                    isFound = true;
                }   
            }

            if (!isFound) {
                cart.push(payload);
            }

            localStorage.setItem(CART_NAME, JSON.stringify(cart));
            
            // setting basket.
            store.dispatch(setBasket(cart));
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
}

export const removeFromCart = (id) => {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        const cart = JSON.parse(localStorage.getItem(CART_NAME));
        
        const newCart = cart.filter(x => x.id !== id);

        localStorage.setItem("cart", JSON.stringify(newCart));
        
        // Decrease from basket.
        store.dispatch(setBasket(newCart));
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }

    return true;
}

export const CheckLocalStorageAndAddTobasketProducts = () => {
    const cart = localStorage.getItem(CART_NAME);
    if (cart == null) {
         
    } else {
        // Check browser support
        if (typeof(Storage) !== "undefined") {
            // Store
            const cart = JSON.parse(localStorage.getItem(CART_NAME));
         
            // setting basket.
            store.dispatch(setBasket(cart));
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
}

// Getting all items from the basket and request actual data from back end.
export const getCartItems = async (basket) => {
    var result = await FetchData(GET_CART_ITEMS_URL, basket, POST);
    return await result;
}

// Create order.
export const setCreateOrder = async (payload) => {
    const result = await FetchData(CREATE_ORDER_URL, payload, POST);
    return await result;
}

export const resetCart = () => {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        const newCart = [];

        localStorage.removeItem(CART_NAME);
        
        // Decrease from basket.
        store.dispatch(setBasket(newCart));
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }   
}