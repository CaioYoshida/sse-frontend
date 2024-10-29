import React, { useEffect, useState } from 'react';

function App() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Connect to the SSE endpoint
        const eventSource = new EventSource('http://localhost:5001/events');

        // Listen for incoming messages
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('New notification:', data);
            setNotification(data);
        };

        // Handle errors (optional)
        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
        };

        // Cleanup the event source when component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>React Notification with SSE</h1>
            {notification ? (
                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
                    <h2>New Notification:</h2>
                    <pre>{JSON.stringify(notification, null, 2)}</pre>
                </div>
            ) : (
                <p>No new notifications yet...</p>
            )}
        </div>
    );
}

export default App;
