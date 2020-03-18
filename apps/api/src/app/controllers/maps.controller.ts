import { Controller, Get, Route, Query } from 'tsoa';
import { Sight, Coordinates } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { GeoService } from '@mogilev-guide/api/services/geolib';

@Route('map')
export class MapController extends Controller {
  @Inject() private geoService!: GeoService;

  @Get('nearest')
  public async getNearestPlace(
    @Query() latit: number,
    @Query() longit: number
  ): Promise<Sight> {
    //point relative to which the nearest points are searched
    const startPoint: Coordinates = {
      latitude: latit,
      longitude: longit
    };

    //find only one the nearest sight from array of points
    return this.geoService.getSightFromPoint(startPoint);
  }

  @Get('nearest/{amount}')
  public async getNearestPlacesByAmount(
    amount: number,
    @Query() latit: number,
    @Query() longit: number
  ): Promise<Sight[]> {
    //point relative to which the nearest points are searched
    const startPoint: Coordinates = {
      latitude: latit,
      longitude: longit
    };

    //find amount of the nearest point from array of points
    return this.geoService.getSightsFromPoint(startPoint, amount);
  }
}
