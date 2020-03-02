import React from 'react';
import { SightTabs } from '../sightTabs';
import { Tabs } from '@mogilev-guide/frontend/stores/sight/sight.constants';
import { Sight } from '@mogilev-guide/models';
import { SightReviews } from '../sightReviews';
import { SightPhotos } from '../sightPhotos';
import { SightContainer, SightContent, SightHistory, SightName, SightAddressTimeIcon, SightAddress, SightTime } from './styles';

interface Props {
    sight: Sight;
    activeTab: Tabs;
    onChangeTab: (id: Tabs) => void;
    onViewAllPhotos: () => void;
    onViewAllReviews: () => void;
}

const hoursToAmPm = hours => {
    if (hours === 0 || hours === 24) {
        return `${hours}AM`;
    }
    return hours < 12 ? `${hours}AM` : `${hours - 12}PM`;
};

export const SightView: React.FC<Props> = ({ sight, activeTab, onChangeTab, onViewAllPhotos, onViewAllReviews }) => {
    const isMorePhotos = sight.photos.length < sight.photosTotalCount;
    return (
        <SightContainer background={sight.background}>
            <SightContent>
                <SightName>{sight.name}</SightName>
                <SightAddress>
                    <SightAddressTimeIcon>
                        <span role="img" aria-label="address">📍</span>
                    </SightAddressTimeIcon>
                    {sight.address}
                </SightAddress>
                <SightTime>
                    <SightAddressTimeIcon>
                        <span role="img" aria-label="time">🕒</span>
                    </SightAddressTimeIcon>
                    {hoursToAmPm(sight.accessTime.from)} - {hoursToAmPm(sight.accessTime.to)}
                </SightTime>
                <SightTabs activeTab={activeTab} onChangeTab={(id) => onChangeTab(id)}>
                    <SightTabs.Tab id={Tabs.HISTORY} title='History'>
                        <SightHistory>{sight.history}</SightHistory>
                    </SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.PHOTOS} title='Photos'>
                        <SightPhotos photos={sight.photos} isViewAll={isMorePhotos} onViewAll={onViewAllPhotos} />
                    </SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.REVIEWS} title='Reviews'>
                        <SightReviews reviews={sight.reviews} reviewsTotalCount={sight.reviewsTotalCount} rating={sight.rating} onViewAll={onViewAllReviews} />
                    </SightTabs.Tab>
                </SightTabs>
            </SightContent>
        </SightContainer>
    );
};
SightView.displayName = 'SightView';
