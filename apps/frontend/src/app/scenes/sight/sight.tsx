import React, { useLayoutEffect, useState } from 'react'
import { Loader } from '@mogilev-guide/frontend/components'
import { getSight } from '@mogilev-guide/data-service'
import { Sight as ISight } from '@mogilev-guide/models'
import { SightView } from './sightView'

export enum Tabs {
    HISTORY,
    PHOTOS,
    REVIEWS,
}

interface Props {
    match: {
        params: {
            sightId: string
        }
    }
}

export const Sight: React.FC<Props> = props => {
    const id = props.match.params.sightId
    const [isLoading, setIsLoading] = useState(true)
    const [sight, setSight] = useState<ISight>()
    const [activeTab, setActiveTab] = useState(Tabs.HISTORY)

    useLayoutEffect(() => {
        setIsLoading(true)
        let isCanceled = false
        const request = getSight(id)
        request.then((sight) => {
            if (isCanceled) { return }
            setSight(sight)
            setIsLoading(false)
        })
        return () => {
            isCanceled = true
        }
    }, [id])

    if (isLoading) {
        return <Loader isLoading={true} />
    }

    return <SightView sight={sight} activeTab={activeTab} onChangeTab={setActiveTab} />
}
Sight.displayName = 'Sight'
