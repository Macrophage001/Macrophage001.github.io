let Store = {
    Produce: [
        {name: 'Carrots', price: 12},
        {name: 'Avocados', price: 8},
        {name: 'Broccoli', price: 4},
        {name: 'Potatoes', price: 10},
        {name: 'Leeks', price: 10}
    ],
    Furniture: [
        {name: 'Chair', price: 24},
        {name: 'Table', price: 18},
        {name: 'Vase', price: 12}
    ],
    Meats: [
        {name: 'Steak', price: 21},
        {name: 'Lamb', price: 19},
        {name: 'Pork', price: 32}
    ]
}

let shoppingCart = [];

let cartCount = document.getElementById('cart');
let checkoutDisplay = document.getElementById('checkout-id');

const updateCheckoutDisplay = () => {
    let newHTMLElements = [];
    let totalPrice = 0;

    for (let i = 0; i < shoppingCart.length; i++)
    {
        let shoppingCartItem = shoppingCart[i];
        let shoppingCartItemName = shoppingCartItem.name;
        let shoppingCartItemPrice = shoppingCartItem.price;

        totalPrice = totalPrice + shoppingCartItemPrice;

        let htmlElement = "<div class='checkout-item'><p>" + shoppingCartItemName + "</p><p>" + shoppingCartItemPrice + "</p></div><hr><br>";
        newHTMLElements[i] = htmlElement;
    }

    checkoutDisplay.innerHTML = "";
    for (let i = 0; i < newHTMLElements.length; i++)
    {
        checkoutDisplay.innerHTML += newHTMLElements[i] + '\n';
    }

    let totalPriceCheckoutElement = "<div class='checkout-item'><h3>Total</h3><h4>" + totalPrice + "</h4></div>";
    checkoutDisplay.innerHTML += totalPriceCheckoutElement;
};

const addItemToShoppingCart = (grocerySectionName, itemIndex) => {
    let grocerySection = Store[grocerySectionName];
    console.log(grocerySection);
    let storeItem = grocerySection[itemIndex];
    console.log(storeItem);

    if (storeItem !== undefined)
    {
        console.log("Found: " + storeItem.name + ", adding to cart.");

        let shoppingCartLength = shoppingCart.length;
        shoppingCart[shoppingCartLength] = storeItem;

        console.log(shoppingCart);

        cartCount.innerHTML = "Cart: " + shoppingCartLength + ", Last Added Item: " + storeItem.name;
    }
    else
    {
        console.log("Should not get to this point but just in case...hi how are ya =D");
    }

    updateCheckoutDisplay();
};

const removeItemFromShoppingCart = (grocerySectionName, itemIndex) => {
    if (shoppingCart.length > 0)
    {
        let cartItem = undefined;
        let grocerySection = Store[grocerySectionName];
        let storeItem = grocerySection[itemIndex];

        for (let i = 0; i < shoppingCart.length; i++)
        {
            let currentShoppingCartItem = shoppingCart[i];
            if (currentShoppingCartItem === storeItem)
            {
                cartItem = currentShoppingCartItem;
                break;
            }
        }

        console.log(cartItem);

        if (cartItem !== undefined)
        {
            console.log("Found: " + cartItem.name + ", removing from cart.");

            let itemIdentificationNumber = shoppingCart.indexOf(cartItem);
            shoppingCart.splice(itemIdentificationNumber, 1);

            console.log(shoppingCart);

            cartCount.innerHTML = "Cart: " + shoppingCart.length;
        }

        updateCheckoutDisplay();
    }
};