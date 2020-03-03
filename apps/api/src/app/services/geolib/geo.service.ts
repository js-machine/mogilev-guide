import { Injectable, Inject } from '@mogilev-guide/api/ioc';
import { Sight, Coordinates } from '@mogilev-guide/models';
import { SightsService } from '@mogilev-guide/api/services/sights';
import * as geolib from 'geolib';

@Injectable()
export class GeoService {
  @Inject() private sightsService!: SightsService;

  public async getOneSightsFromPoints(startPoint: Coordinates): Promise<Sight> {
    const allPoints: Coordinates[] = await this.getAllCoordinates();

    //find only one the nearest point from array of points
    const nearestPoint = geolib.findNearest(startPoint, allPoints);

    const nearestSight: Sight = await this.sightsService.getSightByCoordinates(
      nearestPoint as Coordinates
    );

    return nearestSight;
  }

  public async getAmountSightsFromPoints(
    startPoint: Coordinates,
    amount: number
  ): Promise<Sight[]> {
    const allPoints: Coordinates[] = await this.getAllCoordinates();

    //Sorted array of points by distance to a reference coordinate.
    const nearestPoints = geolib.orderByDistance(startPoint, allPoints);

    const nearestSights: Sight[] = await this.getSomeSightsFromPoints(
      nearestPoints as Coordinates[],
      amount
    );
    return nearestSights;
  }

  // getAllCoordinates() returns array of all sights coordinates
  // using sight entity from DB.
  private async getAllCoordinates(): Promise<Coordinates[]> {
    const allSights = await this.sightsService.getAllSights();
    return this.getPointsFromSights(allSights);
  }

  // getPointsFromSights(sights: Sight[]) returns array of sights coordinates
  // using sight entity from entered array.
  private getPointsFromSights(sights: Sight[]): Coordinates[] {
    const points: Coordinates[] = sights.map(
      (sight: Sight) => sight.coordinates
    );
    return points;
  }

  // getSightsFromPoints(points: Coordinates[], amount?: number) returns exact amount of sights
  // or returns all sights using points array to get sights from DB.
  private async getSomeSightsFromPoints(
    points: Coordinates[],
    amount: number
  ): Promise<Sight[]> {
    if (amount > points.length || !amount) {
      amount = points.length;
    }

    const allights: Sight[] = await this.sightsService.getAllSights();

    const someSights: Sight[] = points.reduce((sights, point, index) => {
      if (index < amount) {
        const sight: Sight = allights.find(
          sght =>
            sght.coordinates.latitude === point.latitude &&
            sght.coordinates.longitude === point.longitude
        );
        sights.push(sight);
      }
      return sights;
    }, []);

    return someSights;
  }
}
