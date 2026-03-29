import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface CurrentUserOption {
  label: string;
  username: string;
}

const STORAGE_KEY = "trash-app-current-user";

const CURRENT_USER_OPTIONS: CurrentUserOption[] = [
  { label: "Hunter", username: "hunter" },
  { label: "Tyler", username: "Tyler Diehl" },
  { label: "Emma", username: "Emma" },
  { label: "James", username: "James" },
  { label: "Olivia", username: "Olivia" },
  { label: "Ava", username: "Ava" },
];

interface CurrentUserContextValue {
  currentUser: CurrentUserOption;
  options: CurrentUserOption[];
  setCurrentUsername: (username: string) => void;
}

const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(undefined);

function getDefaultUser() {
  return CURRENT_USER_OPTIONS[0];
}

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [currentUsername, setCurrentUsernameState] = useState(getDefaultUser().username);

  useEffect(() => {
    const savedUsername = window.localStorage.getItem(STORAGE_KEY);
    const savedOption = CURRENT_USER_OPTIONS.find((option) => option.username === savedUsername);

    if (savedOption) {
      setCurrentUsernameState(savedOption.username);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, currentUsername);
  }, [currentUsername]);

  const currentUser =
    CURRENT_USER_OPTIONS.find((option) => option.username === currentUsername) ?? getDefaultUser();

  function setCurrentUsername(username: string) {
    const nextUser =
      CURRENT_USER_OPTIONS.find((option) => option.username === username) ?? getDefaultUser();

    setCurrentUsernameState(nextUser.username);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        options: CURRENT_USER_OPTIONS,
        setCurrentUsername,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return context;
}
