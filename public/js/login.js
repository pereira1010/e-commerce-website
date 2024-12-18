document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission until validation passes

    const userRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation
    const passRegex = /^[a-zA-Z0-9!@#$%^&*+-]{6,}$/; // Password: At least 6 characters

    let username = document.forms['loginForm'].elements['username'].value.trim();
    let password = document.forms['loginForm'].elements['password'].value.trim();

    let output = document.getElementById('output');

    // Validation Checks
    if (!username || !password) {
        output.innerHTML = "Both fields are required.";
        return;
    }

    if (!userRegex.test(username)) {
        output.innerHTML = "Invalid email format.";
        return;
    }

    if (!passRegex.test(password)) {
        output.innerHTML = "Password must be at least 6 characters and contain only allowed characters.";
        return;
    }

    // Send credentials to the server
    loginUser(username, password);
});

// Function to send credentials to the server
async function loginUser(username, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('output').innerHTML = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "/"; // Redirect after login
            }, 1000);
        } else {
            document.getElementById('output').innerHTML = result.message || "Login failed.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = "An error occurred. Please try again.";
    }
}

//logic to check the server response and redirect to the homepage.
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const username = document.forms['loginForm'].elements['username'].value.trim();
    const password = document.forms['loginForm'].elements['password'].value.trim();
    const output = document.getElementById('output');

    // Send the credentials to the server
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            output.innerHTML = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "/"; // Redirect to the homepage
            }, 1000);
        } else {
            output.innerHTML = result.message || "Invalid username or password.";
        }
    } catch (error) {
        console.error("Error:", error);
        output.innerHTML = "An error occurred. Please try again.";
    }
});