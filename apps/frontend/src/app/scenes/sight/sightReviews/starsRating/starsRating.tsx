import React from 'react'
import { RatingStar } from './ratingStar'
import { StarsRatingContainer, StarsRatingContent, StarsRatingValue } from './styles'

interface Props {
    value: number
}

const STARS_NUMBER = 5

export const StarsRating: React.FC<Props> = ({ value }) => {
    const percentValue = value / STARS_NUMBER
    return (
        <StarsRatingContainer>
            <StarsRatingContent>
                {Array(STARS_NUMBER).fill(null).map((_, i) => <RatingStar color="#E0E0E0" key={i} />)}
                <StarsRatingValue value={percentValue}>
                    {Array(STARS_NUMBER).fill(null).map((_, i) => <RatingStar color="#09DDDF" key={i} />)}
                </StarsRatingValue>
            </StarsRatingContent>
        </StarsRatingContainer>
    )
}
StarsRating.displayName = 'StarsRating'
