const {categories} = require('../models')

module.exports = {
    getAllCategories : async (req,res,next) => {
        try {
            const data = await
            categories.findAll({
                
            })
            res.status(200).json(data)
        } catch (error) {
            next(err)
        }
    }
}