import React from 'react'
import { Sight } from '@mogilev-guide/models'
import { SightReview } from './sightReview'
import { SightRating } from './sightRating'
import { SightReviewsContainer, SightReviewsViewAll } from './styles'

interface Props {
    reviews: Sight['reviews']
    reviewsTotalCount: Sight['reviewsTotalCount']
    rating: Sight['rating']
    onViewAll: () => void
}

export const SightReviews: React.FC<Props> = ({ reviews, reviewsTotalCount, rating, onViewAll }) => {
    const isShowViewAllBtn = reviews.length < reviewsTotalCount
    return (
        <>
            <SightRating rating={rating} />
            <SightReviewsContainer>
                {reviews.map(review => <SightReview {...review} key={review.id} />)}
            </SightReviewsContainer>
            {isShowViewAllBtn && <SightReviewsViewAll onClick={onViewAll}>View All ({reviewsTotalCount})</SightReviewsViewAll>}
        </>
    )
}
SightReviews.displayName = 'SightReviews'
