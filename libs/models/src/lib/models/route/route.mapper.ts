import { Route, RouteDto } from './route';

export class RouteMapper {
  static mapToUi(dto: RouteDto, activeLanguage: string): Route {
    return {
      ...dto,
      title: dto.title[activeLanguage]
    };
  }

  static mapToDto(data): RouteDto {
    const dto = {
      ...data
    };

    delete dto.title;

    return dto;
  }
}
