import { observable, action, runInAction, configure } from 'mobx';
import { Sight, SightMapper } from '@mogilev-guide/models';

import {
  getSights,
  getSight,
  createSight,
  deleteSight,
  updateSight
} from '@mogilev-guide/data-service';
import { UiStore } from '@mogilev-guide/admin/store/ui.store';

configure({ enforceActions: 'observed' });

export class SightsStore {
  @observable public sights!: Sight[];

  public constructor(private uiStore: UiStore) {
    this.init();
  }

  @action public init = () => {
    this.sights = [];
  };

  @action public loadSights = async () => {
    this.uiStore.setIsLoading(true);

    try {
      const sights = await getSights();
      runInAction(
        () =>
          (this.sights = sights.map(sight =>
            SightMapper.mapToUi(sight, this.uiStore.activeLanguage)
          ))
      );
    } finally {
      this.uiStore.setIsLoading(false);
    }
  };

  @action public getSightById = async (id: string) => {
    return SightMapper.mapToUi(await getSight(id), this.uiStore.activeLanguage);
  };

  @action public createSight = async (sight: Sight) => {
    try {
      const { id } = await createSight(SightMapper.mapToDto(sight));
      runInAction(() => {
        sight.id = id;
        this.sights.push(sight);
      });
    } catch (err) {
      console.error(err);
    }
  };

  @action public saveSight = async (sight: Sight) => {
    try {
      await updateSight(SightMapper.mapToDto(sight));
      runInAction(() => {
        this.sights = this.sights.map(d => (d.id === sight.id ? sight : d));
      });
    } catch (err) {
      console.error(err);
    }
  };

  @action public deleteSight = async (sight: Sight) => {
    try {
      await deleteSight(sight.id);
      runInAction(
        () => (this.sights = this.sights.filter(d => d.id !== sight.id))
      );
    } catch (err) {
      console.error(err);
    }
  };
}
