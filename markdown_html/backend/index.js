
const express = require('express');
const cors = require('cors');
const {marked} = require('marked');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/convert',(request, response)=>{
    const {markdown} = request.body;
    if(!markdown){
       return response.status(400).json({error:"The Markdown doesn't seem to exist"});
    }
    const html = marked(markdown);
    response.json({ html: String(html) });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
});

