import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CursorLocked {
  locked: boolean, 
  x: number, 
  y: number
}

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    prevRoute: '',
    isWebpSupported: true,
    language: '',
    cursorSpinner: false,
    cursorState: 'default',
    cursorLocked: {
      locked: false,
      x: 0,
      y: 0
    }  
  },
  reducers: {
    setPrevRoute(state, action: PayloadAction<string>) {
      state.prevRoute = action.payload;
    },
    setIsWebpSupported(state, action: PayloadAction<boolean>) {
      state.isWebpSupported = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setCursorSpinner(state, action: PayloadAction<boolean>) {
      state.cursorSpinner = action.payload;
    },
    setCursorState(state, action: PayloadAction<string>) {
      state.cursorState = action.payload;
    },
    setCursorLocked(state, action: PayloadAction<CursorLocked>) {
      state.cursorLocked = action.payload;
    }
  }
});

export const { setPrevRoute, setIsWebpSupported, setLanguage, setCursorSpinner, setCursorState, setCursorLocked } = actions;

export const store = configureStore({ reducer });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
