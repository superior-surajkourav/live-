// // Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Check if the user is logged in and load their feed
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        const feedRef = firebase.firestore().collection('feed').doc(userId);
        
        // Load user posts
        feedRef.get().then((doc) => {
            if (doc.exists) {
                const posts = doc.data().posts;
                const feedContainer = document.getElementById('feed');
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `<h3>${post.username}</h3><p>${post.content}</p>`;
                    feedContainer.appendChild(postElement);
                });
            }
        });
    } else {
        window.location.href = 'index.html';  // Redirect to login if not logged in
    }
});

// Posting a new post
document.getElementById('post-button').addEventListener('click', () => {
    const postText = document.getElementById('post-text').value;
    const user = firebase.auth().currentUser;

    if (user && postText.trim() !== '') {
        const userId = user.uid;
        const feedRef = firebase.firestore().collection('feed').doc(userId);

        feedRef.update({
            posts: firebase.firestore.FieldValue.arrayUnion({
                username: user.displayName || user.email,
                content: postText
            })
        }).then(() => {
            alert('Post added!');
            window.location.reload(); // Reload to show new post
        }).catch((error) => {
            console.error('Error posting feed: ', error);
        });
    } else {
        alert('Please log in to post');
    }
});

document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const postContent = document.getElementById('post-content').value; // Get the post content
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid;
        const email = user.email;

        console.log("Posting as:", email);
        console.log("Post content:", postContent);

        // Add post to the Firestore feed collection
        const feedDocRef = firebase.firestore().collection('feed').doc(userId);
        
        await feedDocRef.update({
            posts: firebase.firestore.FieldValue.arrayUnion({
                content: postContent,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        });

        // Clear the textarea after posting
        document.getElementById('post-content').value = '';
        alert("Post successfully added!");
    } else {
        console.log("No user logged in.");
    }
});
// Fetch and display posts from Firestore
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;
        console.log("Logged in as: ", userId);

        // Fetch posts for the current user
        const feedDocRef = firebase.firestore().collection('feed').doc(userId);
        feedDocRef.onSnapshot(doc => {
            if (doc.exists) {
                const feedData = doc.data();
                const posts = feedData.posts || [];
                const feedContainer = document.querySelector('.feed');
                feedContainer.innerHTML = ''; // Clear existing posts

                // Display each post in the feed
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('post');
                    postDiv.innerHTML = `
                        <p>${post.content}</p>
                        <small>${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
                    `;
                    feedContainer.appendChild(postDiv);
                });
            }
        });
    } else {
        console.log("No user logged in.");
    }
});
