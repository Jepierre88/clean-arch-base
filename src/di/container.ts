import "reflect-metadata";
import { container } from "tsyringe";

import {GetPermissionsRepository, LoginRepository} from "@/domain/index"
import {
  LoginDatasourceService,
  LoginRepositoryImp,
} from "@/infraestructure/index"

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

  // set-company bindings removed (companies flow deprecated)

export { container };
