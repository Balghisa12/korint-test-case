import { Controller, Post } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Controller({ path: 'api-keys', version: '1' })
export class ApiKeyControllerV1 {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  async create(): Promise<{ apiKey: string }> {
    return this.apiKeyService.create();
  }
}
