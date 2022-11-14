import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

import { FaStar } from "react-icons/fa"

import GameCard from "../components/GameCard";

import "./game.css";

const gameURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

const Game = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null);
  const [screenshot, setScreenshot] = useState(null)
  const [lojas, setLojas] = useState(null);

  const getGame = async (url, urlScreenshot, urlLojas, storesUrl) =>{

    const resGame = await fetch(url);
    const resScreenshot = await fetch(urlScreenshot);
    const resLojas = await fetch(urlLojas);
    const resStores = await fetch(storesUrl);
    const dataGame = await resGame.json();
    const dataScreen = await resScreenshot.json();
    const dataLojas = await resLojas.json();
    const dataStores = await resStores.json();

    setGame(dataGame);
    setScreenshot(dataScreen);
    setLojas(dataLojas.results)
    console.log(dataStores.results)
    console.log(dataGame)
  }
  useEffect(()=>{
    const gameUrl = `${gameURL}/${id}?${apiKey}`;
    const screenshotUrl = `${gameURL}/${id}/screenshots?${apiKey}`;
    const lojasOficiaisUrl = `${gameURL}/${id}/stores?${apiKey}`
    const storesUrl = `https://api.rawg.io/api/stores?${apiKey}`;
    getGame(gameUrl, screenshotUrl, lojasOficiaisUrl, storesUrl);

  },[])
  return (
    <div className="game-description">
      {game &&
      <>
       <GameCard game={game} showLink={false}/>
        <h3 className="info-genero">
          Generos:{game.genres.length > 0 && game.genres.map((genero) => <div key={genero.id} className="generos">{genero.name}</div>)}
        </h3>
        <h3 className="info-plataforma">
          Plataformas: {game.platforms.length > 0 &&
          game.platforms.map((plataforma) => 
          <div key={plataforma.platform.id}  className="plataformas">{plataforma.platform.name}</div>)}
        </h3>
        <h3 className="info-screenshot">
          Screenshots: {screenshot.results.length > 0 &&
          screenshot.results.map((imagens) => 
          <div key={imagens.id} className="screenshots" ><img src={imagens.image}/></div>)}
        </h3>
        <h3 className="info-store">
          Lojas: {game.stores.length > 0 && 
          game.stores.map((sites) =>
          <div key={sites.id} className="lojas"><a href="" target="_blank">{sites.store.name}</a></div>)} 
        </h3>
        <p>TODO name-done, genero-done, platform-done, shot_screenshots-done, store, tags,background-image, metacritic</p>
      </>
      }

    </div>

  )
}

export default Game