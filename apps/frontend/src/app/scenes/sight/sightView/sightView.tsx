import React from 'react'
import { SightTabs } from '../sightTabs'
import { Tabs } from '../sight'
import { Sight } from '@mogilev-guide/models'
import { _TabId } from '../sightTabs'
import { SightReviews } from '../sightReviews'
import { SightContainer, SightContent, SightName, SightAddressTimeIcon, SightAddress, SightTime } from './styles'

interface Props {
    sight: Sight
    activeTab: Tabs
    onChangeTab: (id: Tabs) => any
}

export const SightView: React.FC<Props> = ({ sight, activeTab, onChangeTab }) => {
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
                    <SightTabs.Tab id={Tabs.HISTORY} title='History'>{sight.history}</SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.PHOTOS} title='Photos'>{sight.photos}</SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.REVIEWS} title='Reviews'>
                        <SightReviews reviews={sight.reviews} reviewsTotalCount={sight.reviewsTotalCount} rating={sight.rating} />
                    </SightTabs.Tab>
                </SightTabs>
            </SightContent>
        </SightContainer>
    )
}
SightView.displayName = 'SightView'
