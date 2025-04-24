import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error(error);
      setResponse('There was an error while generating your response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>Chat with AI agent</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '8px' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !message}
          style={{ padding: '8px 16px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App; 