const numOfPostsToCollect = 5; // Change this to have the webpage display more or less than 5 pages.

let postsDiv = document.getElementById('posts');

const updatePostPreviews = (posts) => {
    for (let i = 0; i < posts.length; i++) {
        let title = posts[i].title;
        let content = posts[i].content;

        let newPost = 
        `
        <div class="post">
            <h3>${title}</h3>
            <hr>
            <p>${content}</p>
        </div>
        ` 

        postsDiv.innerHTML += newPost; 
    }
}

let posts = [];

// Throws 5 of the 100 posts received, into the 'posts' array.
const collectPosts = (postsAsJson) => {
    for (let i = 0; i < numOfPostsToCollect; i++) {
        let post = postsAsJson[i];
        let title = post.title;
        let content = post.body;

        posts.push({title, content});
    };
};

const fetchPosts = () => 
{
    postsDiv.innerHTML = '';
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json()) // First convert the promise data to javascript object (i.e. '{}')
        .then(postsAsJson => collectPosts(postsAsJson)) // From the converted data, collect 5 posts.
        .then(() => updatePostPreviews(posts)) // After collecting 5 posts, display them on the webpage.
        .catch(err => console.log(err.message)) // If there are any errors, display them to the console.
}