import React from 'react';
import { render } from '@testing-library/react-native';
import Header from './Header';

describe('Header Component', () => {
  const defaultProps = {
    playerNames: {
      player1: 'Gracz 1',
      player2: 'Gracz 2',
    },
    scores: {
      player1: 5,
      player2: 3,
    },
    currentPlayer: 1,
    gameStarted: true,
    isPhone: true,
    topCutout: 20,
  };

  it('renders correctly with default props', () => {
    const { getByText } = render(<Header {...defaultProps} />);

    expect(getByText('Gracz 1')).toBeTruthy();
    expect(getByText('Gracz 2')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText(':')).toBeTruthy();
  });

  it('displays correct player names', () => {
    const { getByText } = render(<Header {...defaultProps} />);

    expect(getByText(defaultProps.playerNames.player1)).toBeTruthy();
    expect(getByText(defaultProps.playerNames.player2)).toBeTruthy();
  });

  it('displays correct scores', () => {
    const { getByText } = render(<Header {...defaultProps} />);

    expect(getByText('5')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('highlights player 1 when they are the current player', () => {
    const { getByText } = render(<Header {...defaultProps} currentPlayer={1} />);

    const player1Name = getByText('Gracz 1');
    expect(player1Name).toBeTruthy();
  });

  it('highlights player 2 when they are the current player', () => {
    const { getByText } = render(<Header {...defaultProps} currentPlayer={2} />);

    const player2Name = getByText('Gracz 2');
    expect(player2Name).toBeTruthy();
  });

  it('does not highlight any player when game has not started', () => {
    const { getByText } = render(<Header {...defaultProps} gameStarted={false} />);

    expect(getByText('Gracz 1')).toBeTruthy();
    expect(getByText('Gracz 2')).toBeTruthy();
  });

  it('handles score of 0 correctly', () => {
    const props = {
      ...defaultProps,
      scores: {
        player1: 0,
        player2: 0,
      },
    };

    const { getAllByText } = render(<Header {...props} />);
    const zeros = getAllByText('0');

    expect(zeros.length).toBe(2);
  });

  it('handles high scores correctly', () => {
    const props = {
      ...defaultProps,
      scores: {
        player1: 99,
        player2: 88,
      },
    };

    const { getByText } = render(<Header {...props} />);

    expect(getByText('99')).toBeTruthy();
    expect(getByText('88')).toBeTruthy();
  });

  it('applies correct padding for phone', () => {
    const { toJSON } = render(<Header {...defaultProps} isPhone={true} />);

    expect(toJSON()).toBeTruthy();
  });

  it('applies correct padding for tablet', () => {
    const { toJSON } = render(<Header {...defaultProps} isPhone={false} />);

    expect(toJSON()).toBeTruthy();
  });

  it('applies correct top cutout padding', () => {
    const { toJSON } = render(<Header {...defaultProps} topCutout={50} />);

    expect(toJSON()).toBeTruthy();
  });

  it('handles long player names', () => {
    const props = {
      ...defaultProps,
      playerNames: {
        player1: 'Bardzo Długa Nazwa Gracza Pierwszego',
        player2: 'Bardzo Długa Nazwa Gracza Drugiego',
      },
    };

    const { getByText } = render(<Header {...props} />);

    expect(getByText('Bardzo Długa Nazwa Gracza Pierwszego')).toBeTruthy();
    expect(getByText('Bardzo Długa Nazwa Gracza Drugiego')).toBeTruthy();
  });

  it('renders separator between scores', () => {
    const { getByText } = render(<Header {...defaultProps} />);

    expect(getByText(':')).toBeTruthy();
  });

  it('handles player switch correctly', () => {
    const { getByText, rerender } = render(
      <Header {...defaultProps} currentPlayer={1} />
    );

    expect(getByText('Gracz 1')).toBeTruthy();

    rerender(<Header {...defaultProps} currentPlayer={2} />);

    expect(getByText('Gracz 2')).toBeTruthy();
  });

  it('displays both players even when one has no score', () => {
    const props = {
      ...defaultProps,
      scores: {
        player1: 10,
        player2: 0,
      },
    };

    const { getByText } = render(<Header {...props} />);

    expect(getByText('10')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
  });

  it('handles equal scores', () => {
    const props = {
      ...defaultProps,
      scores: {
        player1: 7,
        player2: 7,
      },
    };

    const { getAllByText } = render(<Header {...props} />);
    const sevens = getAllByText('7');

    expect(sevens.length).toBe(2);
  });
});
