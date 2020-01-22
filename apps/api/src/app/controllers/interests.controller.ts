import { Controller, Get, Route } from 'tsoa';
import { Interest } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { InterestsService } from '@mogilev-guide/api/services/interests';

@Route('interests')
export class InterestsController extends Controller {
  @Inject() private interestsService!: InterestsService;

  @Get()
  public async getInterests(): Promise<Interest[]> {
    return this.interestsService.getInterests();
  }
}
