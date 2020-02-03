import React from 'react'
import { SightTabs } from '../sightTabs'
import { Tabs } from '../sight'
import { Sight } from '@mogilev-guide/models'
import { _TabId } from '../sightTabs'
import { SightContainer, SightContent, SightName, SightAddress, SightTime } from './styles'

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
                <SightAddress>{sight.address}</SightAddress>
                <SightTime>{sight.accessTime.from} - {sight.accessTime.to}</SightTime>
                <SightTabs activeTab={activeTab} onChangeTab={(id) => onChangeTab(id)}>
                    <SightTabs.Tab id={Tabs.HISTORY} title='History'>
                        <div>{sight.history}</div>
                    </SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.PHOTOS} title='Photos'>
                        <div>{sight.photos}</div>
                    </SightTabs.Tab>
                    <SightTabs.Tab id={Tabs.REVIEWS} title='Reviews'>
                        <div>{sight.reviews.map(review => review.message)}</div>
                    </SightTabs.Tab>
                </SightTabs>
            </SightContent>
        </SightContainer>
    )
}
SightView.displayName = 'SightView'
