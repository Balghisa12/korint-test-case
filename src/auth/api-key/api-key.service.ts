import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './api-key.entity';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
  ) {}

  private generateApiKey(): string {
    return randomBytes(32).toString('hex');
  }

  private hashApiKey(apiKey: string): string {
    return createHash('sha256').update(apiKey).digest('hex');
  }

  async create(): Promise<{ apiKey: string }> {
    const plainApiKey = this.generateApiKey();
    const hashedApiKey = this.hashApiKey(plainApiKey);

    const newApiKey = this.apiKeyRepository.create({ key: hashedApiKey });

    await this.apiKeyRepository.save(newApiKey);
    return {
      apiKey: plainApiKey,
    };
  }

  async findAll(): Promise<ApiKey[]> {
    return this.apiKeyRepository.find();
  }

  async findOne(key: string): Promise<ApiKey> {
    const hashedApiKey = this.hashApiKey(key);
    const apiKey = await this.apiKeyRepository.findOne({
      where: { key: hashedApiKey },
    });
    if (!apiKey) {
      throw new NotFoundException(`API key not found`);
    }
    return apiKey;
  }

  async update(key: string): Promise<ApiKey> {
    const apiKey = await this.findOne(key);
    apiKey.key = key;
    return this.apiKeyRepository.save(apiKey);
  }

  async remove(key: string): Promise<void> {
    const apiKey = await this.findOne(key);
    await this.apiKeyRepository.remove(apiKey);
  }
}
