/* =====================================================
   TECHVAULT
   SCRIPT.JS
===================================================== */


/* =====================================================
   PRODUCT DATA
===================================================== */

const PRODUCTS = [

    {
        id: 1,

        name: "Wireless Headphones",

        category: "Electronics",

        price: 2000,

        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80",

        description:
            "Premium noise cancelling headphones with crystal clear sound.",

        details:
            "Bluetooth 5.3, 40 hours battery, fast charging and built-in microphone."
    },


    {
        id: 2,

        name: "Mechanical Keyboard",

        category: "Accessories",

        price: 500,

        image:
            "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=700&q=80",

        description:
            "RGB mechanical keyboard for coding and gaming.",

        details:
            "Blue switches, RGB backlight and USB-C connection."
    },


    {
        id: 3,

        name: "Wireless Mouse",

        category: "Electronics",

        price: 500,

        image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&q=80",

        description:
            "Comfortable ergonomic mouse for long working hours.",

        details:
            "2.4GHz wireless, silent click and rechargeable battery."
    },


    {
        id: 4,

        name: "Running Shoe",

        category: "Accessories",

        price: 800,

        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",

        description:
            "Comfortable shoes for running and daily activities.",

        details:
            "Lightweight construction, water-resistant finish and cushioned sole."
    },


    {
        id: 5,

        name: "27 Inch Monitor",

        category: "Electronics",

        price: 90000,

        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",

        description:
            "Ultra HD IPS monitor for productivity and entertainment.",

        details:
            "4K UHD, HDR support and 75Hz refresh rate."
    },


    {
        id: 6,

        name: "Premium Laptop",

        category: "Electronics",

        price: 68000,

        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80",

        description:
            "Portable laptop with high-performance specifications and excellent build quality.",

        details:
            "High-performance processor, 12 hours battery and premium build."
    }

];


/* =====================================================
   APPLICATION STATE
===================================================== */

const state = {

    cart:
        JSON.parse(
            localStorage.getItem("techvault-cart") || "[]"
        ),

    filtered:
        [...PRODUCTS]

};


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

const $ = (selector) =>
    document.querySelector(selector);


const $$ = (selector) =>
    [...document.querySelectorAll(selector)];


const money = (value) =>
    `₹${value.toLocaleString("en-IN")}`;


function getProduct(id) {

    return PRODUCTS.find(
        product =>
            product.id === Number(id)
    );

}


function saveCart() {

    localStorage.setItem(
        "techvault-cart",
        JSON.stringify(state.cart)
    );

}


