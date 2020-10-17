const admin = require('firebase-admin');
const adminSchema = require('../models/adminSchema');
module.exports = function(req, res, next){
    const authToken = req.header('authToken');
    admin.auth().verifyIdToken(authToken)
            .then( async token => {
                try {
                    const checkAdmin = await adminSchema.findOne({
                        email : token.email
                    });
                    
                    if(checkAdmin){

                        next()
                    }
                    else{
                        res.status(403)
                    }

                } catch (err) {
                    res.send(
                        'Authorization Error'
                    ).status(403)
                }
            })
            .catch(err => res.send({err,
            message: 'Token expired or bad token'}))
}