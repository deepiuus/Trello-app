import { IsNotEmpty } from 'class-validator';

export class UpdateWorkspaceDto {
    @IsNotEmpty()
    readonly name?: string;
    @IsNotEmpty()
    readonly description?: string;
}
