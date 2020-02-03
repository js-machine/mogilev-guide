import React from 'react'

export type _TabId = string | number

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
        <div>
            <div style={{ display: 'flex' }}>
                {children.map(tab => {
                    const { id, title } = tab.props
                    return <div style={{ flexGrow: 1, background: activeTab === id ? 'green': 'transparent' }} onClick={() => onChangeTab(id)} key={id}>{title}</div>
                })}
            </div>
            <div>
                {children.find(tab => tab.props.id === activeTab).props.children}
            </div>
        </div>
    )
}
SightTabs.displayName = 'SightTabs'
SightTabs.Tab = SightTab
