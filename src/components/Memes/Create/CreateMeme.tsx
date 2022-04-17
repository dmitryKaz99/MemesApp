import MemesServices from "../../../api/MemesServices";
import FormMeme from "./Form/FormMeme";
import ResultMeme from "./Result/ResultMeme";
import { Status } from "../../../UI/Status/Status";
import { FC, FormEvent, useEffect, useState } from "react";
import { TInputText } from "../../../typesAndInterfaces/types";
import { IMeme } from "../../../typesAndInterfaces/interfaces";

interface ICreateMeme {
  currentMeme: IMeme | null;
  setVisible: (flag: boolean) => void;
}

const CreateMeme: FC<ICreateMeme> = ({ currentMeme, setVisible }) => {
  const [newMeme, setNewMeme] = useState<string | null>(null),
    [isMemeLoading, setIsMemeLoading] = useState<boolean>(false),
    [errMeme, setErrMeme] = useState<string>("");

  const [text, setText] = useState<TInputText>({ top: "", bottom: "" });

  useEffect(() => setNewMeme(null), [currentMeme]);
  const getCustomMeme = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsMemeLoading(true);

      const { url } = await MemesServices.postMeme(
        currentMeme!.id,
        text.top,
        text.bottom
      );
      setNewMeme(url);
    } catch (e: any) {
      setErrMeme(e.message);
    } finally {
      setIsMemeLoading(false);
      setText({ top: "", bottom: "" });
    }
  };

  return (
    <div>
      {isMemeLoading || errMeme || newMeme ? (
        <>
          {isMemeLoading ? (
            <Status>LOADING...</Status>
          ) : errMeme ? (
            <Status>{errMeme}...</Status>
          ) : (
            <ResultMeme newMeme={newMeme} setVisible={setVisible} />
          )}
        </>
      ) : (
        <FormMeme
          currentMeme={currentMeme}
          text={text}
          setText={setText}
          getCustomMeme={getCustomMeme}
        />
      )}
    </div>
  );
};

export default CreateMeme;
