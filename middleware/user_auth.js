const jwt=require('jsonwebtoken')
function auth(req,res,next)
{
   const token= req.header('x-auth-token',process.env.JWTPRIVATEKEY)
   if (!token)
   {
    return res.json
    ({
        success: false,
        message: "access denied no token provided ",
    })
}
    try{
    const payload=jwt.verify(token,process.env.JWTPRIVATEKEY)
    req.user=payload
    next()
    }
    catch(ex)
    {
        res.json({
            success: false,
            message: "access denied no token provided ",
        })
    }
}
module.exports.auth=auth