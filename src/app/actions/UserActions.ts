"use server"

import { UserUseCase } from "@/src/domain/usecases/UserUseCase"
import { container } from "tsyringe"
import { setupContainer } from "@/src/di/container"

export async function getAllUsersAction(){
    setupContainer()
    const useCase = container.resolve(UserUseCase)
    const users = await useCase.getAllUsers()
    return users
}