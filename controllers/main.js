const main = {
    addLike : (req, res) => {
        try{
            const user = req.user
            const animeId = req.body.animeId

            if(user.notLikes.includes(animeId)) user.notLikes = user.notLikes.filter(id => id != animeId)
            if(!user.likes.includes(animeId)) user.likes.push(animeId)

            user.save()

            res.status(200).json({isError: false, msg: 'Successfully updated'})
        }catch(err){
            console.log('err main addLike:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
        
    },
    hate : (req, res) => {
        try{
            const user = req.user
            const animeId = req.body.animeId
    
            if(user.likes.includes(animeId)) user.likes = user.likes.filter(id => id != animeId)
            if(!user.notLikes.includes(animeId)) user.notLikes.push(animeId)
    
            user.save()
    
            res.status(200).json({isError: false, msg: 'Successfully updated'})
        }catch(err){
            console.log('err main hate:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }

    },
    getProfile : (req, res) => {
        try{
            const user = req.user

            user.likes = user.likes.filter( (id, index, arr) => {
                return arr.findIndex( (id2) => id===id2 ) === index
            })

            user.notLikes = user.notLikes.filter( (id, index, arr) => {
                return arr.findIndex( (id2) => id===id2 ) === index
            })

            user.save()

            res.status(200).json({
                email: user.email,
                likes : user.likes,
                notLikes : user.notLikes
            })
        }catch(err){
            console.log('err main getProfile:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }

    },
    eraseLikes : (req, res) => {
        try{
            const user = req.user

            user.likes = []
            user.save()
    
            res.status(200).json('Successfully erased Liked Anime')
        }catch(err){
            console.log('err main eraseLikes:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
    },
    eraseNotLikes : (req, res) => {
        try{
            const user = req.user

            user.notLikes = []
            user.save()
    
            res.status(200).json('Successfully erased Not Liked Anime')
        }catch(err){
            console.log('err main eraseNotLikes:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
    },
    deleteUser : (req, res) => {
        try{
            req.user.deleteOne()
            res.status(200).json('User has been deleted')
        }catch(err){
            console.log('err main deleteUser:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }

    }
}

module.exports = main