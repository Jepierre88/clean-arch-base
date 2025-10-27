import { UserRepository } from "@/src/domain/repositories/UserRepository";
import { inject, injectable } from "tsyringe";
import { UserDatasourceService } from "../datasources/UsersDataSourceService";

@injectable()
export class UserRepositoryImp implements UserRepository {
    constructor(
        @inject("UserDatasourceService") private userDatasourceService: UserDatasourceService
    ) {}

    async getAll() {
        return await this.userDatasourceService.getAll();
    }
}