function cartQuantity() {

    return state.cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


function cartTotal() {

    return state.cart.reduce(
        (total, item) => {

            const product =
                getProduct(item.id);

            if (!product) {
                return total;
            }

            return total +
                product.price *
                item.quantity;

        },
        0
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        $("#toast");

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        showToast.timer
    );

    showToast.timer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

    const grid =
        $("#product-grid");

    grid.innerHTML = "";


    state.filtered.forEach(
        product => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "card";


            card.innerHTML = `

                <div class="card-image-wrap">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </div>


                <div class="card-content">

                    <span class="category">
                        ${product.category}
                    </span>


                    <h3>
                        ${product.name}
                    </h3>


                    <p>
                        ${product.description}
                    </p>


                    <div class="price">
                        ${money(product.price)}
                    </div>


                    <div class="card-actions">

                        <button
                            class="small-btn details-btn"
                            data-id="${product.id}"
                            type="button"
                        >
                            View Details
                        </button>


                        <button
                            class="small-btn cart-btn"
                            data-id="${product.id}"
                            type="button"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            `;


            grid.appendChild(
                card
            );

        }
    );


    $("#result-count").textContent =
        `${state.filtered.length} product${
            state.filtered.length === 1
                ? ""
                : "s"
        }`;


    $("#empty-products")
        .classList.toggle(
            "hidden",
            state.filtered.length !== 0
        );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    $("#cart-count").textContent =
        cartQuantity();


    $("#cart-total").textContent =
        money(cartTotal());


    const container =
        $("#cart-items");


    if (state.cart.length === 0) {

        container.innerHTML = `

            <div class="cart-empty">

                Your cart is empty.

                <br>

                Add a product to get started.

            </div>

        `;

        return;
    }


    container.innerHTML =
        state.cart
            .map(item => {

                const product =
                    getProduct(item.id);

                if (!product) {
                    return "";
                }


                return `

                    <div class="cart-item">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >


                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <p>
                                ${money(product.price)}
                                each
                            </p>


                            <div class="qty-controls">

                                <button
                                    data-action="decrease"
                                    data-id="${product.id}"
                                    type="button"
                                >
                                    −
                                </button>


                                <strong>
                                    ${item.quantity}
                                </strong>


                                <button
                                    data-action="increase"
                                    data-id="${product.id}"
                                    type="button"
                                >
                                    +
                                </button>


                                <button
                                    class="remove-item"
                                    data-action="remove"
                                    data-id="${product.id}"
                                    type="button"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>


                        <strong>
                            ${money(
                                product.price *
                                item.quantity
                            )}
                        </strong>

                    </div>

                `;

            })
            .join("");

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    const product =
        getProduct(id);

    if (!product) {
        return;
    }


    const existing =
        state.cart.find(
            item =>
                item.id ===
                Number(id)
        );


    if (existing) {

        existing.quantity++;

    } else {

        state.cart.push({

            id: Number(id),

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    showToast(
        `${product.name} added to cart`
    );

}


/* =====================================================
   UPDATE QUANTITY
===================================================== */

function updateQuantity(
    id,
    change
) {

    const item =
        state.cart.find(
            entry =>
                entry.id ===
                Number(id)
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        state.cart =
            state.cart.filter(
                entry =>
                    entry.id !==
                    Number(id)
            );

    }


    saveCart();

    renderCart();

}


/* =====================================================
   REMOVE CART ITEM
===================================================== */

function removeFromCart(id) {

    state.cart =
        state.cart.filter(
            item =>
                item.id !==
                Number(id)
        );


    saveCart();

    renderCart();

    showToast(
        "Product removed from cart"
    );

}


/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

    $("#cart-drawer")
        .classList.add("open");


    $("#overlay")
        .classList.remove("hidden");


    document.body
        .classList.add("no-scroll");

}


function closeCart() {

    $("#cart-drawer")
        .classList.remove("open");


    if (
        $("#product-modal")
            .classList.contains("hidden") &&

        $("#checkout-modal")
            .classList.contains("hidden")
    ) {

        $("#overlay")
            .classList.add("hidden");

        document.body
            .classList.remove("no-scroll");

    }

}


/* =====================================================
   PRODUCT DETAILS MODAL
===================================================== */

function openProductModal(id) {

    const product =
        getProduct(id);


    if (!product) {
        return;
    }


    $("#modal-image").src =
        product.image;


    $("#modal-image").alt =
        product.name;


    $("#modal-category").textContent =
        product.category;


    $("#modal-title").textContent =
        product.name;


    $("#modal-description").textContent =
        product.description;


    $("#modal-price").textContent =
        money(product.price);


    $("#modal-details").textContent =
        product.details;


    $("#modal-add").dataset.id =
        product.id;


    $("#product-modal")
        .classList.remove("hidden");


    $("#overlay")
        .classList.remove("hidden");


    document.body
        .classList.add("no-scroll");

}


function closeModal(id) {

    $(`#${id}`)
        .classList.add("hidden");


    if (
        $("#cart-drawer")
            .classList.contains("open")
    ) {

        return;
    }


    if (
        $("#product-modal")
            .classList.contains("hidden") &&

        $("#checkout-modal")
            .classList.contains("hidden")
    ) {

        $("#overlay")
            .classList.add("hidden");

        document.body
            .classList.remove("no-scroll");

    }

}


/* =====================================================
   SEARCH AND FILTER
===================================================== */

function applyFilters() {

    const search =
        $("#search-input")
            .value
            .trim()
            .toLowerCase();


    const category =
        $("#category-filter")
            .value;


    const sort =
        $("#sort-products")
            .value;


    state.filtered =
        PRODUCTS.filter(
            product => {

                const matchesSearch =

                    product.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.description
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =

                    category === "all"

                    ||

                    product.category ===
                    category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    if (sort === "price-low") {

        state.filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "price-high") {

        state.filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "name") {

        state.filtered.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    renderProducts();

}


/* =====================================================
   CHECKOUT
===================================================== */

function openCheckout() {

    if (
        state.cart.length === 0
    ) {

        showToast(
            "Your cart is empty"
        );

        return;
    }


    const summary =
        $("#checkout-summary");


    summary.innerHTML =

        state.cart
            .map(item => {

                const product =
                    getProduct(item.id);

                return `

                    <div
                        class="checkout-summary-row"
                    >

                        <span>
                            ${product.name}
                            ×
                            ${item.quantity}
                        </span>

                        <strong>
                            ${money(
                                product.price *
                                item.quantity
                            )}
                        </strong>

                    </div>

                `;

            })
            .join("")

        +

        `

            <div
                class="checkout-summary-row"
                style="
                    border-top:1px solid #e2e8f0;
                    margin-top:8px;
                    padding-top:10px;
                "
            >

                <strong>
                    Total
                </strong>

                <strong>
                    ${money(cartTotal())}
                </strong>

            </div>

        `;


    $("#checkout-modal")
        .classList.remove("hidden");


    $("#overlay")
        .classList.remove("hidden");


    document.body
        .classList.add("no-scroll");

}


/* =====================================================
   DOCUMENT CLICK HANDLER
===================================================== */

document.addEventListener(
    "click",
    event => {


        /* ADD TO CART */

        const cartButton =
            event.target.closest(
                ".cart-btn"
            );


        if (cartButton) {

            addToCart(
                cartButton.dataset.id
            );

        }


        /* DETAILS */

        const detailsButton =
            event.target.closest(
                ".details-btn"
            );


        if (detailsButton) {

            openProductModal(
                detailsButton.dataset.id
            );

        }


        /* CART QUANTITY */

        const cartAction =
            event.target.closest(
                "[data-action]"
            );


        if (cartAction) {

            const id =
                cartAction.dataset.id;


            const action =
                cartAction.dataset.action;


            if (
                action === "increase"
            ) {

                updateQuantity(
                    id,
                    1
                );

            }


            if (
                action === "decrease"
            ) {

                updateQuantity(
                    id,
                    -1
                );

            }


            if (
                action === "remove"
            ) {

                removeFromCart(id);

            }

        }


        /* CLOSE MODAL */

        const closeButton =
            event.target.closest(
                "[data-close-modal]"
            );


        if (closeButton) {

            closeModal(
                closeButton.dataset.closeModal
            );

        }

    }
);


/* =====================================================
   CART BUTTON
===================================================== */

$("#open-cart")
    .addEventListener(
        "click",
        openCart
    );


$("#close-cart")
    .addEventListener(
        "click",
        closeCart
    );


/* =====================================================
   OVERLAY
===================================================== */

$("#overlay")
    .addEventListener(
        "click",
        () => {

            closeCart();


            $$(".modal:not(.hidden)")
                .forEach(
                    modal =>
                        closeModal(
                            modal.id
                        )
                );

        }
    );


/* =====================================================
   MODAL ADD TO CART
===================================================== */

$("#modal-add")
    .addEventListener(
        "click",
        () => {

            const id =
                $("#modal-add")
                    .dataset.id;


            addToCart(id);


            closeModal(
                "product-modal"
            );


            openCart();

        }
    );


/* =====================================================
   CHECKOUT BUTTON
===================================================== */

$("#checkout-btn")
    .addEventListener(
        "click",
        openCheckout
    );


/* =====================================================
   CLEAR CART
===================================================== */

$("#clear-cart")
    .addEventListener(
        "click",
        () => {

            if (
                state.cart.length === 0
            ) {

                showToast(
                    "Your cart is already empty"
                );

                return;
            }


            state.cart = [];


            saveCart();

            renderCart();


            showToast(
                "Cart cleared"
            );

        }
    );


/* =====================================================
   SEARCH
===================================================== */

$("#search-input")
    .addEventListener(
        "input",
        applyFilters
    );


/* =====================================================
   CATEGORY FILTER
===================================================== */

$("#category-filter")
    .addEventListener(
        "change",
        applyFilters
    );


/* =====================================================
   SORT
===================================================== */

$("#sort-products")
    .addEventListener(
        "change",
        applyFilters
    );


/* =====================================================
   MOBILE MENU
===================================================== */

$("#mobile-menu")
    .addEventListener(
        "click",
        () => {

            $("#nav-links")
                .classList.toggle(
                    "open"
                );

        }
    );


$$(".nav-links a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    $("#nav-links")
                        .classList.remove(
                            "open"
                        );

                }
            );

        }
    );


/* =====================================================
   CHECKOUT FORM
===================================================== */

$("#checkout-form")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#customer-name")
                    .value
                    .trim();


            const email =
                $("#customer-email")
                    .value
                    .trim();


            const address =
                $("#customer-address")
                    .value
                    .trim();


            const payment =
                $("#payment-method")
                    .value;


            const order = {

                id:
                    `TV-${Date.now()
                        .toString()
                        .slice(-8)}`,

                name,

                email,

                address,

                payment,

                items:
                    state.cart,

                total:
                    cartTotal(),

                createdAt:
                    new Date()
                        .toISOString()

            };


            /*

                Save order in browser.

                This is demo storage.
                A real store should use
                a backend/database.

            */

            localStorage.setItem(

                `techvault-order-${order.id}`,

                JSON.stringify(order)

            );


            /* CLEAR CART */

            state.cart = [];


            saveCart();

            renderCart();


            /* RESET FORM */

            $("#checkout-form")
                .reset();


            /* CLOSE CHECKOUT */

            closeModal(
                "checkout-modal"
            );


            closeCart();


            /* MESSAGE */

            showToast(
                `Order ${order.id} placed successfully`
            );

        }
    );


/* =====================================================
   CONTACT FORM
===================================================== */

$("#contact-form")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#contact-name")
                    .value
                    .trim();


            const email =
                $("#contact-email")
                    .value
                    .trim();


            const message =
                $("#contact-message")
                    .value
                    .trim();


            const subject =
                encodeURIComponent(
                    `TechVault enquiry from ${name}`
                );


            const body =
                encodeURIComponent(

                    `Name: ${name}\n` +

                    `Email: ${email}\n\n` +

                    message

                );


            /*

                Opens the visitor's
                default email application.

            */

            window.location.href =
                `mailto:support@techvault.com?subject=${subject}&body=${body}`;


            $("#contact-form")
                .reset();

        }
    );


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(
                ".site-header"
            );


        if (
            window.scrollY > 50
        ) {

            header.style.background =
                "#020617";

        } else {

            header.style.background =
                "#0f172a";

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCart();


            $$(".modal:not(.hidden)")
                .forEach(
                    modal =>
                        closeModal(
                            modal.id
                        )
                );

        }

    }
);


/* =====================================================
   INITIALIZE APP
===================================================== */

renderProducts();

renderCart();

console.log(
    "TechVault application loaded successfully."
);