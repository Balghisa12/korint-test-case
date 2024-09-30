import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsControllerV1 } from './claims.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claims } from './claims.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Claims]), UserModule],
  providers: [ClaimsService],
  controllers: [ClaimsControllerV1],
  exports: [ClaimsService],
})
export class ClaimsModule {}
