import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository";
import { UserRepositoryImp } from "../infraestructure/repositories/UserRepositoryImp";
import { UserDatasourceService } from "../infraestructure/datasources/UsersDataSourceService";

//export function setupContainer() {
  if (!container.isRegistered("UserDatasourceService")) {
    container.register<UserDatasourceService>(
      "UserDatasourceService",
      { useClass: UserDatasourceService }
    );
  }

  if (!container.isRegistered("UserRepository")) {
    container.register<UserRepository>(
      "UserRepository",
      { useClass: UserRepositoryImp }
    );
  }
//}

export { container };
