import React, { useLayoutEffect, useState, useCallback } from 'react'
import { Loader } from '@mogilev-guide/frontend/components'
import { getSight } from '@mogilev-guide/data-service'
import { Sight as ISight } from '@mogilev-guide/models'
import { Tabs } from './constants'
import { SightView } from './sightView'

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

    const handleViewAllPhotos = useCallback(() => {
        setSight(sight => ({ ...sight, photos: [...sight.photos, 'https://planetabelarus.by/upload/resize_cache/iblock/95a/1330_887_18e21fe612b4afb807a26ecc22279a1d9/95af5cc42e396e28a0e909fae9e75ca0.jpg'] }))
    }, [])

    const handleViewAllReviews = useCallback(() => {
        setSight(sight => ({
            ...sight,
            reviews: [
                ...sight.reviews,
                {
                    id: 'review228',
                    user: {
                        id: 'user228',
                        login: 'foo',
                        email: 'foo',
                        firstName: 'Foo',
                        lastName: 'Bar',
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxbJ-KNiELvIR_0q42fjBldG89LLI6869wq_hmVVmccZN3BDn4',
                    },
                    date: Date.now(),
                    rating: 4,
                    message: 'Some message here',
                },
                {
                    id: 'review322',
                    user: {
                        id: 'user322',
                        login: 'bar',
                        email: 'bar',
                        firstName: 'Bar',
                        lastName: 'Foo',
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxbJ-KNiELvIR_0q42fjBldG89LLI6869wq_hmVVmccZN3BDn4',
                    },
                    date: Date.now(),
                    rating: 3,
                    message: 'Dolor sit amet consectetur. Dolor sit amet consectetur. Dolor sit amet consectetur. Dolor sit amet consectetur. Dolor sit amet consectetur. Dolor sit amet consectetur. Dolor sit amet consectetur.',
                }
            ]
        }))
    }, [])

    if (isLoading) {
        return <Loader isLoading={true} />
    }

    return <SightView sight={sight} activeTab={activeTab} onChangeTab={setActiveTab} onViewAllPhotos={handleViewAllPhotos} onViewAllReviews={handleViewAllReviews} />
}
Sight.displayName = 'Sight'
