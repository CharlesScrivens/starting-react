import React from 'react';
import PropTypes, { string } from 'prop-types';
import './App.css';
import styled from "@emotion/styled"


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

const Title = styled.h1`
  text-align: center;
`;

function App() {
  //need to track input text
  const [filter, filterSet] = React.useState("");
  //use for selecting (another state)
  const [selectedItem, selectedItemSet] = React.useState(null);
  //use state for getting pokemon from server
  const [pokemon, pokemonSet] = React.useState([]);

  //hook to get the data from json file
  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
    .then((resp) => resp.json())
    .then((data) => pokemonSet(data))
  }, [])
  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}>
      <Title>Pokemon Search</Title>
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
