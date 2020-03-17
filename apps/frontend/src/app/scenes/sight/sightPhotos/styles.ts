import styled from 'styled-components';

export const SightPhotosContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
SightPhotosContainer.displayName = 'SightPhotosContainer';

export const SightPhotosPhoto = styled.div<{ photo: string }>`
    position: relative;
    flex-basis: 50%;
    padding-bottom: 50%;
    background: url(${({ photo }) => photo}) no-repeat center/cover;
`;
SightPhotosPhoto.displayName = 'SightPhotosPhoto';

export const SightPhotosPhotoViewAll = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    cursor: pointer;
`;
SightPhotosPhotoViewAll.displayName = 'SightPhotosPhotoViewAll';
