exports.isTokenValid = (req, res, next) => {
    const Bearertoken = req.headers['authorization']
    if(Bearertoken){
        req.token = Bearertoken.split(" ")[1];
        next();
    }else{
        res.status(401).json({errors: 'Unauthorized.'})
    }
}