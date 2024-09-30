import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsDTO } from './claims.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'claims',
  version: '1',
})
export class ClaimsControllerV1 {
  constructor(private readonly claimsService: ClaimsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all claims',
    description: '',
    tags: ['Claims'],
  })
  findAll() {
    return this.claimsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve all claims by ID',
    description: '',
    tags: ['Claims'],
  })
  findOne(@Param('id') id: string) {
    return this.claimsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create Claims',
    description: '',
    tags: ['Claims'],
  })
  create(@Body() claimsDto: ClaimsDTO[]) {
    return this.claimsService.create(claimsDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update Claims',
    description: '',
    tags: ['Claims'],
  })
  update(@Param('id') id: string, @Body() claimsDto: ClaimsDTO) {
    return this.claimsService.update(id, claimsDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Claims',
    description: '',
    tags: ['Claims'],
  })
  remove(@Param('id') id: string) {
    return this.claimsService.remove(id);
  }
}
