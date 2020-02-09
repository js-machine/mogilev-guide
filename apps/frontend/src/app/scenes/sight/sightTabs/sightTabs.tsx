import React from 'react'
import { SightTabsContainer, SightTabsHeader, SightTabsHeaderButton, SightTabsBody } from './styles'

type _TabId = string | number

interface SightTabProps<TabId> {
    id: TabId
    title: React.ReactNode
    children: React.ReactNode
}

export const SightTab = <TabId extends _TabId>(props: SightTabProps<TabId>): React.ReactElement => null
SightTab.displayName = 'SightTab'

interface Props<TabId> {
    activeTab: TabId
    children: (React.ReactElement<SightTabProps<TabId>>)[]
    onChangeTab: (id: TabId) => any
}

export const SightTabs = <TabId extends _TabId>({ children, activeTab, onChangeTab }: Props<TabId>): React.ReactElement => {
    return (
        <SightTabsContainer>
            <SightTabsHeader>
                {children.map(tab => {
                    const { id, title } = tab.props
                    return <SightTabsHeaderButton active={activeTab === id} onClick={() => onChangeTab(id)} key={id}>{title}</SightTabsHeaderButton>
                })}
            </SightTabsHeader>
            <SightTabsBody>
                {children.find(tab => tab.props.id === activeTab).props.children}
            </SightTabsBody>
        </SightTabsContainer>
    )
}
SightTabs.displayName = 'SightTabs'
SightTabs.Tab = SightTab
