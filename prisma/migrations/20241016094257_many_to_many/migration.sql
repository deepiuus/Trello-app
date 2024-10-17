/*
  Warnings:

  - You are about to drop the `UserWorkspaces` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserWorkspaces` DROP FOREIGN KEY `UserWorkspaces_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserWorkspaces` DROP FOREIGN KEY `UserWorkspaces_workspaceId_fkey`;

-- DropTable
DROP TABLE `UserWorkspaces`;

-- CreateTable
CREATE TABLE `WorkspaceUsers` (
    `userId` INTEGER NOT NULL,
    `workspaceId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `workspaceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkspaceUsers` ADD CONSTRAINT `WorkspaceUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkspaceUsers` ADD CONSTRAINT `WorkspaceUsers_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`workspaceId`) ON DELETE CASCADE ON UPDATE CASCADE;
