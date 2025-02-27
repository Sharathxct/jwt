import './App.css'
import { useState } from 'react';
import { SignJWT } from 'jose'; // Import SignJWT from jose

function App() {
  const [body, setBody] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');

  const generateToken = async () => {
    try {
      const encoder = new TextEncoder();
      const jwt = await new SignJWT(JSON.parse(body))
        .setProtectedHeader({ alg: 'HS256' })
        .sign(encoder.encode(secret)); // Encode the secret key

      setToken(jwt);
    } catch (error) {
      console.error("Error generating token:", error);
      setToken('Error generating token');
    }
  };

  return (
    <>
      <h1>JWT Helper</h1>
      <input 
        type="text" 
        placeholder="Enter JSON body" 
        value={body} 
        onChange={(e) => setBody(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter secret key" 
        value={secret} 
        onChange={(e) => setSecret(e.target.value)} 
      />
      <button onClick={generateToken}>Generate Token</button>
      {token && <p>Generated Token: {token}</p>}
    </>
  )
}

export default App
