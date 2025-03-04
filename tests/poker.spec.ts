import { describe, it, expect } from 'vitest';
import { Card, Hand, HandRank } from '../types';
import { createCard, createHand, evaluateHand } from '../poker';

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
    });
}); 