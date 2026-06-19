import fs from 'fs';
import path from 'path';

async function testUpload() {
  const loginRes = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@desana.com', password: 'desana2024' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  if (!token) {
    console.error('Failed to login:', loginData);
    return;
  }

  // Create a dummy text file to upload as image (multer might reject text, so we'll make a dummy jpg)
  const dummyFile = path.join(__dirname, 'dummy.jpg');
  fs.writeFileSync(dummyFile, 'fake image content');

  const fileBlob = new Blob([fs.readFileSync(dummyFile)], { type: 'image/jpeg' });
  const formData = new FormData();
  formData.append('image', fileBlob, 'dummy.jpg');
  formData.append('caption', 'Test Upload');

  const uploadRes = await fetch('http://localhost:3001/api/gallery', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const uploadData = await uploadRes.json();
  console.log('Upload Result:', uploadRes.status, uploadData);
  
  // Clean up
  fs.unlinkSync(dummyFile);
}

testUpload();
