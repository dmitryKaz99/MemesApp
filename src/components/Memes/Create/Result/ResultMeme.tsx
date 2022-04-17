import { useClipboard } from "use-clipboard-copy";
import { FC, MouseEvent, useEffect } from "react";
import s from "../../Memes.module.scss";

interface IResultMeme {
  newMeme: string | null;
  setVisible: (flag: boolean) => void;
}

const ResultMeme: FC<IResultMeme> = ({ newMeme, setVisible }) => {
  const clipboard = useClipboard(),
    copyHandler = (e: MouseEvent) => {
      const btn = e.target as HTMLInputElement;
      btn.innerHTML = "Copied";
      btn.disabled = true;

      clipboard.copy(newMeme);
    };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!newMeme) return <p>Sorry, no result!</p>;
  return (
    <>
      <div className={s.result_meme}>
        <img
          className={s.picture + " " + s.picture_big}
          src={newMeme}
          alt="result_img"
        />
        <button onClick={copyHandler}>Copy</button>
      </div>
    </>
  );
};

export default ResultMeme;
