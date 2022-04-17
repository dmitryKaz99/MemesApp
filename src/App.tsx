import { FC } from "react";
import Header from "./components/Header/Header";
import Memes from "./components/Memes/Memes";
import withProviderContext from "./hoc/withProviderContext";

const App: FC = () => {
  return (
    <>
      <Header />
      <Memes />
    </>
  );
};

export default withProviderContext(App);
