const API_KEY = 'daed6cb259cf49098d7cb037da993b31';
const DB_KEY = '@news.g2'
const baseUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=6&language=pt`

document.addEventListener('DOMContentLoaded', (event) => {
    createTreding();
    createBreakingNews();
    createTopicCard(event, undefined);
});

function createTopicTrending(event, searchTopicTrending) {
    event.preventDefault();

    const sortByDefaultTrending = 'popularity'
    const defaultTopicTrending = 'general'
    const topicTrending = searchTopicTrending || defaultTopicTrending

    axios.get(`${baseUrl}&q=${topicTrending}&sortBy=${sortByDefaultTrending}`).then(response => {
        console.log(response.data.articles)
        const artigosTrending = response.data.articles
        createTredingNotice(artigosTrending)
    })
        .catch(err => console.log(err))
}

function createTreding() {
    const defaultTopicTrending = 'general'

    axios.get(`${baseUrl}&q=${defaultTopicTrending}&sortBy=popularity`).then(response => {
        console.log(response.data.articles)
        const artigoTrending = response.data.articles
        createTredingNotice(artigoTrending)
    })
        .catch(err => console.log(err))
}

function createBreakingNews() {
    const defaultTopicBreakingNews = 'general'

    axios.get(`${baseUrl}&q=${defaultTopicBreakingNews}&sortBy=publishedAt`).then(response => {
        console.log(response.data.articles)
        const artigoBreaking = response.data.articles
        createBreakingNewsNotice(artigoBreaking)
    })
        .catch(err => console.log(err))
}

function createTopicCard(event, searchTopicCard) {
    event.preventDefault();

    const sortByDefault = 'publishedAt'
    const defaultTopicCard = 'business'
    const topic = searchTopicCard || defaultTopicCard

    axios.get(`${baseUrl}&q=${topic}&sortBy=${sortByDefault}`).then(response => {
        console.log(response.data.articles)
        const artigos = response.data.articles
        createCardsNotice(artigos)
    })
        .catch(err => console.log(err))
}

function createTredingNotice(articles) {
    localStorage.setItem(DB_KEY, JSON.stringify(articles));

    const section = document.querySelector('.trending')
    section.innerHTML = ''

    const articleTrending = articles[1]

    const img = document.createElement('img')
    img.className = 'img-trending'
    img.src = articleTrending.urlToImage
    img.alt = 'capa do artigo trending'

    const divTrendingText = document.createElement('div')
    divTrendingText.className = 'trending-text'

    const headerTrending = document.createElement('header')
    headerTrending.className = 'fav'

    const spanTrending = document.createElement('span')
    spanTrending.className = 'fav-span'
    spanTrending.textContent = 'Tendência'

    const divTrendingIcon = document.createElement('div')
    divTrendingIcon.className = 'fav-item'

    const iconHeartTrending = document.createElement('i')
    iconHeartTrending.className = 'far fa-heart'

    const iconBookmarkTrending = document.createElement('i')
    iconBookmarkTrending.className = 'far fa-bookmark'

    const trendingTitle = document.createElement('h1')
    trendingTitle.className = 'treding-title'
    trendingTitle.textContent = articleTrending.title

    const trendingDescription = document.createElement('p')
    trendingDescription.className = 'trending-description'
    trendingDescription.textContent = articleTrending.description.substring(0, 150) + '...' || 'Sem descrição'

    const trendingFooter = document.createElement('footer')
    trendingFooter.className = 'trending-foot'

    const trendingDate = document.createElement('span')
    trendingDate.className = 'trending-date'

    const dateTrending = new Date(articleTrending.publishedAt);
    const formattedDateTrending = dateTrending.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    trendingDate.textContent = formattedDateTrending

    const trendingAuthor = document.createElement('span')
    trendingAuthor.className = 'trending-author'
    trendingAuthor.textContent = articleTrending.author || 'Sem autor'

    const showMore = document.createElement('a')
    showMore.className = 'show-more'
    showMore.href = '../noticia.html'
    showMore.onclick = () => {
        saveNoticeInfo(articleTrending);
    }
    showMore.textContent = 'Ver mais...'

    trendingFooter.appendChild(trendingDate)
    trendingFooter.appendChild(trendingAuthor)
    trendingFooter.appendChild(showMore)

    divTrendingIcon.appendChild(iconHeartTrending)
    divTrendingIcon.appendChild(iconBookmarkTrending)

    headerTrending.appendChild(spanTrending)
    headerTrending.appendChild(divTrendingIcon)

    divTrendingText.appendChild(headerTrending)
    divTrendingText.appendChild(trendingTitle)
    divTrendingText.appendChild(trendingDescription)
    divTrendingText.appendChild(trendingFooter)

    section.appendChild(img)
    section.appendChild(divTrendingText)
}

function createBreakingNewsNotice(articles) {
    localStorage.setItem(DB_KEY, JSON.stringify(articles));

    const divBreakingNews = document.querySelector('.red-box')
    divBreakingNews.innerHTML = '';

    const articleBreakingNews = articles[0]

    const divWhite = document.createElement('div')
    divWhite.className = 'white-box'

    const breakingNewsText = document.createElement('h1')
    breakingNewsText.className = 'breaking-news-text'
    breakingNewsText.textContent = 'Breaking News'

    const divRed = document.createElement('div')
    divRed.className = 'red-text'

    const breakingNewsTitle = document.createElement('p')
    breakingNewsTitle.className = 'breaking-news-title'
    breakingNewsTitle.textContent = articleBreakingNews.title

    divWhite.appendChild(breakingNewsText)
    divRed.appendChild(breakingNewsTitle)

    divBreakingNews.appendChild(divWhite)
    divBreakingNews.appendChild(divRed)
}

function createCardsNotice(articles) {
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

        const spanDate = document.createElement('span')
        spanDate.className = 'notice-date'

        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        spanDate.textContent = formattedDate

        const spanAuthor = document.createElement('span')
        spanAuthor.className = 'notice-author'
        spanAuthor.textContent = article.author || 'Sem autor'

        const showMore = document.createElement('a')
        showMore.className = 'show-more'
        showMore.href = '../noticia.html'
        showMore.onclick = () => {
            saveNoticeInfo(article);
        }
        showMore.textContent = 'Ver mais...'

        const footerCard = document.createElement('footer')
        footerCard.className = 'footer-card'

        const iconHeart = document.createElement('i')
        iconHeart.className = 'far fa-heart'

        const iconBookmark = document.createElement('i')
        iconBookmark.className = 'far fa-bookmark'


        divNoticeDetails.appendChild(spanDate)
        divNoticeDetails.appendChild(spanAuthor)
        divNoticeDetails.appendChild(showMore)

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

function saveNoticeInfo(article) {
    localStorage.setItem(DB_KEY, JSON.stringify(article));
}

createTredingNotice();
createBreakingNewsNotice();
createCardsNotice();