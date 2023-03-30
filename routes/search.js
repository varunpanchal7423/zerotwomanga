const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get("/", logger ,(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache');
    res.render("search",{data: req.api_data})
})

router.post('/',(req,res)=>{
    var search_query = "/search?q=" + req.body.manganame
    res.redirect(search_query)
    //res.render("search",{data: search_result})
})


function logger(req,res,next){
    const baseUrl = 'https://api.mangadex.org';

    async function getdata (){
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: {
                title: req.query.q,
                includes: ["cover_art"]
            }
        });
        req.api_data =await resp.data.data;
    }

    getdata().then(() => (next()))
}

module.exports = router