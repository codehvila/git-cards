import { useState, Fragment, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import logo from "./logo.svg";
import "./App.css";

import Card from "./components/card/Card";
import Popup from "./components/popup/Popup";
import Command from "./components/command/Command";
import Sentence from "./components/sentence/Sentence";

import { cardGitList, cardBashList } from "./data/data";

function App() {
  const setFontSize = (fontSize) => {
    const objectFontSize = { small: "12px", normal: "16px", big: "20px" };
    const htmlElement = document.querySelector("html");
    htmlElement.style.setProperty(
      "--rootfontsize",
      `${objectFontSize[fontSize]}`
    );
  };

  const [notification, setNotification] = useState(null);
  const [cardFilter, setCardFilter] = useState(null);
  const [cardsFiltered, setCardsFiltered] = useState([]);

  const cardObject = [{ git: cardGitList }, { bash: cardBashList }];
  const correctCardObject = { git: cardGitList, bash: cardBashList };
  // const cardObject = { ...cardBashList, ...cardGitList };

  const cardObjectToCardList = (cardsObject) => {
    const cardList = [];
    const cardsTypes = Object.keys(cardsObject);
    cardsTypes.map((cardType) => {
      const cardTitles = Object.keys(cardsObject[cardType]);
      cardTitles.map((cardTitle) => {
        const sentences = cardsObject[cardType][cardTitle];
        cardList.push({ type: cardType, title: cardTitle, sentences });
        return null;
      });
      return null;
    });
    return cardList;
  };

  const cardList = cardObjectToCardList(correctCardObject);

  useEffect(() => {
    setCardsFiltered(cardList);

    return () => {
      setCardsFiltered(null);
    };
  }, []);

  useEffect(() => {
    if (cardFilter !== null) {
      setCardsFiltered(cardList.filter((card) => card.type === cardFilter));
    } else {
      setCardsFiltered(cardList);
    }

    return () => {
      setCardsFiltered(null);
    };
  }, [cardFilter]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="App-content">
        <div className="notification">
          {notification && <Popup notification={notification} />}
        </div>
        <div className="rootfontsize">
          <div>
            <span
              onClick={() => setFontSize("small")}
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              A
            </span>
            <span style={{ color: "grey" }}>{" | "}</span>
            <span
              onClick={() => setFontSize("normal")}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              A
            </span>
            <span style={{ color: "grey" }}>{" | "}</span>
            <span
              onClick={() => setFontSize("big")}
              style={{ fontSize: "22px", cursor: "pointer" }}
            >
              A
            </span>
          </div>
        </div>
        <div className="card-types">
          <span key={uuidv4()} style={{ fontWeight: "bolder" }}>
            <button onClick={() => setCardFilter(null)}>All cards</button>
            &nbsp;
          </span>
          {cardObject &&
            cardObject.map((cardTypes) => (
              <span key={uuidv4()} style={{ fontWeight: "bolder" }}>
                <button
                  onClick={() => setCardFilter(Object.keys(cardTypes)[0])}
                >
                  {Object.keys(cardTypes)}
                </button>
                &nbsp;
              </span>
            ))}
        </div>
        <div className="cards-container">
          {cardsFiltered &&
            cardsFiltered.map((card) => (
              <Fragment key={uuidv4()}>
                <Card key={uuidv4()} title={card.title} type={card.type}>
                  <Command>
                    {card.sentences.map((sentence) => (
                      <Fragment key={uuidv4()}>
                        <Sentence setNotification={setNotification}>
                          {sentence}
                        </Sentence>
                      </Fragment>
                    ))}
                  </Command>
                </Card>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
