import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claims } from './claims.entity';
import { ClaimsDTO } from './claims.dto';
import { ClaimsMapper } from './claims.mapper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claims)
    private claimsRepository: Repository<Claims>,
    private userService: UserService,
  ) {}

  async create(claimsDtos: ClaimsDTO[]): Promise<ClaimsDTO[]> {
    const claimsEntities = [];

    for (const claimsDto of claimsDtos) {
      const user = await this.userService.findOne(claimsDto.userId);
      const newClaim = ClaimsMapper.fromDtoToEntity(claimsDto, user);
      claimsEntities.push(newClaim);
    }

    const savedClaims = await this.claimsRepository.save(claimsEntities);
    return savedClaims.map(ClaimsMapper.fromEntityToDto);
  }

  async findAll(): Promise<Claims[]> {
    return this.claimsRepository.find();
  }

  async findOne(id: string): Promise<Claims> {
    const claim = await this.claimsRepository.findOneOrFail({ where: { id } });
    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }
    return claim;
  }

  async update(id: string, claimsDto: ClaimsDTO): Promise<Claims> {
    const claim = await this.findOne(id);
    const updatedClaim = { ...claim, ...claimsDto };
    return this.claimsRepository.save(updatedClaim);
  }

  async remove(id: string): Promise<void> {
    const claim = await this.findOne(id);
    await this.claimsRepository.remove(claim);
  }
}
