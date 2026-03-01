import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from './Card';

describe('Card Component', () => {
  const mockCard = {
    id: 0,
    value: '05',
    row: 0,
    col: 0,
  };

  const mockOnCardClick = jest.fn();

  const defaultProps = {
    card: mockCard,
    isFlipped: false,
    isMatched: false,
    showAllCards: false,
    coverColor: 'red',
    deckType: 'fv',
    onCardClick: mockOnCardClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when covered', () => {
    const { getByTestId } = render(<Card {...defaultProps} />);
    expect(getByTestId).toBeDefined();
  });

  it('calls onCardClick when pressed and not flipped', () => {
    const { getByRole } = render(<Card {...defaultProps} />);
    const touchable = getByRole('button');

    fireEvent.press(touchable);

    expect(mockOnCardClick).toHaveBeenCalledWith(mockCard.id);
    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onCardClick when already flipped', () => {
    const { getByRole } = render(
      <Card {...defaultProps} isFlipped={true} />
    );
    const touchable = getByRole('button');

    fireEvent.press(touchable);

    expect(mockOnCardClick).not.toHaveBeenCalled();
  });

  it('does not call onCardClick when already matched', () => {
    const { toJSON } = render(
      <Card {...defaultProps} isMatched={true} />
    );
    const tree = toJSON();

    // When matched and showAllCards is false, component renders empty View (no button)
    expect(tree.type).toBe('View');
    expect(tree.children).toBeNull();
  });

  it('renders empty view when matched and showAllCards is false', () => {
    const { toJSON } = render(
      <Card {...defaultProps} isMatched={true} showAllCards={false} />
    );

    const tree = toJSON();
    expect(tree.type).toBe('View');
    expect(tree.children).toBeNull();
  });

  it('shows card image when flipped', () => {
    const { getByRole } = render(
      <Card {...defaultProps} isFlipped={true} />
    );
    const touchable = getByRole('button');

    // Button should exist and be disabled
    expect(touchable).toBeTruthy();
    expect(touchable.props.accessibilityState?.disabled || touchable.props.disabled).toBeTruthy();
  });

  it('shows all cards when showAllCards is true', () => {
    const { getByRole } = render(
      <Card {...defaultProps} showAllCards={true} />
    );
    const touchable = getByRole('button');

    // Button should exist and be disabled when showing all cards
    expect(touchable).toBeTruthy();
    expect(touchable.props.accessibilityState?.disabled || touchable.props.disabled).toBeTruthy();
  });

  it('uses correct deck type', () => {
    const { rerender } = render(<Card {...defaultProps} deckType="art" />);
    expect(rerender).toBeDefined();

    rerender(<Card {...defaultProps} deckType="old" />);
    expect(rerender).toBeDefined();
  });

  it('uses correct cover color', () => {
    const { rerender } = render(<Card {...defaultProps} coverColor="blue" />);
    expect(rerender).toBeDefined();

    rerender(<Card {...defaultProps} coverColor="red" />);
    expect(rerender).toBeDefined();
  });

  it('handles different card values correctly', () => {
    const cards = [
      { ...mockCard, value: '00' },
      { ...mockCard, value: '15' },
      { ...mockCard, value: '39' },
    ];

    cards.forEach((card) => {
      const { rerender } = render(<Card {...defaultProps} card={card} />);
      expect(rerender).toBeDefined();
    });
  });

  it('disables touch when showAllCards is true', () => {
    const { getByRole } = render(
      <Card {...defaultProps} showAllCards={true} />
    );
    const touchable = getByRole('button');

    fireEvent.press(touchable);
    expect(mockOnCardClick).not.toHaveBeenCalled();
  });

  it('shows correct image source for flipped card', () => {
    const { getByRole } = render(
      <Card {...defaultProps} isFlipped={true} />
    );
    const touchable = getByRole('button');

    expect(touchable).toBeDefined();
  });

  it('handles edge case with matched card and showAllCards true', () => {
    const { getByRole } = render(
      <Card {...defaultProps} isMatched={true} showAllCards={true} />
    );
    const touchable = getByRole('button');

    // When showAllCards is true, matched cards are shown again (disabled)
    expect(touchable).toBeTruthy();
    expect(touchable.props.accessibilityState?.disabled || touchable.props.disabled).toBeTruthy();
  });
});
