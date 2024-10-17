/*
  Warnings:

  - You are about to drop the column `userId` on the `Workspace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Workspace` DROP FOREIGN KEY `Workspace_userId_fkey`;

-- AlterTable
ALTER TABLE `Workspace` DROP COLUMN `userId`,
    MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserWorkspaces` (
    `userId` INTEGER NOT NULL,
    `workspaceId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `workspaceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserWorkspaces` ADD CONSTRAINT `UserWorkspaces_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkspaces` ADD CONSTRAINT `UserWorkspaces_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`workspaceId`) ON DELETE CASCADE ON UPDATE CASCADE;
