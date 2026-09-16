import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service.js';
import type { Prisma } from '../../generated/prisma/client.js';

const PROFILE_INCLUDE = {
  professionalLinks: {
    orderBy: { label: 'asc' },
  },
  skills: {
    orderBy: { name: 'asc' },
  },
  workExperiences: {
    orderBy: { startedAt: 'desc' },
  },
  projects: {
    orderBy: { name: 'asc' },
  },
} satisfies Prisma.ProfileInclude;

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: typeof PROFILE_INCLUDE;
}>;

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findFirst(): Promise<ProfileWithRelations | null> {
    return this.prisma.profile.findFirst({
      include: PROFILE_INCLUDE,
    });
  }
}
