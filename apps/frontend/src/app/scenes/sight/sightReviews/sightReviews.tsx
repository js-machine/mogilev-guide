import React from 'react'
import { Sight } from '@mogilev-guide/models'
import { SightReview } from './sightReview'

interface Props {
    reviews: Sight['reviews']
    reviewsTotalCount: Sight['reviewsTotalCount']
    rating: Sight['rating']
}

export const SightReviews: React.FC<Props> = ({ reviews, reviewsTotalCount, rating }) => {
    const totalRating = rating.reduce((average, i) => (average + i / rating.length), 0)
    return (
        <div>
            <div>
                <div>Total Rating: {totalRating}</div>
            </div>
            <div>
                {reviews.map(review => <SightReview user={{ id: Math.random().toString(), name: 'Lorem Ipsum' }} date={review.date} rating={review.rating} message={review.message} key={review.id} />)}
            </div>
        </div>
    )
}
SightReviews.displayName = 'SightReviews'
