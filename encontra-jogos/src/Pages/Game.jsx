import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameCard from "../components/GameCard";

import "./game.css";

const gameURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

const Game = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null);

  const getGame = async (url) =>{
    const res = await fetch(url);
    const data = await res.json();

    setGame(data)
  }
  useEffect(()=>{
    const gameUrl = `${gameURL}${apiKey}&id=${id}`;
    getGame(gameUrl);
    console.log(gameUrl)
  },[])

  return (
    <div>
      <p>TODO name, plataform, shot_screenshots, store, tags,background-image, metacritic</p>
    </div>

  )
}

export default Game