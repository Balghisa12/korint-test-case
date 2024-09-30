import { Claims } from './claims.entity';
import { ClaimsDTO } from './claims.dto';
import { User } from 'src/user/user.entity';

export class ClaimsMapper {
  static fromDtoToEntity(createClaimsDto: ClaimsDTO, user: User): Claims {
    const claim = new Claims();
    claim.title = createClaimsDto.title;
    claim.description = createClaimsDto.description;
    claim.value = createClaimsDto.value;
    claim.users = user;
    return claim;
  }

  static fromEntityToDto(claim: Claims): ClaimsDTO {
    const dto = new ClaimsDTO();
    dto.id = claim.id;
    dto.title = claim.title;
    dto.description = claim.description;
    dto.value = claim.value;
    dto.userId = claim.users?.id;
    return dto;
  }
}
