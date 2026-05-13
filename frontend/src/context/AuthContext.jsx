import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  // Check localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Save login state
  useEffect(() => {

    localStorage.setItem(
      "isLoggedIn",
      isLoggedIn
    );

  }, [isLoggedIn]);

  // Login Function
  const login = (email, password) => {

    if (
      email === "admin@supportsphere.com" &&
      password === "123456"
    ) {

      setIsLoggedIn(true);

      return true;
    }

    return false;
  };

  // Logout Function
  const logout = () => {

    setIsLoggedIn(false);

    localStorage.removeItem("isLoggedIn");

  };

  return (

    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export default AuthProvider;