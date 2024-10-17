import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from 'src/dto/createBoardDto';
import { UpdateBoardDto } from 'src/dto/updateBoardDto';
import { AddUserDto } from 'src/dto/addUserDto';

@Injectable()
export class BoardService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createBoardDto: CreateBoardDto, userId: number) {
        const { name, description, workspaceId } = createBoardDto;
        const workspace = await this.prismaService.workspace.findUnique({
            where: { workspaceId },
        });
        if (!workspace) throw new NotFoundException('Workspace not found');
        const user = await this.prismaService.workspaceUsers.findFirst({
            where: {
                workspaceId,
                userId,
            },
        });
        if (!user) throw new ForbiddenException('Forbidden');
        const board = await this.prismaService.board.create({
            data: { name, description, workspaceId },
        });
        const workspaceUsers = await this.prismaService.workspaceUsers.findMany({
            where: { workspaceId },
        });
        const boardUsersData = workspaceUsers.map(workspaceUser => ({
            boardId: board.boardId,
            userId: workspaceUser.userId,
        }));
        await this.prismaService.boardUsers.createMany({
            data: boardUsersData,
        });
        return {
            data: {
                boardId: board.boardId,
                name: board.name,
                description: board.description,
                message: 'Board created successfully',
            },
        };
    }
    async update(boardId: number, userId: number, updateBoardDto: UpdateBoardDto) {
        const board = await this.prismaService.board.findUnique({
            where: { boardId },
        });
        if (!board) throw new NotFoundException('Board not found');
        const userBoard = await this.prismaService.boardUsers.findFirst({
            where: { boardId, userId },
        });
        if (!userBoard) throw new ForbiddenException('Forbidden');
        await this.prismaService.board.update({
            where: { boardId },
            data: updateBoardDto,
        });
        return {
            data: {
                boardId: board.boardId,
                name: board.name,
                description: board.description,
                message: 'Board updated successfully',
            },
        };
    }
    async delete(boardId: number, userId: number) {
        const board = await this.prismaService.board.findUnique({
            where: { boardId },
        });
        if (!board) throw new NotFoundException('Board not found');
        const userBoard = await this.prismaService.boardUsers.findFirst({
            where: { boardId, userId },
        });
        if (!userBoard) throw new ForbiddenException('Forbidden');
        await this.prismaService.board.delete({
            where: { boardId },
        });
        return {
            data: {
                boardId: board.boardId,
                name: board.name,
                description: board.description,
                message: 'Board deleted successfully',
            },
        };
    }
    async addUser(workspaceId: number, userId: number, addUserDto: AddUserDto) {
        const workspace = await this.prismaService.workspace.findUnique({
            where: { workspaceId },
        });
        if (!workspace) throw new NotFoundException('Workspace not found');
        const user = await this.prismaService.user.findUnique({
            where: { id: addUserDto.userId },
        });
        if (!user) throw new NotFoundException('User not found');
        const userWorkspace = await this.prismaService.workspaceUsers.findFirst({
            where: { workspaceId, userId: addUserDto.userId },
        });
        if (userWorkspace) throw new ForbiddenException('User already a member of the workspace');
        await this.prismaService.workspaceUsers.create({
            data: {
                workspaceId,
                userId: addUserDto.userId,
            },
        });
        const boards = await this.prismaService.board.findMany({
            where: { workspaceId },
        });
        const boardUsersData = boards.map(board => ({
            boardId: board.boardId,
            userId: addUserDto.userId,
        }));
        await this.prismaService.boardUsers.createMany({
            data: boardUsersData,
        });
        return {
            data: 'User added to workspace and all its boards',
        };
    }
}
