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

  console.log("--------------");
  console.info("Correct cardObject: ", correctCardObject);
  console.log(". . . . . .");
  console.log(
    "correctCardObject keys is an array of strings?: ",
    Object.keys(correctCardObject)
  );
  console.log(
    "correctCardObject values is an array of objects?: ",
    Object.values(correctCardObject)
  );
  console.log(". . . . . .");
  console.log(
    "cardType is a string?: ",
    Object.keys(correctCardObject).map((cardType) => {
      console.log("cardType is a string?: ", cardType);
    })
  );
  let counter = 0;
  console.log(
    "cardTypeObject is an object?: ",
    Object.values(correctCardObject).map((cardTypeObject) => {
      console.log("cardTypeObject is an object of cards?: ", cardTypeObject);
      console.log(
        "cardTypeObject keys is an array of titles: ",
        Object.keys(cardTypeObject)
      );
      console.log(
        "cardTypeObject values is an array of arrays of sentences: ",
        Object.values(cardTypeObject)
      );
      console.log(
        "cardTypeObject[cardTitle] is ...: ",
        Object.keys(cardTypeObject).map((cardTitle) => {
          console.log("-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -");
          console.log("cardTitle is a string?: ", cardTitle);
          console.log(
            "cardTypeObject[cardTitle] is ...: ",
            cardTypeObject[cardTitle].map((sentence) => {
              console.log(`  ${counter++} sentence is a string?: `, sentence);
            })
          );
        })
      );
    })
  );
  console.log("==============");
  console.log(" ");
  console.log("*************** START 2. - - - - - - - - - - - - - -");
  console.log(" ");
  console.info("correctCardObject: ", correctCardObject);
  console.log(" ");
  console.info("correctCardObject's Keys: ", Object.keys(correctCardObject));
  const cardsTypes = Object.keys(correctCardObject);
  console.log(" ");
  console.info("cardsTypes: ", cardsTypes);
  console.log(" ");
  let allCards = [];
  console.info(
    "All Cards: ",
    cardsTypes.map((cardType) => {
      console.info("Card Type: ", cardType);

      console.info(`${cardType} Cards: `, correctCardObject[cardType]);

      return Object.keys(correctCardObject[cardType]).map((cardTitle) => {
        console.info("Card title: ", cardTitle);
        console.info(
          "Card Sentences: ",
          correctCardObject[cardType][cardTitle]
        );
        const sentences = correctCardObject[cardType][cardTitle];
        allCards.push({ type: cardType, title: cardTitle, sentences });
        return { type: cardType, title: cardTitle, sentences };
      });
    })
  );
  console.log(" ");
  console.info("All Cards concatenated: ", allCards);
  console.log(" ");
  console.log("*************** END 2. = = = = = = = = = = = = = = =");
  console.log(" ");

  const cardObjectToCardList = (cardsObject) => {
    const cardsList = [];
    const cardsTypes = Object.keys(cardsObject);
    cardsTypes.map((cardType) => {
      const cardTitles = Object.keys(cardsObject[cardType]);
      return cardTitles.map((cardTitle) => {
        const sentences = cardsObject[cardType][cardTitle];
        cardsList.push({ type: cardType, title: cardTitle, sentences });
      });
    });
    return cardsList;
  };
  console.info(
    "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * : ",
    cardObjectToCardList(correctCardObject)
  );
  const cardList = cardObjectToCardList(correctCardObject);

  // console.info(
  //   "New cards values: ",
  //   cardObject.map((cardTypeObject) => {
  //     console.log(cardTypeObject);
  //     console.log(Object.keys(cardTypeObject));
  //     return Object.values(cardTypeObject).map((value) => {
  //       return Object.values(value);
  //     });
  //   })
  // );

  const newCardBashList = [
    {
      title: "Make a directory",
      sentences: ["mkdir directory-name"],
      type: "bash",
    },
    {
      title: "Change name to a directory",
      sentences: ["mv old-directory-name new-directory-name"],
      type: "bash",
    },
    {
      title: "Remove an empty directory",
      sentences: ["rm -d bonjour"],
      type: "bash",
    },
    {
      title: "Remove a non empty directory",
      sentences: ["rm -dr bonjour"],
      type: "bash",
    },
  ];

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
          {/* const cardObject = [{ git: cardGitList }, { bash: cardBashList }]; */}

          {cardObject &&
            cardObject.map((cardTypes) => (
              <Fragment key={Object.keys(cardTypes)}>
                {Object.keys(cardTypes).map((cardTypeKey) => {
                  return Object.values(cardTypes).map((cardTypeObj) => {
                    return Object.keys(cardTypeObj).map((cardKeyTitle) => (
                      <Card
                        key={cardKeyTitle}
                        title={cardKeyTitle}
                        type={cardTypeKey}
                      >
                        <Command>
                          {cardTypeObj[cardKeyTitle].map((sentence) => (
                            <Fragment key={sentence}>
                              <Sentence setNotification={setNotification}>
                                {sentence}
                              </Sentence>
                            </Fragment>
                          ))}
                        </Command>
                      </Card>
                    ));
                  });
                })}
              </Fragment>
            ))}
          <p>= = = = = = =</p>

          {cardList &&
            cardList.map((card) => (
              <Fragment key={uuidv4()}>
                <Card key={uuidv4()} title={card.title} type={card.type}>
                  <Command>
                    {card.sentences.map((sentence) => (
                      <Fragment key={uuidv4()}>
                        <Sentence setNotification={setNotification}>
                          {sentence}_
                        </Sentence>
                      </Fragment>
                    ))}
                  </Command>
                </Card>
              </Fragment>
            ))}

          {/* {cardObject &&
            Object.keys(cardTypeObj).map((objKey) => (
              <Card key={objKey} title={objKey}>
                <Command key={objKey}>
                  {cardTypeObj[objKey].map((sentence) => (
                    <Fragment key={sentence}>
                      <Sentence setNotification={setNotification}>
                        {sentence}
                      </Sentence>
                    </Fragment>
                  ))}
                </Command>
              </Card>
            ))} */}

          {/* {cardObject &&
            Object.keys(cardObject).map((objKey) => (
              <Card key={objKey} title={objKey}>
                <Command key={objKey}>
                  {cardObject[objKey].map((sentence) => (
                    <Fragment key={sentence}>
                      <Sentence setNotification={setNotification}>
                        {sentence}
                      </Sentence>
                    </Fragment>
                  ))}
                </Command>
              </Card>
            ))} */}
        </div>
      </div>
    </div>
  );
}

export default App;
