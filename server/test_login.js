fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@desana.com', password: 'desana2024' })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
