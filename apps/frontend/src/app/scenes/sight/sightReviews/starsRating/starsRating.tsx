import React from 'react'
import { RatingStar } from './ratingStar'
import { StarsRatingContainer, StarsRatingValue } from './styles'

interface Props {
    value: number
}

export const StarsRating: React.FC<Props> = ({ value }) => {
    return (
        <StarsRatingContainer>
            {Array(5).fill(null).map(() => <RatingStar color="#E0E0E0" />)}
            <StarsRatingValue value={value}>
                {Array(5).fill(null).map(() => <RatingStar color="#09DDDF" />)}
            </StarsRatingValue>
        </StarsRatingContainer>
    )
}
StarsRating.displayName = 'StarsRating'
