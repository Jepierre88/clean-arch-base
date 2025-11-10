import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserRepositoryImp } from "@/infraestructure/repositories/UserRepositoryImp";
import { UserDatasourceService } from "@/infraestructure/datasources/UsersDataSourceService";

import {GetPermissionsRepository, LoginRepository, SetCompanyRepository} from "@/domain/index"
import {
  GetPermissionsDatasourceService,
  GetPermissionsRepositoryImp,
  LoginDatasourceService,
  LoginRepositoryImp,
  SetCompanyDatasourceService,
  SetCompanyRepositoryImp,
} from "@/infraestructure/index"

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

  if (!container.isRegistered("GetPermissionsRepository")) {
    container.register<GetPermissionsRepository>("GetPermissionsRepository", {
      useClass: GetPermissionsRepositoryImp,
    });
  }

  if (!container.isRegistered("GetPermissionsDatasourceService")) {
    container.register<GetPermissionsDatasourceService>(
      "GetPermissionsDatasourceService",
      { useClass: GetPermissionsDatasourceService }
    );
  }

  if (!container.isRegistered("SetCompanyRepository")) {
    container.register<SetCompanyRepository>("SetCompanyRepository", {
      useClass: SetCompanyRepositoryImp,
    });
  }

  if (!container.isRegistered("SetCompanyDatasourceService")) {
    container.register<SetCompanyDatasourceService>(
      "SetCompanyDatasourceService",
      { useClass: SetCompanyDatasourceService }
    );
  }

//}

export { container };
