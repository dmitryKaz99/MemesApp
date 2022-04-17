import { SearchContext, FavoriteContext } from "../components/context";
import { useState } from "react";

const withProviderContext = (Component: any) => (props: any) => {
  const [search, setSearch] = useState<string>(""),
    [favorite, setFavorite] = useState<boolean>(false);

  return (
    <>
      <SearchContext.Provider value={{ search, setSearch }}>
        <FavoriteContext.Provider value={{ favorite, setFavorite }}>
          <Component {...props} />
        </FavoriteContext.Provider>
      </SearchContext.Provider>
    </>
  );
};

export default withProviderContext;
