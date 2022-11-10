import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaStar } from "react-icons/fa"

import "./game.css";

const gameURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

const Game = () => {

  const {id} = useParams();
  const [game, setGame] = useState(null);


  const getGame = async (url) =>{
    const res = await fetch(url);
    const data = await res.json();
    setGame(data);
    console.log(data)
  }

  useEffect(()=>{
    const gameUrl = `${gameURL}/${id}?${apiKey}`;
    getGame(gameUrl);
  },[])

  
  return (
    <div className="game-description">
      {game &&
      <>
       <img src={game.background_image} alt={game.name} />
        <h2>{game.name}</h2>
        <p>
            <FaStar/> {game.rating}
        </p>
        <h3 className="info">
          <p>Genero:{game.genres.length > 0 && game.genres.map((genero) => <div className="genero">{genero.name}</div>)}</p>
        </h3>
        <p>TODO name, plataform, shot_screenshots, store, tags,background-image, metacritic</p>
      </>
      }

    </div>

  )
}

export default Game