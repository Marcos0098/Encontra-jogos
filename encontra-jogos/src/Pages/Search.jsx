import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "../components/GameCard";

const searchURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

import "./GamesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams()
  const[games, setGames] = useState([]);

  const query = searchParams.get("q");

  const getSearchedGames = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setGames(data.results);
  };

  useEffect(() => {
    const searchedUrl = `${searchURL}${apiKey}&search_exact=${query}`;

    getSearchedGames(searchedUrl);
  },[query])

  return (
    <div className="container">
      <h2 className="title">Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="games-container">
        {games.length === 0 && <p>Carregando ...</p>}
        {games.length > 0 && games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  )
}

export default Search