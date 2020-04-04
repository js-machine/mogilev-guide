import React, { useEffect } from 'react';
import { Sight } from '@mogilev-guide/models';
import { SightReview } from './sightReview';
import { SightRating } from './sightRating';
import { SightReviewsContainer, SightReviewsViewAll } from './styles';
import { useStores } from '@mogilev-guide/frontend/stores';
import { observer } from 'mobx-react-lite';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  sightId: string;
  reviews: Sight['reviews'];
  reviewsTotalCount: Sight['reviewsTotalCount'];
  rating: Sight['rating'];
  onViewAll: () => void;
}

export const SightReviews: React.FC<Props> = observer(
  ({ sightId, reviews, reviewsTotalCount, rating, onViewAll }) => {
    const { sightStore } = useStores();

    useEffect(() => {
      sightStore.getReviews(sightId);
    }, [sightId, sightStore]);

    const isShowViewAllBtn = reviews.length < reviewsTotalCount;
    return (
      <>
        <SightRating rating={rating} />
        <SightReviewsContainer>
          {sightStore.isReviewsLoading ? (
            <LinearProgress />
          ) : (
            sightStore.reviews.map(review => (
              <SightReview
                key={review.id}
                id={review.id}
                date={review.date}
                rating={review.rating}
                message={review.message}
                user={review.user}
              />
            ))
          )}
        </SightReviewsContainer>
        {isShowViewAllBtn && (
          <SightReviewsViewAll onClick={onViewAll}>
            View All ({reviewsTotalCount})
          </SightReviewsViewAll>
        )}
      </>
    );
  }
);
SightReviews.displayName = 'SightReviews';
