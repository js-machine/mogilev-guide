import React from 'react'
import { SightReview as ISightReview, User } from '@mogilev-guide/models'
import { Months } from '../../constants'
import { StarsRating } from '../starsRating'
import {
    SightReviewContainer,
    SightReviewHeader,
    SightReviewBody,
    SightReviewAvatar,
    SightReviewNameRating,
    SightReviewName,
    SightReviewRating,
    SightReviewDate,
} from './styles'

export const SightReview: React.FC<ISightReview> = ({ date: dateMs, rating, message, user }) => {
    const date = new Date(dateMs)
    const displayDate = `${date.getDate()} ${Months[date.getMonth()]}, ${date.getFullYear()}`
    return (
        <SightReviewContainer>
            <SightReviewHeader>
                <SightReviewAvatar url={user.avatar} />
                <SightReviewNameRating>
                    <SightReviewName>{user.name}</SightReviewName>
                    <SightReviewRating>
                        <StarsRating value={rating} />
                    </SightReviewRating>
                </SightReviewNameRating>
                <SightReviewDate>
                    {displayDate}
                </SightReviewDate>
            </SightReviewHeader>
            <SightReviewBody>{message}</SightReviewBody>
        </SightReviewContainer>
    )
}
SightReview.displayName = 'SightReview'
