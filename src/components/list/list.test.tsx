import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../../slices/charactersSlice';
import { AnyCharacter } from '../../models/character';
import { useCharacters } from '../../hooks/useCharacters';

jest.mock('../../hooks/useCharacters');

describe('Given...', () => {
  describe('When we instantiate', () => {
    const store = configureStore({
      reducer: {
        charactersState: characterReducer,
      },
      preloadedState: {
        charactersState: {
          characters: [{ id: 1 } as AnyCharacter],
          charactersstateoption: 'idle',
        },
      },
    });

    const mockUseCharacters = useCharacters as jest.Mock;
    const loadCharacters = jest.fn();

    // Simula el comportamiento del gancho useCharacters
    mockUseCharacters.mockReturnValue({
      characters: [{ id: 1, name: 'Character 1' } as AnyCharacter], // Define los datos esperados
      loadCharacters,
    });

    render(
      <Provider store={store}>
        <List></List>
      </Provider>
    );
    test('It should be...', () => {
      const elements = screen.getAllByRole('list');

      elements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      expect(loadCharacters).toHaveBeenCalled();
    });
  });
});
