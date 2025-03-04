export type Suit = '♥' | '♦' | '♠' | '♣';

export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
    suit: Suit;
    rank: Rank;
}

export type Hand = [Card, Card, Card, Card, Card];

export type HandRank = 
    | 'HIGH_CARD'
    | 'ONE_PAIR'
    | 'TWO_PAIR'
    | 'THREE_OF_A_KIND'
    | 'STRAIGHT'
    | 'FLUSH'
    | 'FULL_HOUSE'
    | 'FOUR_OF_A_KIND'
    | 'STRAIGHT_FLUSH'
    | 'ROYAL_FLUSH';

export interface HandEvaluation {
    rank: HandRank;
    value: number;
    kickers: number[];
} 