import React from 'react'
import { Sight } from '@mogilev-guide/models'
import { SightReview } from './sightReview'
import { SightRating } from './sightRating'

interface Props {
    reviews: Sight['reviews']
    reviewsTotalCount: Sight['reviewsTotalCount']
    rating: Sight['rating']
}

export const SightReviews: React.FC<Props> = ({ reviews, reviewsTotalCount, rating }) => {
    return (
        <div>
            <SightRating rating={rating} />
            <div>
                {reviews.map(review => <SightReview user={{ id: Math.random().toString(), name: 'Lorem Ipsum' }} date={review.date} rating={review.rating} message={review.message} key={review.id} />)}
            </div>
        </div>
    )
}
SightReviews.displayName = 'SightReviews'
