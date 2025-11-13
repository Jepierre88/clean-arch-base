import "reflect-metadata";
import { container } from "tsyringe";

import { LoginRepository, ManualControlRepository } from "@/domain/index";
import {
  CommonDatasourceService,
  CommonRepositoryImp,
  LoginDatasourceService,
  LoginRepositoryImp,
  ManualControlDatasourceService,
  ManualControlRepositoryImp,
  PaymentDatasourceService,
  PaymentRepositoryImp,
} from "@/infraestructure/index";

if (!container.isRegistered("LoginRepository")) {
  container.register<LoginRepository>("LoginRepository", {
    useClass: LoginRepositoryImp,
  });
}

if (!container.isRegistered("LoginDatasourceService")) {
  container.register<LoginDatasourceService>("LoginDatasourceService", {
    useClass: LoginDatasourceService,
  });
}

if (!container.isRegistered("ManualControlRepository")) {
  container.register<ManualControlRepository>("ManualControlRepository", {
    useClass: ManualControlRepositoryImp,
  });
}

if (!container.isRegistered("ManualControlDatasourceService")) {
  container.register<ManualControlDatasourceService>(
    "ManualControlDatasourceService",
    { useClass: ManualControlDatasourceService }
  );
}

if (!container.isRegistered("CommonDatasourceService")) {
  container.register("CommonDatasourceService", {
    useClass: CommonDatasourceService,
  });
}

if (!container.isRegistered("CommonRepository")) {
  container.register("CommonRepository", { useClass: CommonRepositoryImp });
}

if(!container.isRegistered("PaymentDatasourceService")){
  container.register("PaymentDatasourceService", { useClass: PaymentDatasourceService });
}

if(!container.isRegistered("PaymentRepository")){
  container.register("PaymentRepository", { useClass: PaymentRepositoryImp });
}

// set-company bindings removed (companies flow deprecated)

export { container };
