import { Card, Hand, HandEvaluation } from './types';

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

export function evaluateHand(hand: Hand): HandEvaluation {
    // Get all rank values and sort them in descending order
    const rankValues = hand.map(card => getRankValue(card.rank)).sort((a, b) => b - a);
    
    // Count occurrences of each rank
    const rankCounts = new Map<number, number>();
    rankValues.forEach(value => {
        rankCounts.set(value, (rankCounts.get(value) || 0) + 1);
    });

    // Check for three of a kind
    for (const [value, count] of rankCounts.entries()) {
        if (count === 3) {
            const kickers = rankValues.filter(v => v !== value);
            return {
                rank: 'THREE_OF_A_KIND',
                value,
                kickers
            };
        }
    }

    // Check for two pairs
    const pairs: number[] = [];
    for (const [value, count] of rankCounts.entries()) {
        if (count === 2) {
            pairs.push(value);
        }
    }
    if (pairs.length === 2) {
        const kickers = rankValues.filter(v => !pairs.includes(v));
        return {
            rank: 'TWO_PAIR',
            value: Math.max(...pairs),
            kickers: [Math.min(...pairs), ...kickers]
        };
    }

    // Check for one pair
    if (pairs.length === 1) {
        const kickers = rankValues.filter(v => v !== pairs[0]);
        return {
            rank: 'ONE_PAIR',
            value: pairs[0],
            kickers
        };
    }

    // If no combination, it's a high card
    return {
        rank: 'HIGH_CARD',
        value: rankValues[0],
        kickers: rankValues.slice(1)
    };
} 