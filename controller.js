const { sanity } = require("./sanity")



const getCategories = async () => {
    const query = '*[_type == "categorie"]'

    return await sanity.fetch(query).then((cats) => {
        console.log('Catergories trouvées : ', cats.length)
        return cats
    }).catch((err) => {
        console.log('Erreur de fetching categories')
        return undefined
    })
}


const fetchData = async ({query,filter}) => {
    return await sanity.fetch(query).then((result) => {
        console.log(query, result.length)
        return filter?filter(result):result 
    }).catch((err) => {
        console.log('Erreur de fetching')
        return undefined
    })
}

module.exports={getCategories,fetchData}
