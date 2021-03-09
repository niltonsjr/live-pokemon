import { useEffect, useState } from "react";
import { api } from "./services";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    api
      .get("pokemon")
      .then((res) => {
        setPokemon(res.data.results);
        setPrev(res.data.previous);
        setNext(res.data.next);
      })
      .catch((err) => console.log(err));
  }, []);

  const seePrev = (prev) => {
    api.get(prev).then((res) => {
      setPokemon(res.data.results);
      setPrev(res.data.previous);
      setNext(res.data.next);
    });
  };

  const seeNext = (next) => {
    api.get(next).then((res) => {
      setPokemon(res.data.results);
      setPrev(res.data.previous);
      setNext(res.data.next);
    });
  };

  const buildImgUrl = (url) => {
    const id = url.split("/");
    const idx = id.length - 2;
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[idx]}.png`;
    return imgUrl;
  };

  return (
    <div className="container">
      <h1>Live-Pokemon</h1>
      <div className="pokemon-container">
        {pokemon.map((poke) => (
          <div key={poke.name} className="pokemon">
            <img src={buildImgUrl(poke.url)} alt={poke.name} />
            <p>{poke.name}</p>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button
          onClick={() => seePrev(prev)}
          disabled={prev === null ? true : false}
          className={prev === null ? "btn-disabled" : ""}
        >
          Ver anteriores
        </button>
        <button
          onClick={() => seeNext(next)}
          disabled={next === null ? true : false}
          className={next === null ? "btn-disabled" : ""}
        >
          Ver próximos
        </button>
      </div>
    </div>
  );
}

export default App;
