import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

import { Entity,Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    // constructor(
    //     @InjectRepository(UserEntity)
    //     private userRepository: Repository<UserEntity>,
    // ){}

    // findAll(): Promise<UserEntity[]>{
    //     return this.userRepository.find();
    // }

    // findOne(id:number): Promise<UserEntity>{
    //     return this.userRepository.findOne(id);
    // }

    // create(user: UserEntity): Promise<UserEntity>{
    //     return this.userRepository.save(user)
    // }

    // async update (params:type) =>  {

    // }
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

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    dob: string;

    @Column()
    gender: string;

    @Column()
    status: string;
}


