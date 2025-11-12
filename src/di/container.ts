import "reflect-metadata";
import { container } from "tsyringe";

import { LoginRepository, ManualControlRepository} from "@/domain/index"
import {
  LoginDatasourceService,
  LoginRepositoryImp,
  ManualControlDatasourceService,
  ManualControlRepositoryImp,
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

  if(!container.isRegistered("ManualControlRepository")){
    container.register<ManualControlRepository>(
      "ManualControlRepository",
      { useClass: ManualControlRepositoryImp }
    )
  }

  if(!container.isRegistered("ManualControlDatasourceService")){
    container.register<ManualControlDatasourceService>(
      "ManualControlDatasourceService",
      { useClass: ManualControlDatasourceService }
    )
  }

  // set-company bindings removed (companies flow deprecated)

export { container };
