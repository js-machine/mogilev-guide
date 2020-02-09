import React from 'react'
import { SightReview as ISightReview, User } from '@mogilev-guide/models'

interface Props {
    date: ISightReview['date']
    rating: ISightReview['rating']
    message: ISightReview['message']
    user: User
}

export const SightReview: React.FC<Props> = ({ date, rating, message, user }) => {
    return <div>{message}</div>
}
SightReview.displayName = 'SightReview'
