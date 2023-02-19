//All requests made to the AniList GraphQL API 
//must be made as a POST request to 'https://graphql.anilist.co'.
//testing GraphQL https://anilist.co/graphiql
const api = {
    
    getTrailer: async (req, res) => {
        const AniSearch = require('./AniSearch')
        try{
            const user = req.user

            const data = await AniSearch.findTrending(user.likes, user.notLikes)
            if(data.isError) return res.status(500).json('Error retrieving data from Animes Databases')
            return res.status(200).json(data)
        }catch(err){
            console.log('err api getTrailer:',err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
        
    },
    checkUser : (req, res) => {
        if(req.isAuthenticated()) return res.status(200).json(true)
        return res.status(200).json(false)
    },
    rec: async (req, res) => {
        const AniSearch = require('./AniSearch')
        try{
            const data = await AniSearch.findRecommends(269)
            if(data.isError) return res.status(500).json('Error retrieving data from Animes Databases')
            return res.status(200).json(data)
        }catch(err){
            console.log('err api rec:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
        
    },
    trending: async(req, res) => {
        const AniSearch = require('./AniSearch')
        try{
            const user = req.user
            const data = await AniSearch.findTrending(user.likes, user.notLikes)
            if(data.isError === true) return res.status(500).json('Error retrieving data from Animes Databases')

            return res.status(200).json(data)
        }catch(err){
            console.log('err api trending:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
    },
    getLibrary: async (req, res) => {
        const AniSearch = require('./AniSearch')
        try{
            const user = req.user

            //ensure param positive int
            let num = req.params.num
            num = Number.isNaN(+num) ? 0 : +num
            //start index for search
            num *= 12

            const likes = user.likes.slice(num, num+12)
            const data = await AniSearch.getList(likes)

            return res.status(200).json(data)

        }catch(err){
            console.log('err api getlibrary:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
        
    }
}

module.exports = api