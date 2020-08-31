import { Controller, Get, Route, Post, Body, Put, Delete } from 'tsoa';
import { RouteDto } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { RoutesService } from '@mogilev-guide/api/services/routes';
import { RoutesConverter } from '@mogilev-guide/api/helpers';

@Route('routes')
export class RoutesController extends Controller {
  @Inject() private RoutesService!: RoutesService;
  @Inject() private RoutesConverter!: RoutesConverter;

  @Get()
  public async getRoutes(): Promise<RouteDto[]> {
      const dbRoutes = await this.RoutesService.getAllRoutes();
      return this.RoutesConverter.fromDBToFrontArray(dbRoutes);
  }

  @Get('{id}')
  public async getOneRoute(id: string): Promise<RouteDto> {
    const dbRoute = await this.RoutesService.getRouteByID(id);
    return this.RoutesConverter.fromDBToFront(dbRoute);
  }

  @Post()
  public async addRoute(@Body() place: RouteDto): Promise<string> {
    const dbRoute = await this.RoutesConverter.fromFrontToDB(place);
    return this.RoutesService.addRoute(dbRoute);
  }

  @Put('{id}')
  public async updateRoutes(
    id: string,
    @Body() place: RouteDto
  ): Promise<RouteDto> {
    const dbRoute = await this.RoutesConverter.fromFrontToDB(place);
    const updatedRoute = await this.RoutesService.updateRouteByID(id, dbRoute);
    return this.RoutesConverter.fromDBToFront(updatedRoute);
  }

  @Delete('{id}')
  public async deleteRoute(id: string): Promise<string> {
    const deleteResult: boolean = await this.RoutesService.deleteRouteByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
