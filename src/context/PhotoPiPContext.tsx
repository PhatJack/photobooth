"use client";
import {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useReducer,
} from "react";

interface InitialState {
  isStarted: boolean;
  isFinished: boolean;
}

const initialState: InitialState = {
  isStarted: false,
  isFinished: false,
};

type PhotoPiPAction =
  | { type: "START"; payload: boolean }
  | { type: "FINISH"; payload: boolean };

const PhotoPiPContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<PhotoPiPAction>;
} | null>(null);
const reducer = (state: InitialState, action: PhotoPiPAction) => {
  switch (action.type) {
    case "START":
      return { ...state, isStarted: action.payload };
    case "FINISH":
      return { ...state, isFinished: action.payload };
    default:
      return state;
  }
};

export const PhotoPiPProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <PhotoPiPContext.Provider value={value}>
      {children}
    </PhotoPiPContext.Provider>
  );
};

export const usePhotoPiPContext = (): [
  InitialState,
  Dispatch<PhotoPiPAction>
] => {
  const context = useContext(PhotoPiPContext);
  if (!context) {
    throw new Error(
      "usePhotoPiPContext must be used within a PhotoPiPProvider"
    );
  }
  return [context.state, context.dispatch];
};
