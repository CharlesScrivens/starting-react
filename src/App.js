import React from 'react';
import PropTypes, { string } from 'prop-types';
import './App.css';
import pokemon from './pokemon.json';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)} >Select!</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

function App() {
  //need to track input text
  const [filter, filterSet] = React.useState("");
  //use for selecting (another state)
  const [selectedItem, selectedItemSet] = React.useState(null);
  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}>
      <h1 className='title'>Pokemon Search</h1>
      <input value={filter} onChange={(evt) => filterSet(evt.target.value)} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: "70% 30%",
          gridColumn: "1 rem",
        }}>
        <div>
          <table width="100%">
            <thead>
              <th>Pokemon</th>
              <th>Types</th>
            </thead>
            <tbody>
              {pokemon.filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase())).slice(0, 151).map(pokemon => (
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItem(pokemon)} />
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && (
          <div>
            <h1>{selectedItem.name.english}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
