let articleSection = document.querySelector('.article-section');
let articleElement = (articleTitle, articleContent) => 
`
<div class="article-preview">
    <h3 class="article-title">${articleTitle}</h3>
    <hr>
    <div class="article-content">
        <h4>${articleContent.slice(0, 40)}...</h4>
    </div>
</div>
`

const updatePostPreviews = (posts) => {
    articleSection.innerHTML = "";
    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
        let title = posts[i].title;
        let content = posts[i].content;
        articleSection.innerHTML += articleElement( title, content ); 
    }
}

// This fetch request will return a stream of information that contains the posts that we want,
// once that data is converted to Javascript Objects, it will return an array of Posts that 
/*
    {
        userId: #,
        id: #,
        title: some-text,
        body: some-content
    }
 */
// All we're going to do, is get the first five posts in this array of objects
// and display them on the webpage.


// window.onload tells the website to perform the callback function everytime the webpage is visited or refreshed.
window.onload = (e) => {
    let posts = [];
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json()) // Converts the posts that are received into javascript Objects.
        .then(postsAsJson => {
            // Making a fetch request to 'https://jsonplaceholder.typicode.com/posts' returns
            // 100 posts, that's too much so we just get 5 posts instead.
            for (let i = 0; i < 5; i++) {
                // The 'post' objects have to much info in them that I don't need
                // So here I only take what's necessary for my purposes (The Title and Body of each post).

                let post = postsAsJson[i];
                let title = post.title;
                let content = post.body;

                posts.push({title, content});
            }})
        .catch(err => console.log(err.message)) // In case there is an error, just print it out to the console.
        .finally(() => updatePostPreviews(posts)); // After all of that work is done, I want it to make sure it updates the post previews!
};