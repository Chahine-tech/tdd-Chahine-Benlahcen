import { describe, it, expect } from 'vitest';
import { Card, Hand, HandRank } from '../types';

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
}); 