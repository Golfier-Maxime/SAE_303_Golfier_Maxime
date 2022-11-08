export const getDatas = () => {
    let rq = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=frequentation-des-musees-de-france&q=&rows=1000"
    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

