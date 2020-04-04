import { Sight, SightDto } from './sight';
import { InterestMapper } from '../interest';

export class SightMapper {
  static mapToUi(dto: SightDto, activeLanguage: string): Sight {
    return {
      ...dto,
      name: dto.name[activeLanguage],
      address: dto.address[activeLanguage],
      history: dto.history[activeLanguage],
      interest: InterestMapper.mapToUi(dto.interest, activeLanguage)
    };
  }

  static mapToDto(data): SightDto {
    const dto = {
      ...data
    };

    delete dto.name;
    delete dto.address;
    delete dto.history;
    delete dto.interest;

    return dto;
  }
}
