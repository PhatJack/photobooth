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
  images: string[];
  isMirrored: boolean;
  maxImages: number;
}

const initialState: InitialState = {
  isStarted: false,
  isFinished: false,
  images: [],
  isMirrored: true,
  maxImages: 4,
};

type PhotoPiPAction =
  | { type: "START"; payload: boolean }
  | { type: "FINISH"; payload: boolean }
  | { type: "ADD_IMAGE"; payload: string }
  | { type: "CLEAR_IMAGES" }
  | { type: "SET_MIRRORED"; payload: boolean }
  | { type: "SET_MAX_IMAGES"; payload: number };

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
    case "ADD_IMAGE":
      return { ...state, images: [...state.images, action.payload] };
    case "CLEAR_IMAGES":
      return { ...state, images: [] };
    case "SET_MIRRORED":
      return { ...state, isMirrored: action.payload };
    case "SET_MAX_IMAGES":
      return { ...state, maxImages: action.payload };
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
