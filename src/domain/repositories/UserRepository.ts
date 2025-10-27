import { UserEntity } from "../entities/UserEntity";

export abstract class UserRepository {
    abstract getAll(): Promise<UserEntity[]>
}