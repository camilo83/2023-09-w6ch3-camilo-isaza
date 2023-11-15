import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../services/api.repo';
import { AnyCharacter } from '../models/character';

export const loadCharactersThunk = createAsyncThunk<AnyCharacter[], ApiRepo>(
  'AnyCharacters/load',
  async (repo) => {
    const Characters = await repo.getCharacters();
    return Characters;
  }
);

export const updateCharacterThunk = createAsyncThunk<
  AnyCharacter,
  {
    repo: ApiRepo;
    id: AnyCharacter['id'];
    updatedCharacter: Partial<AnyCharacter>;
  }
>('AnyCharacters/update', async ({ repo, id, updatedCharacter }) => {
  const finalCharacter = await repo.updateCharacter(id, updatedCharacter);
  return finalCharacter;
});
