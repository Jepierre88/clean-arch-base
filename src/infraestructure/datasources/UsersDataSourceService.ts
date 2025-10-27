import { UserEntity } from "@/src/domain/entities/UserEntity";
import { UserRepository } from "@/src/domain/repositories/UserRepository";
import { injectable } from "tsyringe";

@injectable()
export class UserDatasourceService implements UserRepository {
    async getAll(): Promise<UserEntity[]> {
        return new Promise((resolve) => {
            resolve([
                {
                    email: "john.doe@example.com",
                    id: "1",
                    name: "John Doe",
                }
            ]);
        });
    }
}