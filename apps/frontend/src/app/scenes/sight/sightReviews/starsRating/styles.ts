import styled from 'styled-components'

export const StarsRatingContainer = styled.div`
    display: flex;
`

export const StarsRatingContent = styled.div`
    position: relative;
    display: flex;
`

export const StarsRatingValue = styled.div<{ value: number }>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    width: ${({ value }) => value*100}%;
    overflow: hidden;

    > * {
        flex-shrink: 0;
    }
`
