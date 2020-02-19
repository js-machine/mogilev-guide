import { Controller, Get, Route, Post, Body, Put, Delete, Request } from 'tsoa';
import { Sight, Coordinates } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { SightsService } from '@mogilev-guide/api/services/sights';
import * as geolib from 'geolib';
import * as express from 'express';

@Route('map')
export class MapController extends Controller {
  @Inject() private sightsService!: SightsService;

  @Get('nearest')
  public async getNearestPlace(
    @Request() request: express.Request
  ): Promise<Sight> {
    //point relative to which the nearest points are searched
    const coordinate: Coordinates = request.body;
    const allPoints: Coordinates[] = await this.getAllCoordinates();

    //find only one the nearest point from array of points
    const nearestPoint = geolib.findNearest(coordinate, allPoints);
    return await this.sightsService.getSightByCoordinates(
      nearestPoint as Coordinates
    );
  }

  @Get('nearest/{amount}')
  public async getNearestPlacesByAmount(
    amount: number,
    @Request() request: express.Request
  ): Promise<Sight[]> {
    //point relative to which the nearest points are searched
    const coordinate: Coordinates = request.body;
    const allPoints: Coordinates[] = await this.getAllCoordinates();

    //Sorted array of points by distance to a reference coordinate.
    const nearestPoints = geolib.orderByDistance(coordinate, allPoints);
    return await this.getSightsFromPoints(
      nearestPoints as Coordinates[],
      amount
    );
  }

  // getAllCoordinates() returns array of all sights coordinates
  // using sight entity from DB.
  private async getAllCoordinates(): Promise<Coordinates[]> {
    const allSights = await this.sightsService.getAllSights();
    return await this.getPointsFromSights(allSights);
  }

  // getPointsFromSights(sights: Sight[]) returns array of sights coordinates
  // using sight entity from entered array.
  private async getPointsFromSights(sights: Sight[]): Promise<Coordinates[]> {
    let points: Coordinates[] = [];
    sights.forEach(sight => {
      points.push(sight.coordinates);
    });
    return points;
  }

  // getSightsFromPoints(points: Coordinates[], amount?: number) returns exact amount of sights
  // or returns all sights using points array to get sights from DB.
  private async getSightsFromPoints(
    points: Coordinates[],
    amount?: number
  ): Promise<Sight[]> {
    let sights: Sight[] = [];
    if (amount > points.length || !amount) {
      amount = points.length;
    }
    for (let i: number = 0; i < amount; i++) {
      let sight: Sight = await this.sightsService.getSightByCoordinates(
        points[i]
      );
      sights.push(sight);
    }
    return sights;
  }
}
