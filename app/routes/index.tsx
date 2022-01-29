import WordInput from "~/components/WordInput";
import type { LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div
      className="container"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <h1>Wordle Help App</h1>
      <WordInput />
    </div>
  );
}
