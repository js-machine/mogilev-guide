import { Controller, Get, Route, Post, Body, Put, Delete } from 'tsoa';
import { Sight } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { SightsService } from '@mogilev-guide/api/services/sights';

@Route('sights')
export class SightsController extends Controller {
  @Inject() private sightsService!: SightsService;

  @Get()
  public async getSights(): Promise<Sight[]> {
    return this.sightsService.getAllSights();
  }

  @Post()
  public async addSight(@Body() place: Sight): Promise<string> {
    return this.sightsService.addSight(place);
  }

  @Get('{id}')
  public async getOneSight(id: string): Promise<Sight> {
    return this.sightsService.getSightByID(id);
  }

  @Put('{id}')
  public async updateSights(id: string, @Body() place: Sight): Promise<Sight> {
    return this.sightsService.updateSightByID(id, place);
  }

  @Delete('{id}')
  public async deleteSights(id: string): Promise<string> {
    const deleteResult: boolean = await this.sightsService.deleteSightByID(id);
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
