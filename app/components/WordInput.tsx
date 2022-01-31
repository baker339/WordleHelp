import { useState } from "react";
import { Form } from "remix";
import Words from "~/assets/words";

export default function WordInput() {
  const [words, setWords] = useState<string[] | null>(Words);
  const [includes, setIncludes] = useState<string[]>([]);
  const [dontInclude, setDontInclude] = useState<string[]>([]);
  const [firstLetter, setFirstLetter] = useState<string>("");
  const [secondLetter, setSecondLetter] = useState<string>("");
  const [thirdLetter, setThirdLetter] = useState<string>("");
  const [fourthLetter, setFourthLetter] = useState<string>("");
  const [fifthLetter, setFifthLetter] = useState<string>("");
  const [notFirstLetter, setNotFirstLetter] = useState<string[]>([]);
  const [notSecondLetter, setNotSecondLetter] = useState<string[]>([]);
  const [notThirdLetter, setNotThirdLetter] = useState<string[]>([]);
  const [notFourthLetter, setNotFourthLetter] = useState<string[]>([]);
  const [notFifthLetter, setNotFifthLetter] = useState<string[]>([]);

  function handleDontInclude(event: any) {
    let input: string[] = event.target.value
      .replace(/[^A-Za-z0-9]/g, "")
      .split("");
    setDontInclude(input);
    let filteredWords: string[] = words ?? [];
    if (words) {
      filteredWords = words?.filter((word) => {
        let returnVal: boolean = true;
        input.forEach((letter: string) => {
          if (word.includes(letter)) returnVal = false;
        });
        return returnVal;
      });
    }
    setWords(filteredWords);
  }

  function handleIncludes(event: any) {
    let input: string[] = event.target.value
      .replace(/[^A-Za-z0-9]/g, "")
      .split("");
    setIncludes(input);
    let filteredWords: string[] = words ?? [];
    if (words) {
      filteredWords = words?.filter((word) => {
        let returnVal: boolean = true;
        input.forEach((letter: string) => {
          if (!word.includes(letter)) {
            returnVal = false;
          }
        });
        return returnVal;
      });
    }
    setWords(filteredWords);
  }

  function handleClear() {
    setWords(Words);
    setIncludes([]);
    setDontInclude([]);
    setFirstLetter("");
    setSecondLetter("");
    setThirdLetter("");
    setFourthLetter("");
    setFifthLetter("");
    setNotFirstLetter([]);
    setNotSecondLetter([]);
    setNotThirdLetter([]);
    setNotFourthLetter([]);
    setNotFifthLetter([]);
  }

  function calcConstellation(word: string): number {
    let num = 0;
    if (words) {
      let numWords: number = words.length;
      words?.forEach((filword) => {
        let check = false;
        let letters = filword.split("");
        letters.forEach((letter) => {
          if (word.includes(letter)) num++;
        });
      });
      return num / (numWords * 5);
    }
    return num;
  }

  function setLetterAtPosition(event: any, position: number) {
    let input: string = event.target.value
      .replace(/[^A-Za-z0-9]/g, "")
      .split("");
    switch (position) {
      case 0:
        setFirstLetter(input);
        break;
      case 1:
        setSecondLetter(input);
        break;
      case 2:
        setThirdLetter(input);
        break;
      case 3:
        setFourthLetter(input);
        break;
      case 4:
        setFifthLetter(input);
        break;
    }

    let filteredWords: string[] = words ?? [];
    if (words) {
      filteredWords = words?.filter((word) => {
        return word.split("")[position] == input;
      });
    }
    setWords(filteredWords);
  }

  function setLetterWrongPosition(event: any, position: number) {
    let input: string[] = event.target.value
      .replace(/[^A-Za-z0-9]/g, "")
      .split("");
    switch (position) {
      case 0:
        setNotFirstLetter(input);
        break;
      case 1:
        setNotSecondLetter(input);
        break;
      case 2:
        setNotThirdLetter(input);
        break;
      case 3:
        setNotFourthLetter(input);
        break;
      case 4:
        setNotFifthLetter(input);
        break;
    }

    let filteredWords: string[] = words ?? [];
    if (words) {
      filteredWords = words?.filter((word) => {
        let keepWord = true;
        input.forEach((letter: string) => {
          keepWord =
            keepWord &&
            word.includes(letter) &&
            word.split("")[position] != letter;
        });
        return keepWord;
      });
    }
    setWords(filteredWords);
  }

  return (
    <div>
      <div className="input-form">
        <Form method="post">
          <div className="letter-inputs">
            <h3>Letters in Correct Position</h3>
            <label>
              First Letter:{""}
              <input
                type="text"
                name="firstLetter"
                id="firstLetter"
                maxLength={1}
                value={firstLetter}
                onChange={(e) => setLetterAtPosition(e, 0)}
              />
            </label>
            <label>
              Second Letter:{""}
              <input
                type="text"
                name="secondLetter"
                id="secondLetter"
                maxLength={1}
                value={secondLetter}
                onChange={(e) => setLetterAtPosition(e, 1)}
              />
            </label>
            <label>
              Third Letter:{""}
              <input
                type="text"
                name="thirdLetter"
                id="thirdLetter"
                maxLength={1}
                value={thirdLetter}
                onChange={(e) => setLetterAtPosition(e, 2)}
              />
            </label>
            <label>
              Fourth Letter:{""}
              <input
                type="text"
                name="fourthLetter"
                id="fourthLetter"
                maxLength={1}
                value={fourthLetter}
                onChange={(e) => setLetterAtPosition(e, 3)}
              />
            </label>
            <label>
              Fifth Letter:{""}
              <input
                type="text"
                name="fifthLetter"
                id="fifthLetter"
                maxLength={1}
                value={fifthLetter}
                onChange={(e) => setLetterAtPosition(e, 4)}
              />
            </label>
          </div>
          <div className="letter-inputs">
            <h3>Letters Included but in Wrong Position</h3>
            <label>
              First Letter:{""}
              <input
                type="text"
                name="notFirstLetter"
                id="notFirstLetter"
                value={notFirstLetter}
                onChange={(e) => setLetterWrongPosition(e, 0)}
              />
            </label>
            <label>
              Second Letter:{""}
              <input
                type="text"
                name="notSecondLetter"
                id="notSecondLetter"
                value={notSecondLetter}
                onChange={(e) => setLetterWrongPosition(e, 1)}
              />
            </label>
            <label>
              Third Letter:{""}
              <input
                type="text"
                name="notThirdLetter"
                id="notThirdLetter"
                value={notThirdLetter}
                onChange={(e) => setLetterWrongPosition(e, 2)}
              />
            </label>
            <label>
              Fourth Letter:{""}
              <input
                type="text"
                name="notFourthLetter"
                id="notFourthLetter"
                value={notFourthLetter}
                onChange={(e) => setLetterWrongPosition(e, 3)}
              />
            </label>
            <label>
              Fifth Letter:{""}
              <input
                type="text"
                name="notFifthLetter"
                id="notFifthLetter"
                value={notFifthLetter}
                onChange={(e) => setLetterWrongPosition(e, 4)}
              />
            </label>
          </div>
          <div className="includes-container">
            {/* <label>
              Includes:{" "}
              <input
                type="text"
                name="includes"
                id="includes"
                value={includes}
                onChange={(e) => handleIncludes(e)}
              />
            </label> */}
            <label>
              Does Not Include:{" "}
              <input
                type="text"
                name="dontInclude"
                id="dontInclude"
                value={dontInclude}
                onChange={(e) => handleDontInclude(e)}
              />
            </label>
          </div>
          <div className="clear-btn-container">
            <div className="clear-btn" onClick={handleClear}>
              <p>Clear</p>
            </div>
          </div>
        </Form>
      </div>
      <div className="word-list">
        {words &&
          words.map((word, id) => (
            <p className="word" key={id}>
              {word}: {calcConstellation(word).toFixed(2)}
            </p>
          ))}
      </div>
    </div>
  );
}
