export async function getArticles() {
    const res = await fetch('http://localhost:8000/get')
    const body = await res.json()
    return body.articles
}