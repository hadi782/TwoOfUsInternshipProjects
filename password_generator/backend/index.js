const express = require('express');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

function generatePassword(length=8){
    //the +, -, /, = ... has special meaning in the URL so it would be better if we keep the password from using them 
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for(let i = 0; i <length; i++){
        password += chars[Math.floor(Math.random()*chars.length)];
    }
    return password;
}
app.get('/', (request, response)=>{
    response.send('Password Generator API');
});
app.get('/generatePassword', (request, response)=>{
    const {length} = request.query;
    const passwordLength = length ? parseInt(length,10) : 8;
    const password = generatePassword(passwordLength);
    response.json({password});

});
app.listen(PORT,()=>{
    console.log(`Server is running on the port:${PORT}`)
});