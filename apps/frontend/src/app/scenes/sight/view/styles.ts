import styled from 'styled-components'

export const SightContainer = styled.div<{ background: string }>`
    height: '100%';
    padding-top: 160px;
    background: url(${({ background }) => background}) no-repeat center / cover;
`

export const SightContent = styled.div`
    padding: 25px;
    background-color: white;
    border-radius: 40px;
`

export const SightName = styled.h2``

export const SightAddress = styled.div``

export const SightTime = styled.div``
