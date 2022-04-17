import MemesServices from "../../api/MemesServices";
import Modal from "../../UI/Modal/Modal";
import CreateMeme from "./Create/CreateMeme";
import MemesList from "./ListAndItem/MemesList";
import { Status } from "../../UI/Status/Status";
import { SearchContext } from "../context";
import { useState, useEffect, useContext, useMemo, FC } from "react";
import { IMeme } from "../../typesAndInterfaces/interfaces";
import s from "./Memes.module.scss";

const Memes: FC = () => {
  const [memes, setMemes] = useState<IMeme[]>([]),
    [isMemesLoading, setIsMemesLoading] = useState<boolean>(false),
    [errMemes, setErrMemes] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false),
    [currentMeme, setCurrentMeme] = useState<IMeme | null>(null);

  const { search } = useContext(SearchContext),
    [memesFilter, setMemesFilter] = useState<IMeme[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setIsMemesLoading(true);

        const { memes } = await MemesServices.getMemes();
        setMemes(memes);
      } catch (e: any) {
        setErrMemes(e.message);
      } finally {
        setIsMemesLoading(false);
      }
    };

    fetchMemes();
  }, []);

  useMemo(() => {
    setMemesFilter(
      memes.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    );
  }, [memes, search]);

  const createCustomMeme = (selectedMeme: IMeme) => {
    setModal(true);
    setCurrentMeme(selectedMeme);
  };

  return (
    <section className={s.memes}>
      <Modal visible={modal} setVisible={setModal}>
        <CreateMeme currentMeme={currentMeme} setVisible={setModal} />
      </Modal>

      {isMemesLoading ? (
        <Status>LOADING...</Status>
      ) : errMemes ? (
        <Status>{errMemes}...</Status>
      ) : (
        <MemesList memes={memesFilter} createCustomMeme={createCustomMeme} />
      )}
    </section>
  );
};

export default Memes;
