import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserRepositoryImp } from "@/infraestructure/repositories/UserRepositoryImp";
import { UserDatasourceService } from "@/infraestructure/datasources/UsersDataSourceService";

import {LoginRepository} from "@/domain/index"
import {LoginRepositoryImp, LoginDatasourceService} from "@/infraestructure/index"

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

  if(!container.isRegistered("LoginRepository")){
    container.register<LoginRepository>(
      "LoginRepository",
      { useClass: LoginRepositoryImp }
    );
  }

  if(!container.isRegistered("LoginDatasourceService")){
    container.register<LoginDatasourceService>(
      "LoginDatasourceService",
      { useClass: LoginDatasourceService }
    );
  }

//}

export { container };
