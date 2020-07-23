import { Interest, InterestDto } from './interest';

export class InterestMapper {
  static mapToUi(dto: InterestDto, activeLanguage: string): Interest {
    return {
      ...dto,
      description: dto.description[activeLanguage],
      label: dto.label[activeLanguage]
    };
  }
}
