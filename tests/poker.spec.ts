import { describe, it, expect } from 'vitest';
import { Card, Hand } from '../types';
import { createCard, createHand, evaluateHand, compareHands } from '../poker';

describe('Poker Hand Evaluation', () => {
    it('should create a valid card', () => {
        const card: Card = {
            suit: '♥',
            rank: 'A'
        };
        expect(card.suit).toBe('♥');
        expect(card.rank).toBe('A');
    });

    it('should create a valid hand', () => {
        const hand: Hand = [
            { suit: '♥', rank: 'A' },
            { suit: '♥', rank: 'K' },
            { suit: '♥', rank: 'Q' },
            { suit: '♥', rank: 'J' },
            { suit: '♥', rank: '10' }
        ];
        expect(hand).toHaveLength(5);
        expect(hand[0].suit).toBe('♥');
        expect(hand[0].rank).toBe('A');
    });

    describe('Hand Evaluation', () => {
        it('should evaluate high card', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'K'),
                createCard('♦', 'Q'),
                createCard('♣', 'J'),
                createCard('♥', '9')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('HIGH_CARD');
            expect(evaluation.value).toBe(14); // Value of Ace
            expect(evaluation.kickers).toEqual([13, 12, 11, 9]); // Values of remaining cards
        });

        it('should evaluate one pair', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'K'),
                createCard('♣', 'Q'),
                createCard('♥', 'J')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('ONE_PAIR');
            expect(evaluation.value).toBe(14); // Value of the pair (Aces)
            expect(evaluation.kickers).toEqual([13, 12, 11]); // Values of remaining cards
        });

        it('should evaluate two pairs', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'K'),
                createCard('♣', 'K'),
                createCard('♥', 'Q')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('TWO_PAIR');
            expect(evaluation.value).toBe(14); // Value of the highest pair (Aces)
            expect(evaluation.kickers).toEqual([13, 12]); // Value of the second pair and kicker
        });

        it('should evaluate three of a kind', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'A'),
                createCard('♣', 'K'),
                createCard('♥', 'Q')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('THREE_OF_A_KIND');
            expect(evaluation.value).toBe(14); // Value of the three of a kind (Aces)
            expect(evaluation.kickers).toEqual([13, 12]); // Values of remaining cards
        });

        it('should evaluate straight', () => {
            const hand = createHand([
                createCard('♥', '9'),
                createCard('♠', '8'),
                createCard('♦', '7'),
                createCard('♣', '6'),
                createCard('♥', '5')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('STRAIGHT');
            expect(evaluation.value).toBe(9); // Highest card in the straight
            expect(evaluation.kickers).toEqual([]); // No kickers for straight
        });

        it('should evaluate straight with Ace low', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', '2'),
                createCard('♦', '3'),
                createCard('♣', '4'),
                createCard('♥', '5')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('STRAIGHT');
            expect(evaluation.value).toBe(5); // Highest card in the straight
            expect(evaluation.kickers).toEqual([]); // No kickers for straight
        });

        it('should evaluate flush', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♥', '8'),
                createCard('♥', '6'),
                createCard('♥', '4'),
                createCard('♥', '2')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('FLUSH');
            expect(evaluation.value).toBe(14); // Highest card in the flush
            expect(evaluation.kickers).toEqual([8, 6, 4, 2]); // Remaining cards in order
        });

        it('should evaluate full house', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'A'),
                createCard('♣', 'K'),
                createCard('♥', 'K')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('FULL_HOUSE');
            expect(evaluation.value).toBe(14); // Value of the three of a kind (Aces)
            expect(evaluation.kickers).toEqual([13]); // Value of the pair (Kings)
        });

        it('should evaluate four of a kind', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'A'),
                createCard('♣', 'A'),
                createCard('♥', 'K')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('FOUR_OF_A_KIND');
            expect(evaluation.value).toBe(14); // Value of the four of a kind (Aces)
            expect(evaluation.kickers).toEqual([13]); // Value of the kicker (King)
        });

        it('should evaluate straight flush', () => {
            const hand = createHand([
                createCard('♠', '9'),
                createCard('♠', '8'),
                createCard('♠', '7'),
                createCard('♠', '6'),
                createCard('♠', '5')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('STRAIGHT_FLUSH');
            expect(evaluation.value).toBe(9); // Highest card in the straight flush
            expect(evaluation.kickers).toEqual([]); // No kickers for straight flush
        });

        it('should evaluate royal flush', () => {
            const hand = createHand([
                createCard('♥', 'A'),
                createCard('♥', 'K'),
                createCard('♥', 'Q'),
                createCard('♥', 'J'),
                createCard('♥', '10')
            ]);

            const evaluation = evaluateHand(hand);
            expect(evaluation.rank).toBe('ROYAL_FLUSH');
            expect(evaluation.value).toBe(14); // Value of Ace
            expect(evaluation.kickers).toEqual([]); // No kickers for royal flush
        });
    });

    describe('Hand Comparison', () => {
        it('should compare two pairs correctly', () => {
            const hand1 = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'K'),
                createCard('♣', 'K'),
                createCard('♥', 'Q')
            ]);

            const hand2 = createHand([
                createCard('♥', 'K'),
                createCard('♠', 'K'),
                createCard('♦', 'Q'),
                createCard('♣', 'Q'),
                createCard('♥', 'J')
            ]);

            const result = compareHands(hand1, hand2);
            expect(result).toBe(1); // hand1 wins (higher pairs)
        });

        it('should compare full houses correctly', () => {
            const hand1 = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'A'),
                createCard('♣', 'K'),
                createCard('♥', 'K')
            ]);

            const hand2 = createHand([
                createCard('♥', 'K'),
                createCard('♠', 'K'),
                createCard('♦', 'K'),
                createCard('♣', 'A'),
                createCard('♥', 'A')
            ]);

            const result = compareHands(hand1, hand2);
            expect(result).toBe(1); // hand1 wins (higher three of a kind)
        });

        it('should compare different hand types correctly', () => {
            const hand1 = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'A'),
                createCard('♣', 'K'),
                createCard('♥', 'Q')
            ]);

            const hand2 = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'K'),
                createCard('♣', 'K'),
                createCard('♥', 'Q')
            ]);

            const result = compareHands(hand1, hand2);
            expect(result).toBe(1); // hand1 wins (three of a kind beats two pairs)
        });

        it('should return 0 for equal hands', () => {
            const hand1 = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'K'),
                createCard('♣', 'K'),
                createCard('♥', 'Q')
            ]);

            const hand2 = createHand([
                createCard('♦', 'A'),
                createCard('♣', 'A'),
                createCard('♥', 'K'),
                createCard('♠', 'K'),
                createCard('♦', 'Q')
            ]);

            const result = compareHands(hand1, hand2);
            expect(result).toBe(0); // hands are equal
        });

        it('should compare kickers when main values are equal', () => {
            const hand1 = createHand([
                createCard('♥', 'A'),
                createCard('♠', 'A'),
                createCard('♦', 'K'),
                createCard('♣', 'Q'),
                createCard('♥', 'J')
            ]);

            const hand2 = createHand([
                createCard('♦', 'A'),
                createCard('♣', 'A'),
                createCard('♥', 'K'),
                createCard('♠', 'Q'),
                createCard('♦', '10')
            ]);

            const result = compareHands(hand1, hand2);
            expect(result).toBe(1); // hand1 wins (higher kicker)
        });
    });

    describe('Input Validation', () => {
        describe('Card Validation', () => {
            it('should throw error for invalid rank', () => {
                expect(() => createCard('♥', '1')).toThrow();
                expect(() => createCard('♥', '15')).toThrow();
                expect(() => createCard('♥', 'X')).toThrow();
            });

            it('should throw error for invalid suit', () => {
                expect(() => createCard('X', 'A')).toThrow();
                expect(() => createCard('1', 'A')).toThrow();
                expect(() => createCard('', 'A')).toThrow();
            });
        });

        describe('Hand Validation', () => {
            it('should throw error for hand with less than 5 cards', () => {
                const cards = [
                    createCard('♥', 'A'),
                    createCard('♠', 'K'),
                    createCard('♦', 'Q'),
                    createCard('♣', 'J')
                ];
                expect(() => createHand(cards)).toThrow('A hand must contain exactly 5 cards');
            });

            it('should throw error for hand with more than 5 cards', () => {
                const cards = [
                    createCard('♥', 'A'),
                    createCard('♠', 'K'),
                    createCard('♦', 'Q'),
                    createCard('♣', 'J'),
                    createCard('♥', '10'),
                    createCard('♠', '9')
                ];
                expect(() => createHand(cards)).toThrow('A hand must contain exactly 5 cards');
            });

            it('should throw error for hand with duplicate cards', () => {
                const cards = [
                    createCard('♥', 'A'),
                    createCard('♥', 'A'), // Duplicate card
                    createCard('♦', 'K'),
                    createCard('♣', 'Q'),
                    createCard('♥', 'J')
                ];
                expect(() => createHand(cards)).toThrow('Duplicate cards are not allowed');
            });
        });
    });
}); 