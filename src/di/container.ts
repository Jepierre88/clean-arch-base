import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository";
import { UserRepositoryImp } from "../infraestructure/repositories/UserRepositoryImp";
import { UserDatasourceService } from "../infraestructure/datasources/UsersDataSourceService";

container.registerSingleton<UserDatasourceService>("UserDatasourceService", UserDatasourceService);

container.registerSingleton<UserRepository>("UserRepository", UserRepositoryImp);

export { container };
