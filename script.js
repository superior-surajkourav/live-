document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
    };

    console.log("Sending user data to backend:", userData);  // Debugging line

    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();
    console.log("Backend response:", result);  // Debugging line

    if (result.message === 'User registered successfully!') {
        // Redirect the user to the feed page after successful signup
        window.location.href = 'feed.html';  // Redirect to feed.html
    } else {
        alert('Something went wrong!');
    }
});

