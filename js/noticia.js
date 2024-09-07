const main = document.querySelector('.main-notice')
const API_KEY = 'daed6cb259cf49098d7cb037da993b31';
const DB_KEY = '@news.g2'
const baseUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=4&language=pt`

let topics = [
    'general',
    'sports',
    'politics',
    'technology',
    'health',
    'science',
    'entertainment'
];
let index = 0;

document.addEventListener('DOMContentLoaded', () => {

    let sortedTopic = shuffleArray(topics)

    axios.get(`${baseUrl}&q=${sortedTopic}&sortBy=relevancy`).then(response => {
        console.log(response.data.articles)
        const artigosRecomends = response.data.articles
        createRecomendsTopics(artigosRecomends)
    })
        .catch(err => console.log(err))
})

if (window.location.pathname.includes('noticia.html')) {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
        const notice = JSON.parse(storage);

        document.querySelector('.notice-title').textContent = notice.title
        document.querySelector('.primeira-imagem').src = notice.urlToImage

        const dateTrending = new Date(notice.publishedAt);
        const formattedDate = dateTrending.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.querySelector('.date-notice').textContent = formattedDate

        document.querySelector('.author').textContent = notice.author || 'Sem autor'
        document.querySelector('.notice-content').textContent = notice.description || 'Sem descrição'
        document.querySelector('.texto').textContent = notice.content
    }
}

function createRecomendsTopics(articles) {
    const divContainer = document.querySelector('.card-container')
    divContainer.innerHTML = ''

    articles.forEach(article => {
        const divCard = document.createElement('div')
        divCard.className = 'card'

        const img = document.createElement('img')
        img.className = 'card-image'
        img.src = article.urlToImage
        img.alt = 'Capa da noticia'

        const h4 = document.createElement('h4')
        h4.className = 'card-title'
        h4.textContent = article.title

        const divIcons = document.createElement('div')
        divIcons.className = 'card-actions'

        const iconHeart = document.createElement('i')
        iconHeart.className = 'far fa-heart'

        const iconBookmark = document.createElement('i')
        iconBookmark.className = 'far fa-bookmark'

        divIcons.appendChild(iconHeart)
        divIcons.appendChild(iconBookmark)

        divCard.appendChild(img)
        divCard.appendChild(h4)
        divCard.appendChild(divIcons)

        divContainer.appendChild(divCard)
    });
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

createRecomendsTopics();