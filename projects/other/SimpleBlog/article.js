const articles = [
    {
        title: "The Many Varieties of Rocks",
        content:
            `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto id dolore quam, debitis dolorum doloribus minima deserunt! Atque quibusdam asperiores dolore voluptates, excepturi molestias corrupti iste reprehenderit, maxime, a quisquam!
                Incidunt laboriosam illo, voluptas voluptatem rem consectetur cum excepturi. Ducimus dolor voluptatum placeat provident odit consequatur quis impedit maxime eos quos repellat, dicta vel earum aliquid consequuntur corporis quod beatae?
                Voluptatibus rerum facilis, molestias excepturi minus harum voluptatum sed! Minus quidem eius voluptas molestiae! Molestiae laborum consequuntur odio magnam a. Necessitatibus aperiam, dignissimos officia non iste sint reiciendis fugit quasi.</p>
            <br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto id dolore quam, debitis dolorum doloribus minima deserunt! Atque quibusdam asperiores dolore voluptates, excepturi molestias corrupti iste reprehenderit, maxime, a quisquam!
                Incidunt laboriosam illo, voluptas voluptatem rem consectetur cum excepturi. Ducimus dolor voluptatum placeat provident odit consequatur quis impedit maxime eos quos repellat, dicta vel earum aliquid consequuntur corporis quod beatae?
                Voluptatibus rerum facilis, molestias excepturi minus harum voluptatum sed! Minus quidem eius voluptas molestiae! Molestiae laborum consequuntur odio magnam a. Necessitatibus aperiam, dignissimos officia non iste sint reiciendis fugit quasi.</p>   
            `
    },
    {
        title: "Invisible Winter",
        content:
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto id dolore quam, debitis dolorum doloribus minima deserunt! Atque quibusdam asperiores dolore voluptates, excepturi molestias corrupti iste reprehenderit, maxime, a quisquam!
                Incidunt laboriosam illo, voluptas voluptatem rem consectetur cum excepturi. Ducimus dolor voluptatum placeat provident odit consequatur quis impedit maxime eos quos repellat, dicta vel earum aliquid consequuntur corporis quod beatae?
                Voluptatibus rerum facilis, molestias excepturi minus harum voluptatum sed! Minus quidem eius voluptas molestiae! Molestiae laborum consequuntur odio magnam a. Necessitatibus aperiam, dignissimos officia non iste sint reiciendis fugit quasi.
            `
    },
    {
        title: "The Silent Name",
        content:
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto id dolore quam, debitis dolorum doloribus minima deserunt! Atque quibusdam asperiores dolore voluptates, excepturi molestias corrupti iste reprehenderit, maxime, a quisquam!
                Incidunt laboriosam illo, voluptas voluptatem rem consectetur cum excepturi. Ducimus dolor voluptatum placeat provident odit consequatur quis impedit maxime eos quos repellat, dicta vel earum aliquid consequuntur corporis quod beatae?
                Voluptatibus rerum facilis, molestias excepturi minus harum voluptatum sed! Minus quidem eius voluptas molestiae! Molestiae laborum consequuntur odio magnam a. Necessitatibus aperiam, dignissimos officia non iste sint reiciendis fugit quasi.
            `
    }
];

let articleSection = document.querySelector('.article-section');

let articleTemplate = (article_title, article_content) => `
        <div class="article-full">
            <h3 class="article-title">${article_title}</h3>
            <hr>
            <div class="article-content-full">
                ${ article_content }
            </div>
        </div>
`

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

window.onload = (e) => {
    let article = articles[params.article_id];

    articleSection.innerHTML = articleTemplate(article.title, article.content);
}