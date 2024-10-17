/*
  Warnings:

  - You are about to drop the column `userId` on the `Board` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_userId_fkey`;

-- AlterTable
ALTER TABLE `Board` DROP COLUMN `userId`,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `BoardUsers` (
    `userId` INTEGER NOT NULL,
    `boardId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `boardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BoardUsers` ADD CONSTRAINT `BoardUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardUsers` ADD CONSTRAINT `BoardUsers_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`boardId`) ON DELETE CASCADE ON UPDATE CASCADE;
