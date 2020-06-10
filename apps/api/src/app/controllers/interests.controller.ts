import { Controller, Get, Route, Post, Put, Delete, Body } from 'tsoa';
import { InterestV2 } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { InterestsService } from '@mogilev-guide/api/services/interests';
import { InterestsConverter } from '@mogilev-guide/api/helpers';

@Route('interests')
export class InterestsController extends Controller {
  @Inject() private interestsService!: InterestsService;
  @Inject() private interestsConverter!: InterestsConverter;

  @Get()
  public async getInterests(): Promise<InterestV2[]> {
    const dbInterests = await this.interestsService.getInterests();
    return this.interestsConverter.fromDBToFrontArray(dbInterests);
  }

  @Get('{id}')
  public async getInterest(id: string): Promise<InterestV2> {
    const dbInterest = await this.interestsService.getInterestByID(id);
    return this.interestsConverter.fromDBToFront(dbInterest);
  }

  @Post()
  public async addInterest(@Body() interest: InterestV2): Promise<string> {
    const dbInterests = await this.interestsConverter.fromFrontToDB(interest);
    return this.interestsService.addInterest(dbInterests);
  }

  @Put('{id}')
  public async updateInterests(
    id: string,
    @Body() interest: InterestV2
  ): Promise<InterestV2> {
    const dbInterest = await this.interestsConverter.fromFrontToDB(interest);
    const updatedInterest = await this.interestsService.updateInterestByID(
      id,
      dbInterest
    );
    return this.interestsConverter.fromDBToFront(updatedInterest);
  }

  @Delete('{id}')
  public async deleteInterests(id: string): Promise<string> {
    const deleteResult: boolean = await this.interestsService.deleteInterestByID(
      id
    );
    return deleteResult
      ? `Success delete ${id}`
      : `Something went wrong with delete ${id}`;
  }
}
