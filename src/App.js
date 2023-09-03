import { useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import logo from "./logo.svg";
import "./App.css";

import Card from "./components/card/Card";
import Popup from "./components/popup/Popup";
import Command from "./components/command/Command";
import Sentence from "./components/sentence/Sentence";

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

  const cardGitList = {
    "Rewrite history": ["git rebase -i HEAD~n", "git commit --amend --no-edit"],

    "Undo n commits": ["git reset [--hard | --mixed | --soft] HEAD~n"],
    "Log commits": [
      "git log --oneline -- src/path/filename.js",
      "git log --oneline -n 8",
    ],
    "Push commits": [
      "git push origin master~n:master",
      "git push origin master",
      "git push --force origin master",
    ],
    "Remove a file from repository": [
      "git rm filename.ext",
      "git rm --cached filename.ext",
    ],
    "Stash working files": [
      "git stash",
      "git stash -u, --include-untracked",
      "git stash save 'message'",
      "git stash list",
      "git stash apply",
      "git stash apply stash@{n}",
      "git stash pop",
      "git stash pop stash@{n}",
      "git stash show",
      "git stash show -p",
      "git stash branch branch-name stash@{n}",
      "git stash drop stash@{n}",
      "git stash -a, --all",
      "git stash clear",
    ],
  };

  const cardBashList = {
    "Make a directory": ["mkdir directory-name"],
    "Change name to a directory": ["mv old-directory-name new-directory-name"],
    "Remove an empty directory": ["rm -d bonjour"],
    "Remove a non empty directory": ["rm -dr bonjour"],
    "Install .deb files in the command line": [
      "sudo apt install path_to_deb_file",
      "sudo apt install gdebi",
      "sudo apt list --installed | grep chat",
      "dpkg -l | grep chat",
    ],
    "Unninstall .deb files in the command line": [
      "sudo apt remove program_name",
      "sudo apt list --installed | grep chat",
      "dpkg -l | grep chat",
      "dpkg -r program_name",
    ],
  };

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
              style={{ fontSize: "12px" }}
            >
              A
            </span>{" "}
            <span
              onClick={() => setFontSize("normal")}
              style={{ fontSize: "16px" }}
            >
              A
            </span>{" "}
            <span
              onClick={() => setFontSize("big")}
              style={{ fontSize: "20px" }}
            >
              A
            </span>
          </div>
        </div>
        <div className="card-types">
          {cardObject &&
            cardObject.map((cardTypes) => (
              <span key={uuidv4()} style={{ fontWeight: "bolder" }}>
                {Object.keys(cardTypes)}&nbsp;
              </span>
            ))}
        </div>
        <div className="cards-container">
          {cardList &&
            cardList.map((card) => (
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
