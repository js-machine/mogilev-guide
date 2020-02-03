import { Controller, Get, Route } from 'tsoa'
import { Sight } from '@mogilev-guide/models'
import { Inject } from '@mogilev-guide/api/ioc'
import { SightService } from '@mogilev-guide/api/services/sight'

@Route('sight')
export class SightController extends Controller {
  @Inject() private sightService!: SightService

  @Get('{id}')
  public getSight(id: string): Promise<Sight> {
    return this.sightService.getSight(id)
  }
}
