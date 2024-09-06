const API_KEY = 'de24841025994b858d5cb939a61393a3';
const DB_KEY = '@news.g2'
let topics = 'keyword'
let urlApi = `https://newsapi.org/v2/everything?q=${topics}&apiKey=${API_KEY}&pageSize=6&language=pt&country=br`

document.addEventListener('DOMContentLoaded', () => {
    createTopic(topics)
});

function createTopic(topic) {
    topics = topic
    urlApi = `https://newsapi.org/v2/everything?q=${topics}&apiKey=${API_KEY}&pageSize=6&language=pt`

    axios.get(urlApi).then(response => {
        console.log(response.data.articles)
        const jornal = response.data.articles
        saveRepositoryInfo(jornal)
    })
        .catch(err => console.log(err))
}

function saveRepositoryInfo(articles) {
    localStorage.setItem(DB_KEY, JSON.stringify(articles));

    const ul = document.querySelector('.cards');
    ul.innerHTML = '';

    articles.forEach(article => {
        const li = document.createElement('li');

        const cardDivContainer = document.createElement('div')
        cardDivContainer.className = 'notice-card'

        const header = document.createElement('header')
        header.className = 'header-card'

        const img = document.createElement('img')
        img.className = 'notice-img'
        img.src = article.urlToImage
        img.alt = 'capa da notícia'

        const divCardMain = document.createElement('div')
        divCardMain.className = 'main-card'

        const h3 = document.createElement('h3')
        h3.className = 'notice-title'
        h3.textContent = article.title

        const p = document.createElement('p')
        p.className = 'notice-description'
        p.textContent = article.description.substring(0, 100) + '...' || 'Sem descrição'

        const divNoticeDetails = document.createElement('div')
        divNoticeDetails.className = 'notice-details'

        const spanHour = document.createElement('span')
        spanHour.className = 'notice-hour'

        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        spanHour.textContent = formattedDate

        const spanAuthor = document.createElement('span')
        spanAuthor.className = 'notice-author'
        spanAuthor.textContent = article.author || 'Sem autor'

        const footerCard = document.createElement('footer')
        footerCard.className = 'footer-card'

        const iconHeart = document.createElement('i')
        iconHeart.className = 'far fa-heart'

        const iconBookmark = document.createElement('i')
        iconBookmark.className = 'far fa-bookmark'


        divNoticeDetails.appendChild(spanHour)
        divNoticeDetails.appendChild(spanAuthor)

        footerCard.appendChild(iconHeart)
        footerCard.appendChild(iconBookmark)

        divCardMain.appendChild(h3)
        divCardMain.appendChild(p)
        divCardMain.appendChild(divNoticeDetails)

        header.appendChild(img)

        cardDivContainer.appendChild(header)
        cardDivContainer.appendChild(divCardMain)
        cardDivContainer.appendChild(footerCard)

        li.appendChild(cardDivContainer)

        ul.appendChild(li)

    });
}


saveRepositoryInfo();