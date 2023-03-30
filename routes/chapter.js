const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get("/:id" ,(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache');
    res.render("chapter",{data: JSON.stringify(req.data_stream)})
})

router.param("id",(req,res,next,id) => {
    req.data_stream=[]
    req.data_buffer=[]
    async function getdata (){
        const baseUrl = 'https://api.mangadex.org';
        let host, hash, data, dataSaver;
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/at-home/server/${id}`,
        });
    
        host = resp.data.baseUrl;
        chapterHash = resp.data.chapter.hash;
        data = resp.data.chapter.data;
        for(const page of data){
        req.data_stream.push(`${host}/data/${chapterHash}/${page}`)
        }
    }
    getdata().then(() => (next()))
})


module.exports = router