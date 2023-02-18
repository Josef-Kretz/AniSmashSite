
const User = require('../models/User')
const main = {
    addLike : async (req, res) => {
        try{
            const user = await User.find({user: req.user})
            const animeId = req.body.animeId

            if(user[0].notLikes.includes(animeId)) user[0].notLikes = user[0].notLikes.filter(id => id != animeId)
            if(!user[0].likes.includes(animeId)) user[0].likes.push(animeId)

            user[0].save()

            res.status(200).json({isError: false, msg: 'Successfully updated'})
        }catch(err){
            console.log('err main addLike:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
        
    },
    hate : async (req, res) => {
        try{
            const user = await User.find({user: req.user})
            const animeId = req.body.animeId
    
            if(user[0].likes.includes(animeId)) user[0].likes = user[0].likes.filter(id => id != animeId)
            if(!user[0].notLikes.includes(animeId)) user[0].notLikes.push(animeId)
    
            user[0].save()
    
            res.status(200).json({isError: false, msg: 'Successfully updated'})
        }catch(err){
            console.log('err main hate:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }

    },
    getProfile : async (req, res) => {
        try{
            const user = await User.find({user : req.user})

            res.status(200).json({
                email: user[0].email,
                likes : user[0].likes,
                notLikes : user[0].notLikes
            })
        }catch(err){
            console.log('err main getProfile:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }

    },
    eraseLikes : async (req, res) => {
        try{
            const user = await User.find({user : req.user})

            user[0].likes = []
            user[0].save()
    
            res.status(200).json('Successfully erased Liked Anime')
        }catch(err){
            console.log('err main eraseLikes:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
    },
    eraseNotLikes : async (req, res) => {
        try{
            const user = await User.find({user : req.user})

            user[0].notLikes = []
            user[0].save()
    
            res.status(200).json('Successfully erased Not Liked Anime')
        }catch(err){
            console.log('err main eraseNotLikes:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }
    },
    deleteUser : async (req, res) => {
        try{
            await User.deleteOne({user : req.user})
            res.status(200).json('User has been deleted')
        }catch(err){
            console.log('err main deleteUser:', err)
            res.status(500).json({isError: true, msg:`Server error: Try again later`})
        }

    }
}

module.exports = main