import './App.css'
import axios from 'axios'

function App() {
  
  return (
    <>
      <button
        onClick={() => {
          axios
            .post(
              'https://accounts.spotify.com/api/token',
              {
                grant_type: 'client_credentials',
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
              },
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        }}
      >
        click
      </button>
    </>
  )
}

export default App
