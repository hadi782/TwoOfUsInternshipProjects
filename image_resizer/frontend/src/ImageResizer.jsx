import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function ImageResizer(){
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [width, setWidth] = useState('');
    const handleFile = (e)=>{
        setFile(e.target.files[0]);
    }
    const handleResize =async ()=>{
        if (width <= 0) {
            alert("Please enter a valid positive number for the width.");
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        formData.append('width', width);
        try {
            const response = await axios.post('http://localhost:3000/resize', formData, {responseType: 'arraybuffer', headers: {'Content-Type': 'multipart/form-data'}});
            const blob = new Blob([response.data], { type: 'image/png' });
            setImage(URL.createObjectURL(blob));
          } catch (error) {
            console.error('Error resizing image:', error);
          }
        };
        const DownloadImage = ()=>{
            const link = document.createElement('a');
            link.href = image;
            link.download = "TheResizedImage.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
      
        return (
          <div className="image-resizer">
            <input type="file" onChange={handleFile} />
            <input type="number" placeholder="Width" value={width} min={0} onChange={(e) => setWidth(e.target.value)}/>
            <button onClick={handleResize}>Resize Image</button>
            {image && (
              <div className="image-container">
                <img src={image} alt="Resized" />
              </div>
            )}
            {image &&(
                <button onClick={DownloadImage}>Download Image</button>
            )}
          </div>

        );
};

export default ImageResizer;