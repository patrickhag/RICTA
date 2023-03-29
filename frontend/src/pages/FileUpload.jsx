import React, { useState } from 'react';
import axios from 'axios';

/*
>> backend
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    const { filename, path, mimetype } = req.file;
  
    const file = new File({
      filename,
      path,
      mimetype
    });
  
    await file.save();
  
    res.status(200).send('File uploaded successfully');
  });
*/
export default function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('resume', file);
        await axios.post('http://localhost:9000/api/upload', formData);
        setFile(null);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                    <label className="w3-block w3-margin-top" for="file">Resume/CV</label>
                    <input
                        type="file"
                        value={file}
                        onChange={(e) => setFile(e.target.files[0])}
                        name="Attachments"
                        id="" accept="image/*,.pdf, .docx, .md" />
                </p>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

