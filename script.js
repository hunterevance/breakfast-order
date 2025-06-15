const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartPanel = document.getElementById("cartPanel");
const toggleCartBtn = document.getElementById("toggleCartBtn");

let cart = [];

const products = [
    { name: "紅茶", price: 15, category: "飲料", options: ["大小", "溫度"] },
    { name: "豆漿", price: 15, category: "飲料", options: ["大小", "溫度"] },
    { name: "起司蛋餅", price: 35, category: "蛋餅類", Option: ["加辣"] },
    { name: "培根蛋餅", price: 35, category: "蛋餅類", Option: ["加辣"] },
    { name: "火腿蛋吐司", price: 35, category: "吐司類" },
    { name: "花生吐司", price: 15, category: "吐司類" }
];

function renderMenu() {
    menu.innerHTML = " ";
    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;
        
        const quantity = document.createElement("input");
        quantity.type = "number";
        quantity.min = 1;
        quantity.value =1;

        const remark = document.createElement("input")
        remark.placeholder = "備註";

        const addBtn = document.createElement("button");
        addBtn.textContent = "加入購物車";
        addBtn.onclick = () => {
            let item = {
                name: product.name,
                price: product.price,
                quantity: parseInt(quantity.value),
                options: {}
            };

            if (products.options) {
                products.options.forEach(opt =>{
                    const select = card.querySelector(`[data-opt='${opt}']`);
                    if (select) item.options[opt] = select.value;
                });
            }

            cart.push(item);
            updateCart();
        };

        card.appendChild(title);
        card.appendChild(price);

        // 顯示選項
        if (product.options) {
            product.options.forEach(opt => {
                const select = document.createElement("select");
                select.setAttribute("data-opt", opt);
                let opts = [];

                if (opt === "加辣") opts = ["不加辣", "加辣"];
                if (opt === "大小") opts = ["小杯", "大杯"];
                if (opt === "溫度") opts = ["冰", "熱"];

                opts.forEach(val => {
                    const option = document.createElement("option");
                    option.value = val;
                    option.textContent = val;
                    select.appendChild(option);
                });

                card.appendChild(select);
            });
        }

        card.appendChild(quantity);
        card.appendChild(remark);
        card.appendChild(addBtn);

        menu.appendChild(card);
    });
}

function updateCart() {
    cartItems.innerHTML = " ";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        const optionsStr = Object.entries(item.options).map(([K, v]) => `${k}:${v}`).join(", ");
        li. textContent = `${item.name} x${item.quantity} $${item.price * item.quantity} ${item.remark}`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };

        li.appendChild(delBtn);
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
}

toggleCartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
});

renderMenu();