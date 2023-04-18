import { IsEnum, MinLength } from "class-validator";

export class CreateUsersDto {

    @MinLength(3)
    name:  string;

    @IsEnum(['PowerUser', 'User'], {message: 'Use Correct Status'})
    status: 'PowerUser' | 'User'

}
