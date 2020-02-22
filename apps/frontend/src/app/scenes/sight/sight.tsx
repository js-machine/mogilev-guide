import React, { useEffect, useCallback } from 'react'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useStores } from '@mogilev-guide/frontend/stores'
import { Loader } from '@mogilev-guide/frontend/components'
import { SightView } from './sightView'

interface Props {
    match: {
        params: {
            sightId: string
        }
    }
}

export const SightRaw: React.FC<Props> = props => {
    const id = props.match.params.sightId
    const { sightStore, uiStore } = useStores()

    useEffect(() => {
        sightStore.getSight(id)
    }, [id])

    const handleViewAllPhotos = useCallback(() => {
        // TODO: Mock
        runInAction(() => {
            sightStore.sight = ({
                ...sightStore.sight,
                photos:[
                    ...sightStore.sight.photos,
                    'https://planetabelarus.by/upload/resize_cache/iblock/95a/1330_887_18e21fe612b4afb807a26ecc22279a1d9/95af5cc42e396e28a0e909fae9e75ca0.jpg',
                ],
            })
        })
    }, [])

    const handleViewAllReviews = useCallback(() => {
        // TODO: Mock
        runInAction(() => {
            sightStore.sight = ({
                ...sightStore.sight,
                reviews: [
                    ...sightStore.sight.reviews,
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
            })
        })
    }, [])

    if (uiStore.isPageLoading) {
        return <Loader isLoading={true} />
    }

    return (
        <SightView
            sight={sightStore.sight}
            activeTab={sightStore.activeTab}
            onChangeTab={sightStore.setActiveTab}
            onViewAllPhotos={handleViewAllPhotos}
            onViewAllReviews={handleViewAllReviews}
        />
    )
}
SightRaw.displayName = 'Sight'

export const Sight = observer(SightRaw)
