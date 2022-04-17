import MemesItem from "./MemesItem";
import { FavoriteContext } from "../../context";
import { useState, useEffect, useContext, useMemo, FC } from "react";
import s from "../Memes.module.scss";
import { IMeme } from "../../../typesAndInterfaces/interfaces";

interface IMemesList {
  memes: IMeme[];
  createCustomMeme: (selectedMeme: IMeme) => void;
}

const MemesList: FC<IMemesList> = ({ memes, createCustomMeme }) => {
  const LOCAL_STORAGE_KEY: string = "FavoritesMemesByID";

  const [arrGlobal, setArrGlobal] = useState<Array<number>>([]),
    [memesWithLikes, setMemesWithLikes] = useState<IMeme[]>([]);

  const { favorite } = useContext(FavoriteContext),
    [memesFavorites, setMemesFavorites] = useState<IMeme[]>([]);

  useEffect(() => {
    const arrLocal = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    setArrGlobal(arrLocal);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arrGlobal));
  }, [arrGlobal]);

  useMemo(() => {
    setMemesWithLikes(
      memes.map((m) => {
        if (arrGlobal.indexOf(m.id) !== -1) return { ...m, like: true };
        return m;
      })
    );
  }, [memes, arrGlobal]);
  useMemo(() => {
    setMemesFavorites(
      memesWithLikes.filter((m) => {
        if (favorite) return m.hasOwnProperty("like");
        return m;
      })
    );
  }, [memesWithLikes, favorite]);

  const likeHandler = (id: number) => {
    arrGlobal!.indexOf(id) === -1
      ? setArrGlobal([...arrGlobal, id])
      : setArrGlobal(arrGlobal.filter((currentId) => currentId !== id));
  };

  if (!memesFavorites.length)
    return (
      <p>
        <b>Memes</b> not found...
      </p>
    );
  return (
    <div className={s.memes_wrapper}>
      {memesFavorites.map((m, index) => {
        return (
          <MemesItem
            key={m.id}
            m={m}
            index={index}
            createCustomMeme={createCustomMeme}
            likeHandler={likeHandler}
          />
        );
      })}
    </div>
  );
};

export default MemesList;
