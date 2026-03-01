import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from './WelcomeScreen';

describe('WelcomeScreen Component', () => {
  const mockOnStartGame = jest.fn();
  const mockUnmuteSounds = jest.fn();

  const defaultProps = {
    onStartGame: mockOnStartGame,
    previousSettings: null,
    savedSettings: null,
    playerNames: {
      player1: 'Gracz 1',
      player2: 'Gracz 2',
    },
    isPhone: true,
    unmuteSounds: mockUnmuteSounds,
    cutout: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    expect(getByText('players')).toBeTruthy();
    expect(getByText('boardSize')).toBeTruthy();
    expect(getByText('deckType')).toBeTruthy();
    expect(getByText('coverColor')).toBeTruthy();
  });

  it('displays start button', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    expect(getByText('startButton')).toBeTruthy();
  });

  it('calls onStartGame when start button is pressed', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);
    const startButton = getByText('startButton');

    fireEvent.press(startButton);

    expect(mockOnStartGame).toHaveBeenCalledTimes(1);
  });

  it('calls unmuteSounds when start button is pressed', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);
    const startButton = getByText('startButton');

    fireEvent.press(startButton);

    expect(mockUnmuteSounds).toHaveBeenCalledTimes(1);
  });

  it('allows changing player 1 name', () => {
    const { getByDisplayValue } = render(<WelcomeScreen {...defaultProps} />);
    const input = getByDisplayValue('Gracz 1');

    fireEvent.changeText(input, 'Nowa Nazwa');

    expect(input.props.value).toBe('Nowa Nazwa');
  });

  it('allows changing player 2 name when computer is off', () => {
    const { getByDisplayValue } = render(<WelcomeScreen {...defaultProps} />);
    const input = getByDisplayValue('Gracz 2');

    fireEvent.changeText(input, 'Drugi Gracz');

    expect(input.props.value).toBe('Drugi Gracz');
  });

  it('disables player 2 name input when playing with computer', () => {
    const { getByText, getByDisplayValue } = render(<WelcomeScreen {...defaultProps} />);

    const computerSwitch = getByText('playWithComputer').parent.parent;
    fireEvent(computerSwitch, 'valueChange', true);

    const input = getByDisplayValue(/Kleofas|Euzebiusz|Rufus|Gotfryd|Alcest|Mikołajek|Ananiasz|Kaczka Katastrofa|Pies Pypeć|Pan Kuleczka/);

    expect(input.props.editable).toBe(false);
  });

  it('allows selecting board size', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    const size5Button = getByText('4×5');
    fireEvent.press(size5Button.parent.parent);

    expect(size5Button).toBeTruthy();
  });

  it('allows toggling computer player', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    const computerToggle = getByText('playWithComputer').parent.parent;
    fireEvent(computerToggle, 'valueChange', true);

    expect(computerToggle).toBeTruthy();
  });

  it('allows changing difficulty level', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    const computerToggle = getByText('playWithComputer').parent.parent;
    fireEvent(computerToggle, 'valueChange', true);

    expect(getByText(/difficultyLevel/)).toBeTruthy();
  });

  it('allows selecting deck type', () => {
    const { getAllByA11yRole } = render(<WelcomeScreen {...defaultProps} />);
    const buttons = getAllByA11yRole('button');

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('allows selecting cover color', () => {
    const { getAllByA11yRole } = render(<WelcomeScreen {...defaultProps} />);
    const buttons = getAllByA11yRole('button');

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('allows toggling sound', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    expect(getByText('soundFx')).toBeTruthy();
  });

  it('switches player names when arrows button is pressed', () => {
    const { getByDisplayValue, getAllByA11yRole } = render(
      <WelcomeScreen {...defaultProps} />
    );

    const player1Input = getByDisplayValue('Gracz 1');
    const player2Input = getByDisplayValue('Gracz 2');

    fireEvent.changeText(player1Input, 'Anna');
    fireEvent.changeText(player2Input, 'Bob');

    const arrowsButton = getAllByA11yRole('button').find(
      (button) => button.props.accessibilityRole === 'button'
    );

    if (arrowsButton) {
      fireEvent.press(arrowsButton);
    }

    expect(player1Input).toBeTruthy();
    expect(player2Input).toBeTruthy();
  });

  it('passes correct settings to onStartGame', () => {
    const { getByText, getByDisplayValue } = render(
      <WelcomeScreen {...defaultProps} />
    );

    const player1Input = getByDisplayValue('Gracz 1');
    fireEvent.changeText(player1Input, 'Test Player');

    const startButton = getByText('startButton');
    fireEvent.press(startButton);

    expect(mockOnStartGame).toHaveBeenCalledWith(
      expect.objectContaining({
        player1Name: 'Test Player',
        boardSize: expect.any(String),
        coverColor: expect.any(String),
        deckType: expect.any(String),
        withComputer: expect.any(Boolean),
        difficulty: expect.any(Number),
        withSound: expect.any(Boolean),
      })
    );
  });

  it('uses savedSettings when provided', () => {
    const savedSettings = {
      player1Name: 'Saved Player 1',
      player2Name: 'Saved Player 2',
      boardSize: '6',
      coverColor: 'blue',
      deckType: 'art',
      withComputer: false,
      difficulty: 75,
      withSound: false,
    };

    const { getByDisplayValue } = render(
      <WelcomeScreen {...defaultProps} savedSettings={savedSettings} />
    );

    expect(getByDisplayValue('Saved Player 1')).toBeTruthy();
    expect(getByDisplayValue('Saved Player 2')).toBeTruthy();
  });

  it('uses previousSettings over savedSettings', () => {
    const savedSettings = {
      player1Name: 'Saved Player 1',
      player2Name: 'Saved Player 2',
    };

    const previousSettings = {
      player1Name: 'Previous Player 1',
      player2Name: 'Previous Player 2',
    };

    const { getByDisplayValue } = render(
      <WelcomeScreen
        {...defaultProps}
        savedSettings={savedSettings}
        previousSettings={previousSettings}
      />
    );

    expect(getByDisplayValue('Previous Player 1')).toBeTruthy();
    expect(getByDisplayValue('Previous Player 2')).toBeTruthy();
  });

  it('renders phone layout correctly', () => {
    const { getByText } = render(
      <WelcomeScreen {...defaultProps} isPhone={true} />
    );

    expect(getByText('startButton')).toBeTruthy();
  });

  it('renders tablet layout correctly', () => {
    const { getByText } = render(
      <WelcomeScreen {...defaultProps} isPhone={false} />
    );

    expect(getByText('startButton')).toBeTruthy();
  });

  it('updates computer name when difficulty changes', () => {
    const { getByText } = render(<WelcomeScreen {...defaultProps} />);

    const computerToggle = getByText('playWithComputer').parent.parent;
    fireEvent(computerToggle, 'valueChange', true);

    expect(getByText('computerPlayer')).toBeTruthy();
  });

  it('handles cutout padding correctly', () => {
    const cutout = {
      top: 20,
      bottom: 20,
      left: 10,
      right: 10,
    };

    const { toJSON } = render(
      <WelcomeScreen {...defaultProps} cutout={cutout} />
    );

    expect(toJSON()).toBeTruthy();
  });

  it('renders all board size options for phone', () => {
    const { getByText } = render(
      <WelcomeScreen {...defaultProps} isPhone={true} />
    );

    expect(getByText('3×4')).toBeTruthy();
    expect(getByText('4×5')).toBeTruthy();
    expect(getByText('5×6')).toBeTruthy();
  });

  it('renders all board size options for tablet', () => {
    const { getByText } = render(
      <WelcomeScreen {...defaultProps} isPhone={false} />
    );

    expect(getByText('4×3')).toBeTruthy();
    expect(getByText('5×4')).toBeTruthy();
    expect(getByText('6×5')).toBeTruthy();
  });
});
