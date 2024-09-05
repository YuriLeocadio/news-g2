const API_KEY = 'de24841025994b858d5cb939a61393a3';
const DB_KEY = '@news.g2'

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`https://newsapi.org/v2/everything?q=keyword&apiKey=${API_KEY}`).then(response => console.log(response.data))
    .catch(err => console.log(err))
});

function saveRepositoryInfo(repository) {
    localStorage.setItem(DB_KEY, JSON.stringify(repository));
}