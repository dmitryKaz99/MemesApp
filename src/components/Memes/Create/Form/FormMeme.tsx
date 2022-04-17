import { ChangeEvent, FC, FormEvent } from "react";
import { IMeme } from "../../../../typesAndInterfaces/interfaces";
import { TInputText } from "../../../../typesAndInterfaces/types";
import s from "../../Memes.module.scss";

interface IFormMeme {
  currentMeme: IMeme | null;
  text: TInputText;
  setText: (text: TInputText) => void;
  getCustomMeme: (e: FormEvent) => void;
}

const FormMeme: FC<IFormMeme> = ({
  currentMeme,
  text,
  setText,
  getCustomMeme,
}) => {
  return (
    <>
      <div>
        {currentMeme?.like && <p className={s.favorite}>Favorite</p>}
        <img
          className={s.picture + " " + s.picture_big}
          src={currentMeme?.url}
          alt="form_img"
        />
      </div>

      <form onSubmit={getCustomMeme}>
        <div className={s.form_meme}>
          <div className={s.form_inputs}>
            <input
              type="text"
              value={text.top}
              placeholder="Top text"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText({ ...text, top: e.target.value })
              }
            ></input>
            <input
              type="text"
              value={text.bottom}
              placeholder="Bottom text"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText({ ...text, bottom: e.target.value })
              }
            ></input>
          </div>

          <button>Generate</button>
        </div>
      </form>
    </>
  );
};

export default FormMeme;
