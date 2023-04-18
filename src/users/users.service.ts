import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {

    private users = [
        { id: 0, name: 'userA', status:'PowerUser'},
        { id: 1, name: 'userB', status:'User'}
    ];

    getUsers(status?: 'PowerUser' | 'User'){
        if(status){
            return this.users.filter((user)=> user.status === status);
        
        }

        return this.users;
    }

    getUser(id: number){
        const user = this.users.find((user)=> user.id === id);

        if(!user){
            throw new Error('ninja not found');

        }

        return user
    }

    createUser(createUsersDto : CreateUsersDto){
        const newUser = {
            ...createUsersDto,
            id: Date.now(),
        }
        this.users.push(newUser);

        return newUser;
    }

    updateUser(id: number, updateUsersDto:UpdateUsersDto){
        this.users = this.users.map((user)=>{
            if(user.id === id){
                return { ...user, ...updateUsersDto}
            }

            return user;
        })

        return this.getUser(id);
    }

    removeUser(id: number){
        const toBeRemoved = this.getUser(id);

        this.users = this.users.filter((user)=> user.id !==id);

        return toBeRemoved;
    }
}
