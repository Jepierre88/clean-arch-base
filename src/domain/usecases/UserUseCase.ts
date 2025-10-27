import { inject, injectable } from "tsyringe";
import { UserRepository } from "../repositories/UserRepository";

@injectable()
export class UserUseCase {
    constructor(@inject("UserRepository") private userRepository: UserRepository) {}

    async getAllUsers() {
        return await this.userRepository.getAll();
    }
}