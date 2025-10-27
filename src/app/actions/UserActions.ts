"use server"

import { UserUseCase } from "@/src/domain/usecases/UserUseCase"
import { container } from "tsyringe"
import "@/src/di/container"

export async function getAllUsersAction(){
    const useCase = container.resolve(UserUseCase)
    const users = await useCase.getAllUsers()
    return users
}