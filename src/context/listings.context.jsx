import { useState } from "react";

const { createContext } = require("react");

const ListingsContext = createContext();

const ListingsContextWrapper = ({ children }) => {
  const [listings, setListings] = useState(null);

  return (
    <ListingsContext.Provider
      value={{
        listings,
        setListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export { ListingsContext, ListingsContextWrapper };
