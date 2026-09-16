import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProfessionalLinkModel } from './professional-link.model.js';
import { ProjectModel } from './project.model.js';
import { SkillModel } from './skill.model.js';
import { WorkExperienceModel } from './work-experience.model.js';

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [ProfessionalLinkModel])
  professionalLinks!: ProfessionalLinkModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [WorkExperienceModel])
  workExperiences!: WorkExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}
