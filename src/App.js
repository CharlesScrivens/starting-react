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

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp Attack": PropTypes.number.isRequired,
    "Sp Defense": PropTypes.number.isRequired,
    Spped: PropTypes.number.isRequired,
  }),

}

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
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)} />
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  )
}

export default App;
