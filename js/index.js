const API_KEY = '11f27ecf034d4f5797e83e6ab372b94b';
const DB_KEY = '@news.g2'
const baseUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=6&language=pt`

document.addEventListener('DOMContentLoaded', (event) => {
    createTopic(event, undefined);
    createTreding();
});

function createTopic(event, searchTopic) {
    event.preventDefault();

    const sortByDefault = 'publishedAt'
    const defaultTopic = 'business'
    const topic = searchTopic || defaultTopic

    axios.get(`${baseUrl}&q=${topic}&sortBy=${sortByDefault}`).then(response => {
        console.log(response.data.articles)
        const artigos = response.data.articles
        createCardsNotice(artigos)
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
        spanTrending.textContent = 'tendência'

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
        trendingDescription.textContent = articleTrending.description.substring(0,150) + '...' || 'Sem descrição'

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

        const trendingShowMore = document.createElement('a')
        trendingShowMore.className = 'show-more'
        trendingShowMore.textContent = 'Ver mais...'

        trendingFooter.appendChild(trendingDate)
        trendingFooter.appendChild(trendingAuthor)
        trendingFooter.appendChild(trendingShowMore)

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

createTredingNotice();
createCardsNotice();