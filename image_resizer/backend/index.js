const multer = require('multer');
const express = require('express');
const sharp = require('sharp');
const cors = require('cors');
const app = express();
const PORT = 3000;
const storage = multer.memoryStorage();
app.use(cors());
const upload = multer({storage: storage});

app.post('/resize', upload.single('image'), async(request, response)=>{
    try{
        if(!request.file){
           return response.status(400).send({error:"No file uploaded."});
        }
        const {width} = request.body;
        const buffer = await sharp(request.file.buffer).resize({width: parseInt(width), fit: "inside", withoutEnlargment: true}).toBuffer();
        response.set('Content-Type','image/png');
        response.send(buffer);


    }catch(error){
        console.log(error);
        response.status(500).send('An error occurred during image processing.');
    }
});


app.listen(PORT, ()=>{
    console.log(`Server is working on PORT: ${PORT}`);
})
