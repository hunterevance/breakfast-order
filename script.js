const menu = [
    { category: "飲料", name: "紅茶", price: 15},
    { category: "飲料", name: "豆漿", price: 15},
    { category: "蛋餅類", name: "起司蛋餅", price: 35},
    { category: "蛋餅類", name: "培根蛋餅", price: 35},
    { category: "吐司類", name: "火腿蛋吐司", price: 35},
    { category: "吐司類", name: "花生吐司", price: 15}
];

let cart = [];

function renderMenu() {
    const container = document.getElementById("menu-container");
    container.innerHTML = " ";

    const grouped = menu.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    for (const category in grouped) {
        const section = document.createElement("section");
        const heading = document.createElement("h2");
        heading.textContent = category;
        section.appendChild(heading);

        grouped[category].forEach(item => {
            const div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">加入購物車</button>
            `;
            section.appendChild(div);
        });

        container.appendChild(section);
    }
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    renderCart();
}

function renderCart() {
    const ul = document.getElementById("cart-items");
    ul.innerHTML = " ";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} = $${item.price * item.qty}`;
        ul.appendChild(li);
        total += item.price * item.qty;
    });

    document.getElementById("totalAmount").textContent = `總金額: $${total}`;
}

function checkout() {
    alert("訂單已送出!謝謝您的點餐");
    cart = [];
    renderCart();
}

renderMenu();

const toggleCartBtn = document.getElementById("toggleCartBtn");
const cartPanel = document.getElementById("cartPanel");

// 初始狀態關閉購物車
cartPanel.classList.remove("open");

toggleCartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
});