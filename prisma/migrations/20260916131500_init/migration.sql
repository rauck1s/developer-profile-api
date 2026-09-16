-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_link" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profile_id" UUID NOT NULL,
    "label" STRING NOT NULL,
    "url" STRING(2048) NOT NULL,

    CONSTRAINT "professional_link_pkey" PRIMARY KEY ("id"),
    INDEX "professional_link_profile_id_idx" ("profile_id"),
    CONSTRAINT "professional_link_profile_id_label_key" UNIQUE ("profile_id", "label"),
    CONSTRAINT "professional_link_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "skill" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profile_id" UUID NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id"),
    INDEX "skill_profile_id_idx" ("profile_id"),
    CONSTRAINT "skill_profile_id_name_key" UNIQUE ("profile_id", "name"),
    CONSTRAINT "skill_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "work_experience" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profile_id" UUID NOT NULL,
    "company" STRING NOT NULL,
    "position" STRING NOT NULL,
    "achievement" STRING,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "work_experience_pkey" PRIMARY KEY ("id"),
    INDEX "work_experience_profile_id_idx" ("profile_id"),
    CONSTRAINT "work_experience_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profile_id" UUID NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "url" STRING(2048) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id"),
    INDEX "project_profile_id_idx" ("profile_id"),
    CONSTRAINT "project_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
