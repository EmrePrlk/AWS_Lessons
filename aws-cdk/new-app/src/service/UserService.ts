import { AddAssetDTO } from "../dto/AddAssetDTO";
import { GetAssetDTO  } from "../dto/GetAssetDTO";
import { User } from "../model/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    public async addAsset(addAssetDTO: AddAssetDTO): Promise<User> {
        const newAsset = new User(addAssetDTO);
        await this.userRepository.addAsset(newAsset);
        return newAsset;
    }

    public async getAsset(id: string): Promise<User>{
        const user = this.userRepository.getAsset(id)
        if(!user) throw new Error('User not found');
        return user
    }
}