import { useState, Fragment } from "react";
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
    "Stash working files": ["git stash", "git stash list", "git stash pop"],
  };

  const cardBashList = {
    "Make a directory": ["mkdir directory-name"],
    "Change name to a directory": ["mv old-directory-name new-directory-name"],
    "Remove an empty directory": ["rm -d bonjour"],
    "Remove a non empty directory": ["rm -dr bonjour"],
  };

  // const cardList = [{ git: cardGitList }, { bash: cardBashList }];
  const cardList = { ...cardBashList, ...cardGitList };

  console.info(cardList);

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
        <div className="cards-container">
          {cardList &&
            Object.keys(cardList).map((objKey) => (
              <Card key={objKey} title={objKey}>
                <Command key={objKey}>
                  {cardList[objKey].map((sentence) => (
                    <Fragment key={sentence}>
                      <Sentence setNotification={setNotification}>
                        {sentence}
                      </Sentence>
                    </Fragment>
                  ))}
                </Command>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
