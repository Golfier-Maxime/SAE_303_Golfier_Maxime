export const getDatas = () => {
    let rq = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=frequentation-des-musees-de-france&q=&rows=1000"
    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

export const getVideos = () => {
    let rq = "https://jsonvideo.jmfino.fr/listeVideo.php"
    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

export const getGares = (dep) => {
    let rq = 'https://ressources.data.sncf.com/api/records/1.0/search/'
        + "?dataset=liste-des-gares"
        + "&q=departemen=" + dep
        + "&rows=100"
        + "&lang=FR"
        + "&facet=voyageurs"

    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}
