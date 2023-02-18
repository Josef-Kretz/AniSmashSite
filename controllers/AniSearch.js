//All requests made to the AniList GraphQL API 
//must be made as a POST request to 'https://graphql.anilist.co'.
//testing GraphQL https://anilist.co/graphiql
//reference docs https://anilist.github.io/ApiV2-GraphQL-Docs/
const AniSearch = {
    findRecommends : async (animeId, numResults=7) => {
        const fetch = require('node-fetch')
        const query = `{
            Page(page: 1, perPage: ${numResults}) {
              recommendations(mediaRecommendationId: ${animeId}) {
                media {
                  id
                  idMal
                  title{
                    english
                    romaji
                  }
                  trailer {
                    id
                    site
                    thumbnail
                  }
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  averageScore
                  description
                  genres
                  tags {
                    id
                  }
                  externalLinks{
                    site
                    url
                  }
                  isAdult
                }
              }
            }
          }`

          const url = `https://graphql.anilist.co`
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
          }
          try{
            const res = await fetch(url, options)
            const data = await res.json()
            data.isError = false

            return data
          }catch(err){
            return {isError: true, err}
          }
          
    },
    search : async (searchTerms,searchType='search', numResults=10) => {
        //searchTypes {idMal, id, genre, tag}
        //use to add specific anime to library
        const fetch = require('node-fetch')
        const query = `{
            Page(page: 1, perPage:${numResults})
            {
              media(${searchType}:${searchTerms}, type:ANIME)
              {
                id
                title {
                  english
                  romaji
                }
                startDate
                coverImage{
                  medium
                }
                description
              }
            }
          }`

          const url = `https://graphql.anilist.co`
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
          }
          try{
            const res = await fetch(url, options)
            const data = await res.json()
            data.isError = false

            return data
          }catch(err){
            return {isError: true, err}
          }
    },
    findTrending : async (likes=[], notLikes=[]) => {
        const fetch = require('node-fetch')
        const ignoreIDs = [...likes, ...notLikes] //so user can swipe on new/trending content

        const query = `{
            Page(page:1, perPage:10)
            {
              media(id_not_in:[${ignoreIDs}],type: ANIME, format_in:[TV,MOVIE, ONA],sort:TRENDING_DESC, isAdult:false)
              {
                id
                idMal
                title
                {
                  english
                  romaji
                }
                trailer {
                    id
                    site
                    thumbnail
                  }
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  averageScore
                  description
                  bannerImage
                  genres
                  tags {
                    id
                    category
                    description
                  }
                  externalLinks{
                    site
                    url
                  }
                  isAdult
              }
            }
          }`

          const url = `https://graphql.anilist.co`
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
          }
          try{
            const res = await fetch(url, options)
            const data = await res.json()
            data.isError = false
            
            return data
          }catch(err){
            return {isError: true, data: err}
          }
    },
    getList : async (animeList=[]) => {
      const fetch = require('node-fetch')
        const query = `{
            Page(page:1, perPage:12)
            {
              media(id_in:[${animeList}],type: ANIME, format_in:[TV,MOVIE, ONA],sort:TRENDING_DESC, isAdult:false)
              {
                id
                idMal
                title
                {
                  english
                  romaji
                }
                trailer {
                    id
                    site
                    thumbnail
                  }
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  averageScore
                  description
                  bannerImage
                  genres
                  tags {
                    id
                    category
                    description
                  }
                  externalLinks{
                    site
                    url
                  }
                  isAdult
              }
            }
          }`

          const url = `https://graphql.anilist.co`
          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
          }
          try{
            const res = await fetch(url, options)
            const data = await res.json()

            return data.data.Page.media
          }catch(err){
            return {isError: true, data: err}
          }

    }
}

module.exports = AniSearch