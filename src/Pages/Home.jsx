import React from "react";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

const gamesURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

import './GamesGrid.css';

const Home = () => {
  const [topGames, setTopGames] = useState([]);

  const getTopRatedGames = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setTopGames(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${gamesURL}?${apiKey}&page=1`;
    
    getTopRatedGames(topRatedUrl);
  },[])

  return (
    <div className="container">
      <h2 className="title">Top Rated Games</h2>
      <div className="games-container">
        {topGames.length === 0 && <p>Carregando ...</p>}
        {topGames.length > 0 && topGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  )
}

export default Home