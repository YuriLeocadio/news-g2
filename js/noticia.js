const main = document.querySelector('.main-notice')
const API_KEY = '40085e6fca1c42a1a10bc6ee22fc0751';
const DB_KEY = '@news.g2'
const DB_FAVORITES_KEY = '@news.favorites';
const baseUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=4&language=pt`

let topics = [
    'entertainment',
    'general',
    'sports',
    'politics',
    'technology',
    'health',
    'science'
];
let index = 0;

document.addEventListener('DOMContentLoaded', () => {
    let sortedTopic = shuffleArray(topics)[index]

    axios.get(`${baseUrl}&q=${sortedTopic}&sortBy=relevancy`).then(response => {
        console.log(response.data.articles)
        const artigosRecomends = response.data.articles
        createRecomendsTopics(artigosRecomends)
    })
        .catch(err => {
            console.error("Erro ao carregar artigos recomendados:", err)
        })
})

if (window.location.pathname.includes('noticia.html')) {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
        const notice = JSON.parse(storage);

        document.querySelector('.notice-title').textContent = notice.title || 'Sem título'
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
        document.querySelector('.site').textContent = 'Site original da notícia: '
        document.querySelector('.url').href = notice.url
        document.querySelector('.url').target = '_blank'
        document.querySelector('.url').textContent = notice.url
        document.querySelector('.texto').textContent = notice.content
    }
}

function createRecomendsTopics(articles) {
    const favorites = JSON.parse(localStorage.getItem(DB_FAVORITES_KEY)) || [];

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

        const iconBookmark = document.createElement('i');
        iconBookmark.className = 'far fa-bookmark';
        if (favorites.some(fav => fav.title === article.title)) {
            iconBookmark.className = 'fas fa-bookmark';
        }
        iconBookmark.onclick = () => {
            saveFavorite(article, iconBookmark);
        };

        const showMore = document.createElement('a')
        showMore.className = 'show-more'
        showMore.href = '../noticia.html'
        showMore.onclick = () => {
            saveNoticeInfo(article);
        }
        showMore.textContent = 'Ver mais...'

        divIcons.appendChild(iconBookmark)
        divIcons.appendChild(showMore)

        divCard.appendChild(img)
        divCard.appendChild(h4)
        divCard.appendChild(divIcons)

        divContainer.appendChild(divCard)
    });
}

function saveNoticeInfo(article) {
    localStorage.setItem(DB_KEY, JSON.stringify(article));
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
    return preShuffleArray;
}

function saveFavorite(article, iconBookmark) {
    let favorites = JSON.parse(localStorage.getItem(DB_FAVORITES_KEY)) || [];
    const isFavorite = favorites.some(fav => fav.title === article.title);

    if (isFavorite) {
        favorites = favorites.filter(fav => fav.title !== article.title);
        iconBookmark.className = 'far fa-bookmark'
    } else {
        favorites.push(article);
        iconBookmark.className = 'fas fa-bookmark'
    }

    localStorage.setItem(DB_FAVORITES_KEY, JSON.stringify(favorites));
}