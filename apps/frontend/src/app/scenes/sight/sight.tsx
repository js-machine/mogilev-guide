import React, { useEffect, useCallback } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useStores } from '@mogilev-guide/frontend/stores';
import { Loader } from '@mogilev-guide/frontend/components';
import { SightView } from './sightView';

interface Props {
    match: {
        params: {
            sightId: string;
        }
    }
}

export const SightRaw: React.FC<Props> = props => {
    const id = props.match.params.sightId;
    const { sightStore, uiStore } = useStores();

    useEffect(() => {
        sightStore.getSight(id);
    }, [id, sightStore]);

    const handleViewAllPhotos = useCallback(() => {
        console.log('view all photos');
    }, [sightStore.sight]);

    const handleViewAllReviews = useCallback(() => {
        console.log('view all reviews')
    }, [sightStore.sight]);

    if (uiStore.isPageLoading) {
        return <Loader isLoading={true} />;
    }

    return (
        <SightView
            sight={sightStore.sight}
            activeTab={sightStore.activeTab}
            onChangeTab={sightStore.setActiveTab}
            onViewAllPhotos={handleViewAllPhotos}
            onViewAllReviews={handleViewAllReviews}
        />
    );
};
SightRaw.displayName = 'Sight';

export const Sight = observer(SightRaw);
