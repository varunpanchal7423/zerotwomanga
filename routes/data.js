const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get("/" ,logger,(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache');
    res.send(req.base64Image)
})

function logger(req,res,next) {
    async function getdata (){
        const resp = await axios({
        method: 'GET',
        url: req.query.imgurl,
        responseType: 'arraybuffer'
        });
        req.base64Image = Buffer.from(resp.data).toString('base64');       
    }
    getdata().then(() => (next()))
}


module.exports = router