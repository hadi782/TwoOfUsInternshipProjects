import React, { useState } from 'react';

const PasswordGenerator = ()=>{
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState('');
    //this is for the clipboard to state later if it has successfully copied the html
    const [copySuccess, setCopySuccess] = useState('');
    const generatePassword =async ()=>{
        try{
            const response =await fetch(`http://localhost:3000/generatePassword?length=${length}`);
            const data = await response.json();
            setPassword(data.password);
        }catch(error){
            console.log(error);
        }
    };
    const handleCopyToClipboard = () => {

        navigator.clipboard.writeText(password).then( () => {

            setCopySuccess('Code copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 5000); 

        }).catch((err) => {

            console.error('Could not copy text: ', err);

        });
    }
    return (
        <div>
            
            <label  style={{marginRight: '5px'}}>Password Length</label>
            <input type="number" value={length}  style={{marginRight: '4px', borderRadius: '4px', padding: '5px'}} onChange={(e)=>setLength(parseInt(e.target.value,10))}/>
            <button onClick={generatePassword} style={{borderRadius: '4px', padding: '5px'}}>Generate Password</button>
            {password &&(
                <div>
                    <h2>Generated Password is:</h2>
                    <p>{password}</p>
                </div>
            )}
            {password && (
                <>
                    <button onClick={handleCopyToClipboard} style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px'}}>
                        Copy to Clipboard
                    </button>
                    {copySuccess && ( 
                        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#dff0d8', color: '#3c763d', border: '1px solid #d6e9c6',
                            borderRadius: '4px', transition: 'opacity 0.5s ease-out', opacity: copySuccess ? 1 : 0}}>
                            {copySuccess}
                        </div>
                    )}
                </>
            )} 
        </div>
    );
};
export default PasswordGenerator;