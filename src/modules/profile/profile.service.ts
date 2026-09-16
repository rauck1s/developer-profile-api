import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository.js';
import type { ProfileWithRelations } from './profile.repository.js';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async findProfile(): Promise<ProfileWithRelations> {
    const profile = await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}
