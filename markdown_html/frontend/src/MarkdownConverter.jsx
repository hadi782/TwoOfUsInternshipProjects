import React,{useState} from 'react';
import axios from 'axios';

function MarkdownConverter(){
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');
    //this is for the clipboard to state later if it has successfully copied the html
    const [copySuccess, setCopySuccess] = useState('');

    const handleConvertion = async ()=>{
        try{
            const response = await axios.post('http://localhost:3000/convert',{markdown});
            setHtml(response.data.html);

        }catch(error){
            console.error("there has been an error",error);
        }
    };
    const handleCopyToClipboard = () => {

        navigator.clipboard.writeText(html).then( () => {

            setCopySuccess('Code copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 5000); 

        }).catch((err) => {

            console.error('Could not copy text: ', err);

        });
    };
    return(
        <div>
            <textarea value={markdown} rows="10" cols="50" placeholder="Enter markdown here" onChange={(e) => setMarkdown(e.target.value)}/>
            <button onClick={handleConvertion}>Convert to HTML</button>
            <pre  style={{marginTop:'20px', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f5f5f5', color: '#333', fontFamily: 'monospace'}}>
                <code>{html}</code>
            </pre>
            {html && (
                <>
                    <button onClick={handleCopyToClipboard} style={{ marginLeft: '10px' }}>
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
}
export default MarkdownConverter;