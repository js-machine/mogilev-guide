import { Controller, Get, Route, Post, Body, Put, Delete } from 'tsoa';
import { RouteDto } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { RoutesService } from '@mogilev-guide/api/services/routes';
import { RoutesConverter } from '@mogilev-guide/api/helpers';

@Route('routes')
export class RoutesController extends Controller {
  @Inject() private routesService!: RoutesService;
  @Inject() private routesConverter!: RoutesConverter;

  @Get()
  public async getRoutes(): Promise<RouteDto[]> {
      const dbRoutes = await this.routesService.getAllRoutes();
      return this.routesConverter.fromDBToFrontArray(dbRoutes);
  }

  @Get('{id}')
  public async getOneRoute(id: string): Promise<RouteDto> {
    const dbRoute = await this.routesService.getRouteByID(id);
    return this.routesConverter.fromDBToFront(dbRoute);
  }

  @Post()
  public async addRoute(@Body() place: RouteDto): Promise<string> {
    const dbRoute = await this.routesConverter.fromFrontToDB(place);
    return this.routesService.addRoute(dbRoute);
  }

  @Put('{id}')
  public async updateRoutes(
    id: string,
    @Body() place: RouteDto
  ): Promise<RouteDto> {
    const dbRoute = await this.routesConverter.fromFrontToDB(place);
    const updatedRoute = await this.routesService.updateRouteByID(id, dbRoute);
    return this.routesConverter.fromDBToFront(updatedRoute);
  }

  @Delete('{id}')
  public async deleteRoute(id: string): Promise<string> {
    const deleteResult: boolean = await this.routesService.deleteRouteByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
