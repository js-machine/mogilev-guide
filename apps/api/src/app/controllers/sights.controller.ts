import { Controller, Get, Route, Post, Body, Put, Delete } from 'tsoa';
import { Sight, SightReview } from '@mogilev-guide/models';
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
  public async addSight(@Body() place: Sight): Promise<Date> {
    let insertDoc = await this.sightsService.addSight(place);
    return insertDoc.writeTime.toDate();
  }

  @Get('{id}')
  public async getOneSight(id: string): Promise<Sight> {
    const sights: Sight[] = await this.sightsService.getSightsByID(id);
    return sights[0];
  }

  @Put('{id}')
  public async updateSights(id: string, @Body() place: Sight): Promise<Sight> {
    return await this.sightsService.updateSightByID(id, place);
  }

  @Delete('{id}')
  public async deleteSights(id: string): Promise<string> {
    let isDeleted = await this.sightsService.deleteSightByID(id);
    return `Success delete ${id}`;
  }
}
