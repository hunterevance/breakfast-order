const menu = [
    { category: "飲料", name: "紅茶", price: 15},
    { category: "飲料", name: "豆漿", price: 15},
    { category: "蛋餅類", name: "起司蛋餅", price: 35},
    { category: "蛋餅類", name: "培根蛋餅", price: 35},
    { category: "吐司類", name: "火腿蛋吐司", price: 35},
    { category: "吐司類", name: "花生吐司", price: 15}
];

let cart = [];
let currentItem = null;

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
                <button onclick='openItemModal(${JSON.stringify(item)})'>加入購物車</button>
            `;
            section.appendChild(div);
        });

        container.appendChild(section);
    }
}

function openItemModal(item) {
    currentItem = item;
    document.getElementById("modalItemName").textContent = item.name;
    document.getElementById("itemQty").value = 1;
    document.getElementById("itemSize").value = "中杯";
    document.getElementById("itemTemp").value = "溫";
    document.getElementById("itemNote").value = "";
    document.getElementById("itemModal").classList.remove("hidden");
}

function closeItemModal() {
    document.getElementById("itemModal").classList.add("hidden");
}

document.getElementById("confirmAddBtn").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("itemQty").value);
    const size = document.getElementById("itemSize").value;
    const temp = document.getElementById("itemTemp").value;
    const note = document.getElementById("itemNote").value;

    cart.push({
        name: currentItem.name,
        price: currentItem.price,
        qty,
        options: { size, temperature: temp, note }
    });

    closeItemModal();
    renderCart();
});

document.getElementById("cancelBtn").addEventListener("click", closeItemModal);

function renderCart() {
    const ul = document.getElementById("cartItems");
    ul.innerHTML = " ";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} = $${item.price * item.qty}`;
        if (item.options) {
            li.textContent += ` (${item.options.size}, ${item.options.temperature}${item.options.note ? ", 備註: " + item.options.note : ""})`;
        }
        ul.appendChild(li);
        total += item.price * item.qty;
    });

    document.getElementById("totalAmount").textContent = total;
}

function checkout() {
    alert("訂單已送出!謝謝您的點餐");
    cart = [];
    renderCart();
    document.getElementById("cartPanel").classList.remove("open");
}

const toggleCartBtn = document.getElementById("toggleCartBtn");
const cartPanel = document.getElementById("cartPanel");

cartPanel.classList.remove("open");

toggleCartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cartPanel.classList.toggle("open");
});

cartPanel.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", () => {
    cartPanel.classList.remove("open");
});

renderMenu();
