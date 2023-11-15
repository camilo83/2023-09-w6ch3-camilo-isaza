import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Card } from './card';
import { AnyCharacter } from '../../models/character';

describe('Given...', () => {
  describe('When we instantiate', () => {
    const character = {
      id: 1,
      name: 'bronn',
      family: 'Some Family',
      age: 30,
      isAlive: true,
      category: 'fighter',
      reignYears: 5,
      weapon: 'Sword', // Añade datos específicos para las líneas faltantes
      adviseTo: { name: 'King' }, // Añade datos específicos para las líneas faltantes
      servesTo: { name: 'Queen' }, // Añade datos específicos para las líneas faltantes
    };

    render(
      <Provider store={store}>
        <Card character={character as unknown as AnyCharacter} />
      </Provider>
    );

    test('It should be in the document', () => {
      const element = screen.getByText('bronn Some Family');
      expect(element).toBeInTheDocument();

      // Verifica que la imagen tenga el atributo alt correcto
      const image = screen.getByAltText('bronn Some Family');
      expect(image).toBeInTheDocument();

      // Verifica que los datos adicionales estén presentes en la lista
      const ageElement = screen.getByText('Edad: 30 años');
      expect(ageElement).toBeInTheDocument();

      const reignYearsElement = screen.getByText('Años de reinado: 5');
      expect(reignYearsElement).toBeInTheDocument();

      const deadButton = screen.getByText('muere');
      expect(deadButton).toBeInTheDocument();
    });
  });
});

describe('Given...', () => {
  describe('When we instantiate', () => {
    test('It should be in the document', () => {
      const character = {
        id: 1,
        name: 'bronn',
        family: 'Some Family',
        age: 30,
        isAlive: true,
        category: 'fighter',
        weapon: 'Sword',
        adviseTo: { name: 'King' },
        servesTo: { name: 'Queen' },
      };

      render(
        <Provider store={store}>
          <Card character={character as unknown as AnyCharacter} />
        </Provider>
      );

      const weaponElement = screen.getByText('Arma: Sword');
      expect(weaponElement).toBeInTheDocument();
    });
  });
});

describe('Given...', () => {
  describe('When we instantiate', () => {
    test('It should be in the document', () => {
      const character = {
        id: 1,
        name: 'bronn',
        family: 'Some Family',
        age: 30,
        isAlive: true,
        category: 'hola',
        adviseTo: { name: 'King' },
        servesTo: { name: 'Queen' },
      };

      render(
        <Provider store={store}>
          <Card character={character as unknown as AnyCharacter} />
        </Provider>
      );

      const adviseToElement = screen.getByText('Sirve a: King');
      expect(adviseToElement).toBeInTheDocument();
    });
  });
});

describe('Given...', () => {
  describe('When we instantiate', () => {
    test('It should be in the document', () => {
      const character = {
        id: 1,
        name: 'bronn',
        family: 'Some Family',
        age: 30,
        isAlive: true,
        category: 'adviser',

        servesTo: { name: 'Queen' },
      };

      render(
        <Provider store={store}>
          <Card character={character as unknown as AnyCharacter} />
        </Provider>
      );
      const servesToElement = screen.getByText('Asesora a: Queen');
      expect(servesToElement).toBeInTheDocument();
    });
  });
});
