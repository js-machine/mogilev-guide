import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const SightContainer = styled.div<{ background: string }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 160px;
    background: url(${({ background }) => background}) no-repeat center / cover;
`
SightContainer.displayName = 'SightContainer'

export const SightContent = styled.div`
    flex-grow: 1;
    padding: 25px;
    background-color: white;
    border-radius: 40px;
`
SightContent.displayName = 'SightContent'

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
