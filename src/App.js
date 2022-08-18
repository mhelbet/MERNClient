import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [message, setMessage] = useState('Test')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [allData, setAllData] = useState([])

  useEffect(() => {
      axios.get('http://localhost:3001/test', {
    }).then(response => {
        setMessage(response.data)
    }, error => {
        console.log(error)
    })
  
  }, [])

  const send = () => {
    axios.post('http://localhost:3001/post', {
      name: name,
      surname: surname
    }).then(response => {
        setMessage("Saved to database")
        console.log(response)
    }, error => {
        console.log(error)
    })
  }

  const getAll = () => {
    axios.get('http://localhost:3001/get', {
    }).then(response => {
        setAllData(response.data)
        console.log(response)
    }, error => {
        console.log(error)
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <h3>
          {
            message
          }
        </h3>
        <br/>
        <input type={'text'} placeholder={'Enter name'} onChange={e => setName(e.target.value)}/><br/>
        <input type={'text'} placeholder={'Enter surname'} onChange={e => setSurname(e.target.value)}/>
        <button onClick={send}>Save</button>
        <button onClick={getAll}>Get data</button>

        <ul>
          {
            allData.map(obj =>  <li key={obj._id}>{obj.name} {obj.surname}</li>)
          }
        </ul>
        <button onClick={() => setAllData([])}>Delete data</button>
      </header>
    </div>
  );
}

export default App;