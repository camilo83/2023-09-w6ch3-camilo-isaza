import { useCallback, useMemo } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useDispatch, useSelector } from 'react-redux';

import { AnyCharacter } from '../models/character';
import {
  loadCharactersThunk,
  updateCharacterThunk,
} from '../slices/charactersThunks';
import { AppDispatch, RootState } from '../store/store';

export function useCharacters() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, charactersstateoption } = useSelector(
    (state: RootState) => state.charactersState
  );

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      dispatch(loadCharactersThunk(repo));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);

  const updateCharacter = async (
    id: AnyCharacter['id'],
    character: Partial<AnyCharacter>
  ) => {
    try {
      dispatch(
        updateCharacterThunk({
          id,
          repo,
          updatedCharacter: character,
        })
      );
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    loadCharacters,
    updateCharacter,
    characters,
    charactersstateoption,
  };
}
