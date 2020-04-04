import { Controller, Get, Route, Query } from 'tsoa';
import { SightDto } from '@mogilev-guide/models';
import { Coordinates } from '@mogilev-guide/api/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { GeoService } from '@mogilev-guide/api/services/geolib';
import { SightsConverter } from '@mogilev-guide/api/helpers';

@Route('map')
export class MapController extends Controller {
  @Inject() private geoService!: GeoService;
  @Inject() private sightsConverter!: SightsConverter;

  @Get('nearest')
  public async getNearestPlace(
    @Query() latit: number,
    @Query() longit: number
  ): Promise<SightDto> {
    //point relative to which the nearest points are searched
    const startPoint: Coordinates = {
      latitude: latit,
      longitude: longit
    };

    //find only one the nearest sight from array of points
    const nearestSightDB = await this.geoService.getSightFromPoint(startPoint);
    return this.sightsConverter.fromDBToFront(nearestSightDB);
  }

  @Get('nearest/{amount}')
  public async getNearestPlacesByAmount(
    amount: number,
    @Query() latit: number,
    @Query() longit: number
  ): Promise<SightDto[]> {
    //point relative to which the nearest points are searched
    const startPoint: Coordinates = {
      latitude: latit,
      longitude: longit
    };

    //find amount of the nearest point from array of points
    const nearestSightsDB = await this.geoService.getSightsFromPoint(
      startPoint,
      amount
    );
    return this.sightsConverter.fromDBToFrontArray(nearestSightsDB);
  }
}
