import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { Coordinates, SightModel } from '@mogilev-guide/api/models';
import { SightsService } from '@mogilev-guide/api/services/sights';
import * as geolib from 'geolib';

@Injectable()
export class GeoService {
  @Inject() private sightsService!: SightsService;

  public async getSightFromPoint(startPoint: Coordinates): Promise<SightModel> {
    const allPoints: Coordinates[] = await this.getAllCoordinates();

    //find only one the nearest point from array of points
    const nearestPoint = geolib.findNearest(startPoint, allPoints);

    return this.sightsService.getSightByCoordinates(
      nearestPoint as Coordinates
    );
  }

  public async getSightsFromPoint(
    startPoint: Coordinates,
    amount: number
  ): Promise<SightModel[]> {
    const allPoints: Coordinates[] = await this.getAllCoordinates();

    //Sorted array of points by distance to a reference coordinate.
    const nearestPoints = geolib.orderByDistance(startPoint, allPoints);

    return this.getSomeSightsFromPoints(nearestPoints as Coordinates[], amount);
  }

  // getAllCoordinates() returns array of all sights coordinates
  // using sight entity from DB.
  private async getAllCoordinates(): Promise<Coordinates[]> {
    const allSights = await this.sightsService.getAllSights();
    return this.getPointsFromSights(allSights);
  }

  // getPointsFromSights(sights: Sight[]) returns array of sights coordinates
  // using sight entity from entered array.
  private getPointsFromSights(sights: SightModel[]): Coordinates[] {
    return sights.map(sight => sight.coordinates);
  }

  // getSightsFromPoints(points: Coordinates[], amount?: number) returns exact amount of sights
  // or returns all sights using points array to get sights from DB.
  private async getSomeSightsFromPoints(
    points: Coordinates[],
    amount: number
  ): Promise<SightModel[]> {
    if (amount > points.length || !amount) {
      amount = points.length;
    }

    const sightPromises = points.reduce((promises, point, index) => {
      if (index < amount) {
        promises.push(this.sightsService.getSightByCoordinates(point));
      }
      return promises;
    }, []);

    return Promise.all(sightPromises);
  }
}
