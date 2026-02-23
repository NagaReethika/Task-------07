const userDetails = document.getElementById("userDetails");
const errorMessage = document.getElementById("errorMessage");

const API_URL = "https://jsonplaceholder.typicode.com/users/";

// Get user ID from URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

async function fetchUser() {
    try {
        userDetails.innerHTML = "<p>Loading user details...</p>";

        const response = await fetch(API_URL + userId);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();

        userDetails.innerHTML = `
            <div class="user-card">
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>Address:</strong> 
                    ${user.address.street}, 
                    ${user.address.suite}, 
                    ${user.address.city}, 
                    ${user.address.zipcode}
                </p>
            </div>
        `;

    } catch (error) {
        userDetails.innerHTML = "";
        errorMessage.textContent = "⚠ Unable to load user details.";
        console.error(error);
    }
}

function goBack() {
    window.location.href = "index.html";
}

fetchUser();