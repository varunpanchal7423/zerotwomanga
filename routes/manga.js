const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get("/:id" ,(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache');
    const feed_res = [req.api_data,req.chapt_feed]
    res.render("manga",{data:feed_res})
})

router.param("id",(req,res,next,id) => {
    async function getdata (){
        var isValid = true;
        req.chapt_feed = []
        var baseUrl = "https://api.mangadex.org"
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${id}`
        });
        req.api_data =await resp.data.data;
        var i = 0
        while(isValid){
            const languages = ['en'];
            const resp_feed = await axios({
                method: 'GET',
                url: `${baseUrl}/manga/${id}/feed`,
                params: {
                    "limit": 100,
                    "offset": i,
                    "translatedLanguage": languages,
                    "order": {"chapter":"asc"}   
                    }
            });
            req.chapt_feed = req.chapt_feed.concat(resp_feed.data.data);
            if(resp_feed.data.total <= req.chapt_feed.length){
                isValid = false
            }
            i=i+resp_feed.data.limit
            if(i>resp_feed.data.total){
                i=resp_feed.data.total
            }
        }
    }
    getdata().then(() => (next()))
})


module.exports = router