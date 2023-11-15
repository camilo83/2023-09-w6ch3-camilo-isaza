import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnyCharacter } from '../models/character';
import { loadCharactersThunk, updateCharacterThunk } from './charactersThunks';

type CharactersState = {
  characters: AnyCharacter[];
  charactersstateoption: 'idle' | 'loading' | 'error';
};

const initialState: CharactersState = {
  characters: [],
  charactersstateoption: 'idle',
};
const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCharactersThunk.pending, (state: CharactersState) => {
      state.charactersstateoption = 'loading';
      return state;
    }),
      builder.addCase(
        loadCharactersThunk.fulfilled,
        (
          state: CharactersState,
          { payload }: PayloadAction<AnyCharacter[]>
        ) => {
          state.characters = payload;
          state.charactersstateoption = 'idle';
          return state;
        }
      ),
      builder.addCase(
        loadCharactersThunk.rejected,
        (state: CharactersState) => {
          state.charactersstateoption = 'error';
          return state;
        }
      ),
      builder.addCase(
        updateCharacterThunk.fulfilled,
        (state: CharactersState, { payload }: PayloadAction<AnyCharacter>) => {
          state.characters[
            state.characters.findIndex((item) => item.id === payload.id)
          ] = payload;
          return state;
        }
      );
  },
});

export default charactersSlice.reducer;
