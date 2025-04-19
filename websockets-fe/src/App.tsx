import { useEffect,useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();

  function sendMessage(){
    if(!socket){
      return;
    }
    // @ts-ignore
    socket.send("ping");

  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    // @ts-ignore
    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    }
  }, [])


  return (
    <>
     <input type="text" placeholder='Message....'/> 
     <button onClick={sendMessage}>Send</button>   
    </>
  )
}

export default App
