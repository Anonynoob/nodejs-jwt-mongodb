
exports.unAuthorized = (res) =>{
    return res.status(404).send('Sorry, Not Found')
} 

exports.accessDenied = (res) => {
    return res.status(401).send('Access Denied')
}

exports.acessAlowed = (res, msg) => {
    return res.status(200).json({token: msg});
}