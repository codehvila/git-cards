import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./components/card/Card";
import Popup from "./components/popup/Popup";
import Command from "./components/command/Command";

function App() {
  const [notification, setNotification] = useState(null);

  const cardList = {
    "Rewrite history": ["git rebase -i HEAD~n"],

    "Undo n commits": ["git reset [--hard | --mixed | --soft] HEAD~n"],
  };

  console.log(cardList.bash);

  // const cardList = {
  //   git: [
  //     {
  //       "Rewrite history": ["git rebase -i HEAD~n"],
  //     },
  //     { "Undo n commits": ["git reset [--hard | --mixed | --soft] HEAD~n"] },
  //   ],
  // };

  // console.info(cardList.git[1]);
  // console.info(Object.keys(cardList.git[1])[0]);
  // console.info(Object.values(cardList.git[1])[0][0]);

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
        <Card>
          <Command setNotification={setNotification} />
        </Card>
      </div>
    </div>
  );
}

export default App;
