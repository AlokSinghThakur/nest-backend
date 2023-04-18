import { Controller,Delete,Get, Param ,Post,Body,Put,Query, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { BeltGuard } from 'src/belt/belt.guard';



@Controller('users')
@UseGuards(BeltGuard)
export class UsersController {
    constructor(private readonly usersServices: UsersService){}

    //GET /users --> []
    @Get()
    getUSers(@Query('status') status: 'PowerUser' | 'User'){
        // const service = new UsersService()
        return this.usersServices.getUsers(status);
    }

    //GET /user/:id --> []
    @Get(':id')
    getOneUser(@Param('id',ParseIntPipe) id: number){
        try{
            return  this.usersServices.getUser(id)
        }catch(err){
            throw new NotFoundException();
            
        }
        
    }

    // POST /user/--> { ... }
    @Post()
    @UseGuards(BeltGuard)
    createUser(@Body(new ValidationPipe()) createUsersDto: CreateUsersDto){
        return this.usersServices.createUser(createUsersDto)
    }

    // PUT /users/:id --> { ... }
    @Put(':id')
    updateUsers(@Param('id') id: string, @Body() updateUsers: UpdateUsersDto){
        return this.usersServices.updateUser(+id, UpdateUsersDto)
    }

    //Delete /user/:id --> { ... }
    @Delete(':id')
    removeUser(@Param('id') id: string){
        return this.usersServices.removeUser(+id)
    }

}
