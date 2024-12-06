// // Initialize Firebase (already done in your project)
// const userId = "user123";  // Replace this with actual userId after user login/signup

// firebase.firestore().collection('profiles').doc(userId).get()
//     .then(doc => {
//         if (doc.exists) {
//             // Display user profile information
//             document.getElementById('username').innerText = doc.data().username;
//             document.getElementById('email').innerText = doc.data().email;
//             document.getElementById('phone').innerText = doc.data().phone;
//             document.getElementById('about').innerText = doc.data().about;

//             // If the user has a profile picture
//             if (doc.data().profilePicture) {
//                 document.getElementById('profile-image').src = doc.data().profilePicture;
//             }
//         } else {
//             console.log("No profile found");
//         }
//     })
//     .catch(error => {
//         console.error("Error getting document:", error);
//     });
// Fetch the current user ID (assuming user is logged in)
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;
        console.log("Logged in as: ", userId);

        // Fetch user profile data from Firestore
        const userDocRef = firebase.firestore().collection('users').doc(userId);
        userDocRef.get().then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                // Populate profile fields
                document.getElementById('username').innerText = `Username: ${userData.username}`;
                document.getElementById('email').innerText = `Email: ${userData.email}`;
                document.getElementById('phone').innerText = `Phone: ${userData.phone}`;
                // Add more fields as needed
            } else {
                console.log("No such user!");
            }
        }).catch(error => {
            console.log("Error getting user document:", error);
        });
    } else {
        console.log("No user logged in.");
    }
});
