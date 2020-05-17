import { Controller, Get, Route, Post, Body, Put, Delete } from 'tsoa';
import { Sight } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { SightsService } from '@mogilev-guide/api/services/sights';
import { SightsConverter } from '@mogilev-guide/api/helpers';

@Route('sights')
export class SightsController extends Controller {
  @Inject() private sightsService!: SightsService;
  @Inject() private sightsConverter!: SightsConverter;

  @Get()
  public async getSights(): Promise<Sight[]> {
    const dbSights = await this.sightsService.getAllSights();
    return this.sightsConverter.fromDBToFrontArray(dbSights);
  }

  @Get('{id}')
  public async getOneSight(id: string): Promise<Sight> {
    const dbSight = await this.sightsService.getSightByID(id);
    return this.sightsConverter.fromDBToFront(dbSight);
  }

  @Post()
  public async addSight(@Body() place: Sight): Promise<string> {
    const dbSight = await this.sightsConverter.fromFrontToDB(place);
    return this.sightsService.addSight(dbSight);
  }

  @Put('{id}')
  public async updateSights(id: string, @Body() place: Sight): Promise<Sight> {
    const dbSight = await this.sightsConverter.fromFrontToDB(place);
    const updatedSight = await this.sightsService.updateSightByID(
      id,
      dbSight
    );
    return this.sightsConverter.fromDBToFront(updatedSight);
  }

  @Delete('{id}')
  public async deleteSights(id: string): Promise<string> {
    const deleteResult: boolean = await this.sightsService.deleteSightByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
