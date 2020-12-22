import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

const Cartas = (props) => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards?set=" + props.selected)
      .then((res) => res.json())
      .then((res) => {
        setCards(res.cards);
        console.log(res)
      });
  }, [props.selected])

  const mostrarCartas=cards.map(card=>{
    return(
      <div>
        <h4>{card.name}</h4>
        <p>{card.text}</p>
        <img class="carta" src={card.imageUrl} alt="" />
      </div>
    )
  })
  return mostrarCartas;
}

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/sets")
      .then((res) => res.json())
      .then((res) => {
        setData(res.sets)
      });
  }, []);

  const manageChange = (e) => {
    setSelected(e.target.value)
  }

  const options = data.map(option => {
    return <option value={option.code}>{option.name}</option>
  })

  return (
    <>
      <select onChange={manageChange}>{options}</select>
      <Cartas selectes={selected} />
    </>
  )
}

export default App;
