import { useState, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./components/card/Card";
import Popup from "./components/popup/Popup";
import Command from "./components/command/Command";
import Sentence from "./components/sentence/Sentence";

function App() {
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

  const cardList = [{ git: cardGitList }, { bash: cardBashList }];

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
        <div className="cards-container">
          {cardGitList &&
            Object.keys(cardGitList).map((objKey) => (
              <Card key={objKey} title={objKey}>
                <Command key={objKey}>
                  {cardGitList[objKey].map((sentence) => (
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
