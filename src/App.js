import React from 'react';
import PropTypes, { string } from 'prop-types';
import './App.css';
import styled from "@emotion/styled";
import { Button } from "@mui/material";




const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <Button
        variant="outlined"
        color='primary'
        onClick={() => onSelect(pokemon)} >Select!</Button>
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

// using styled to make css into tags
const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1 rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  paddingTop: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: .2rem;
`;


// practice class based vs. function based
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((pokemon) =>
        this.setState({
          ...this.state,
          pokemon,
        })
      );
  }

  render() {
    return (
      <Container>
        <Title>Pokemon Search</Title>
        <Input value={this.state.filter} onChange={(evt) => this.setState({ ...this.state, filter: evt.target.value })} />
        <TwoColumnLayout>
          <div>
            <table width="100%">
              <thead>
                <th>Pokemon</th>
                <th>Types</th>
              </thead>
              <tbody>
                {this.state.pokemon.filter((pokemon) => pokemon.name.english.toLowerCase().includes(this.state.filter.toLowerCase())).slice(0, 151).map(pokemon => (
                  <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => this.setState({
                    ...this.state,
                    selectedItem: pokemon
                  })}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {this.state.selectedItem && <PokemonInfo {...this.state.selectedItem} />}
        </TwoColumnLayout>
      </Container>
    )
  }
}

/*
  //hook to get the data from json file
  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data))
  }, []);
  */
/*
function App() {
  //need to track input text
  const [filter, filterSet] = React.useState("");
  //use for selecting (another state)
  const [selectedItem, selectedItemSet] = React.useState(null);
  //use state for getting pokemon from server
  const [pokemon, pokemonSet] = React.useState([]);


  return (
    <Container>
      <Title>Pokemon Search</Title>
      <Input value={filter} onChange={(evt) => filterSet(evt.target.value)} />
      <TwoColumnLayout>
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
      </TwoColumnLayout>
    </Container>
  )
}
*/
export default App;
