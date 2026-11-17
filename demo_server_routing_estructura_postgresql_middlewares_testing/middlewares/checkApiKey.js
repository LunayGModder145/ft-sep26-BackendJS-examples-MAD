// POST http://localhost:3000/api/entries?API_KEY=hola123


const checkApiKey = (req, res, next) =>{
const API_KEY = req.query.API_KEY;

if(!API_KEY){
    return res.status(401).json({
        success:false,
        message:"API_KEY no proveída"
    })
}

if(API_KEY !== process.env.API_KEY){
    return res.status(401).json({
        success:false,
        message:"API_KEY errónea"
    })
}
    // API KEY correcta. Pasar hacia la siguiente tarea
    next();
}

module.exports = checkApiKey;