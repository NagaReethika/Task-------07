const userContainer = document.getElementById("userContainer");
const errorMessage = document.getElementById("errorMessage");
const reloadBtn = document.getElementById("reloadBtn");

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers() {
    try {
        userContainer.innerHTML = "<p>Loading users...</p>";
        if (errorMessage) errorMessage.textContent = "";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const users = await response.json();

        userContainer.innerHTML = "";

        users.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("user-card");

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            `;

            userContainer.appendChild(card);
        });

    } catch (error) {
        userContainer.innerHTML = "";
        if (errorMessage) {
            errorMessage.textContent =
                "⚠ Unable to load data. Please check your internet connection.";
        }
        console.error(error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if (userContainer) {
        fetchUsers();
    }
});

if (reloadBtn) {
    reloadBtn.addEventListener("click", fetchUsers);
}