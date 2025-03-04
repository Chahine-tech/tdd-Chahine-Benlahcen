import { Card, Hand, HandRank, HandEvaluation } from './types';

const RANK_VALUES: Record<string, number> = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

export function createCard(suit: string, rank: string): Card {
    return {
        suit: suit as Card['suit'],
        rank: rank as Card['rank']
    };
}

export function createHand(cards: Card[]): Hand {
    if (cards.length !== 5) {
        throw new Error('A hand must contain exactly 5 cards');
    }
    return cards as Hand;
}

export function getRankValue(rank: string): number {
    return RANK_VALUES[rank];
} 