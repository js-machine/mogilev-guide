import React, { useMemo } from 'react'
import { Sight } from '@mogilev-guide/models'
import { StarsRating } from '../starsRating'
import {
    SightRatingContainer,
    SightRatingHeader,
    SightRatingHeaderNum,
    SightRatingHeaderStars,
    SightRatingBars,
    SightRatingBarContainer,
    SightRatingBar,
    SightRatingBarNum,
} from './styles'

interface Props {
    rating: Sight['rating']
}

export const SightRating: React.FC<Props> = ({ rating }) => {
    const averageRating = useMemo(() => rating.reduce((average, i) => (average + i / rating.length), 0), [rating])
    const displayAverageRating = useMemo(() => Math.round(averageRating * 10) / 10, [averageRating])

    return (
        <SightRatingContainer>
            <SightRatingHeader>
                <SightRatingHeaderNum>{displayAverageRating}</SightRatingHeaderNum>
                <SightRatingHeaderStars>
                    <StarsRating value={averageRating} />
                </SightRatingHeaderStars>
            </SightRatingHeader>
            <SightRatingBars>
                {[5, 4, 3, 2, 1].map(value => (
                    <SightRatingBarContainer key={value}>
                        <SightRatingBarNum>{value}</SightRatingBarNum>
                        <SightRatingBar value={rating.reduce((sum, rate) => rate === value ? sum + 1 : sum, 0) / rating.length} />
                    </SightRatingBarContainer>
                ))}
            </SightRatingBars>
        </SightRatingContainer>
    )
}
SightRating.displayName = 'SightRating'
