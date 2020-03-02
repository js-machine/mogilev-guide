import moment from 'moment';
import React from 'react';
import { SightReview as ISightReview } from '@mogilev-guide/models';
import { StarsRating } from '../starsRating';
import {
    SightReviewContainer,
    SightReviewHeader,
    SightReviewBody,
    SightReviewAvatar,
    SightReviewNameRating,
    SightReviewName,
    SightReviewRating,
    SightReviewDate,
} from './styles';

export const SightReview: React.FC<ISightReview> = ({ date, rating, message, user }) => {
    return (
        <SightReviewContainer>
            <SightReviewHeader>
                <SightReviewAvatar url={user.avatar} />
                <SightReviewNameRating>
                    <SightReviewName>{user.firstName} {user.lastName}</SightReviewName>
                    <SightReviewRating>
                        <StarsRating value={rating} />
                    </SightReviewRating>
                </SightReviewNameRating>
                <SightReviewDate>
                    {moment(date).format('D MMM, YYYY')}
                </SightReviewDate>
            </SightReviewHeader>
            <SightReviewBody>{message}</SightReviewBody>
        </SightReviewContainer>
    );
};
SightReview.displayName = 'SightReview';
