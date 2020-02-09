import React from 'react'
import { SightTabs } from '../sightTabs'
import { Tabs } from '../constants'
import { Sight } from '@mogilev-guide/models'
import { SightReviews } from '../sightReviews'
import { SightPhotos } from '../sightPhotos'
import { SightContainer, SightContent, SightHistory, SightName, SightAddressTimeIcon, SightAddress, SightTime } from './styles'

interface Props {
    sight: Sight
    activeTab: Tabs
    onChangeTab: (id: Tabs) => any
    onViewAllPhotos: () => any
}

export const SightView: React.FC<Props> = ({ sight, activeTab, onChangeTab, onViewAllPhotos }) => {
    const isMorePhotos = sight.photos.length < sight.photosTotalCount
    return (
        <SightContainer background={sight.background}>
            <SightContent>
                <SightName>{sight.name}</SightName>
                <SightAddress>
                    <SightAddressTimeIcon>📍</SightAddressTimeIcon>
                    {sight.address}
                </SightAddress>
                <SightTime>
                    <SightAddressTimeIcon>🕒</SightAddressTimeIcon>
                    {sight.accessTime.from} - {sight.accessTime.to}
                </SightTime>
                <SightTabs activeTab={activeTab} onChangeTab={(id) => onChangeTab(id)}>
                    <SightTabs.Tab id={Tabs.HISTORY} title='History'>
                        <SightHistory>{sight.history}</SightHistory>
                    </SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.PHOTOS} title='Photos'>
                        <SightPhotos photos={sight.photos} isViewAll={isMorePhotos} onViewAll={onViewAllPhotos} />
                    </SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.REVIEWS} title='Reviews'>
                        <SightReviews reviews={sight.reviews} reviewsTotalCount={sight.reviewsTotalCount} rating={sight.rating} />
                    </SightTabs.Tab>
                </SightTabs>
            </SightContent>
        </SightContainer>
    )
}
SightView.displayName = 'SightView'
