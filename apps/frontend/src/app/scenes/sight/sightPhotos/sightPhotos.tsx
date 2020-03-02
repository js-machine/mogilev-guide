import React from 'react';
import { SightPhotosContainer, SightPhotosPhoto, SightPhotosPhotoViewAll } from './styles';

interface Props {
    photos: string[];
    isViewAll: boolean;
    onViewAll: () => void;
}

export const SightPhotos: React.FC<Props> = ({ photos, isViewAll, onViewAll }) => {
    return (
        <SightPhotosContainer>
            {photos.map((photo, i) => (
                <SightPhotosPhoto photo={photo} key={i}>
                    {isViewAll && (i === photos.length - 1) && <SightPhotosPhotoViewAll onClick={onViewAll}>View All</SightPhotosPhotoViewAll>}
                </SightPhotosPhoto>
            ))}
        </SightPhotosContainer>
    );
};
SightPhotos.displayName = 'SightPhotos';
