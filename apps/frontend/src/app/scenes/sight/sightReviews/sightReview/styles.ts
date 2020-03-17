import styled from 'styled-components';

export const SightReviewContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: 32px;
    }
`;
SightReviewContainer.displayName = 'SightReviewContainer';

export const SightReviewHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
SightReviewHeader.displayName = 'SightReviewHeader';

export const SightReviewAvatar = styled.div<{ url: string }>`
    height: 40px;
    width: 40px;
    margin-right: 12px;
    background: url(${({ url }) => url}) no-repeat center / cover;
    border-radius: 50%;
    overflow: hidden;
`;
SightReviewAvatar.displayName = 'SightReviewAvatar';

export const SightReviewNameRating = styled.div`
    flex-grow: 1;
`;
SightReviewNameRating.displayName = 'SightReviewNameRating';

export const SightReviewName = styled.div`
    margin-bottom: 4px;
`;
SightReviewName.displayName = 'SightReviewName';

export const SightReviewRating = styled.div``;
SightReviewRating.displayName = 'SightReviewRating';

export const SightReviewDate = styled.div`
    font-size: 14px;
    color: #AAA;
`;
SightReviewDate.displayName = 'SightReviewDate';

export const SightReviewBody = styled.div``;
SightReviewBody.displayName = 'SightReviewBody';
