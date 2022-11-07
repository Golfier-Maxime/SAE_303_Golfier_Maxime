export const getVillageois = () => {
    let rq = "https://jsongaulois.jmfino.fr/listeVillageois.php"
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
