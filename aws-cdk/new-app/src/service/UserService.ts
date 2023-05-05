import { AddAssetDTO } from "../dto/AddAssetDTO";
import { GetAssetDTO  } from "../dto/GetAssetDTO";
import { User } from "../model/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    public async addAsset(addAssetDTO: AddAssetDTO): Promise<void> {
        const isAssetExist = Boolean(await this.userRepository.isAssetExist(addAssetDTO.assetId) ?? await this.userRepository.getAssetById(addAssetDTO.assetId))
        if(isUserExist){
            throw new Error('Asset already exist')
        
        }

        const user = User(addAssetDTO)
        await this.userRepository.addAsset(user)
    }
}