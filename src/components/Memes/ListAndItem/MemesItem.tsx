import { FC } from "react";
import { IMeme } from "../../../typesAndInterfaces/interfaces";
import s from "../Memes.module.scss";

interface IMemesList {
  m: IMeme;
  index: number;
  createCustomMeme: (selectedMeme: IMeme) => void;
  likeHandler: (id: number) => void;
}

const MemesItem: FC<IMemesList> = ({
  m,
  index,
  createCustomMeme,
  likeHandler,
}) => {
  const { id, name, url, like } = m;

  return (
    <>
      <div className={s.meme} key={id}>
        <div className={s.meme_wrapper}>
          <div className={s.top}>{++index}</div>

          <div className={s.desc}>
            <p className={s.title}>{name}</p>
            <img className={s.picture} src={url} alt={`img_withID:${id}`} />
          </div>

          <div>
            <button onClick={() => createCustomMeme(m)}>Create</button>
            <button
              onClick={() => likeHandler(id)}
              className={like && s.btn_like}
              title={"like"}
            >
              &#10084;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemesItem;
