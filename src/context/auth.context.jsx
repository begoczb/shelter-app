import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

const AuthContext = createContext();

const baseURL = API_URL;

const AuthContextWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
 

  const navigate = useNavigate();


  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate("/");
  };

  const authenticateUser = useCallback(() => {
    const token = getToken();

    if (!token) {
      setIsLoading(false);
      setUser(null);
      setIsLoggedIn(false);
      return;
    }

    setIsLoading(true);

    axios({
      method: "get",
      baseURL: baseURL,
      url: "/auth/verify",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { email, firstName, type } = response.data.payload;

        // console.log(`this is the payload`, response.data.payload);
        setUser({ name: firstName, userType: type });
        
        // console.log(user);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, []);

  useEffect(authenticateUser, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        setIsLoading,
        user,
        storeToken,
        removeToken,
        authenticateUser,
        logOutUser,
        getToken
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
