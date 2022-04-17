import searchIcon from "../../assets/img/search.svg";
import { FavoriteContext, SearchContext } from "../context";
import { useRef, useContext, FC, ChangeEvent } from "react";
import s from "./Header.module.scss";

const Header: FC = () => {
  const refHeader = useRef<HTMLInputElement>(null);

  const { search, setSearch } = useContext(SearchContext),
    { favorite, setFavorite } = useContext(FavoriteContext);

  return (
    <>
      <div ref={refHeader} />
      <header className={s.header}>
        <div>
          <h1
            className={s.title}
            onClick={() =>
              refHeader.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Creating memes
          </h1>
        </div>

        <div className={s.box}>
          <div className={s.search}>
            <input
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className={s.search_input}
            />
            <img className={s.search_icon} src={searchIcon} alt="search_icon" />
          </div>

          <div>
            <button
              className={
                favorite
                  ? [s.favorite_btn + " " + s.favorite_active]
                  : s.favorite_btn
              }
              onClick={() => setFavorite(!favorite)}
            >
              Favorites
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
