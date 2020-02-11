import styled from 'styled-components'

const sightContainerConsts = {
    paddingTop: 300,
}
export const SightContainer = styled.div<{ background: string }>`
    display: flex;
    flex-direction: column;
    min-height: calc(100% - ${sightContainerConsts.paddingTop}px);
    padding-top: ${sightContainerConsts.paddingTop}px;
    background: url(${({ background }) => background}) no-repeat top / 100%;
`
SightContainer.displayName = 'SightContainer'

export const SightContent = styled.div`
    flex-grow: 1;
    padding: 25px;
    background-color: white;
    border-radius: 40px 40px 0 0;
`
SightContent.displayName = 'SightContent'

export const SightHistory = styled.div`
    white-space: pre-wrap;
`
SightHistory.displayName = 'SightHistory'

export const SightName = styled.div`
    margin-bottom: 14px;
    font-size: 28px;
    font-weight: bold;
`
SightName.displayName = 'SightName'

export const SightAddressTimeIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-right: 8px;
`
SightAddressTimeIcon.displayName = 'SightAddressTimeIcon'

export const SightAddress = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 16px;
`
SightAddress.displayName = 'SightAddress'

export const SightTime = styled.div`
    display: flex;
    align-items: center;
`
SightTime.displayName = 'SightTime'
