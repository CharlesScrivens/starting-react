import logo from './logo.svg';
import './App.css';
import pokemon from './pokemon.json';

function App() {
  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}>
      <h1 className='title'>Pokemon Search</h1>

      <table width="100%">
        <thead>
          <th>Pokemon</th>
          <th>Types</th>
        </thead>
        <tbody>
          {pokemon.map()}
          <tr>
            <td>Bulbasaur</td>
            <td>Grass, Poison</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  )
}

export default App;
