import {DynamoDB } from "aws-sdk";
import { AddAssetDTO } from "../dto/AddAssetDTO";
import { User } from "../model/User";
import { createUpdateParams } from '../util/repository/addGetExpression';
import { GetAssetDTO } from "../dto/GetAssetDTO";

export class UserRepository {
    constructor(private tableName: string, private docClient: DynamoDB.DocumentClient) {

    }

    public async addAsset(user: User): Promise<void>{
        const params = {
            TableName : this.tableName,
            Item: user
        }
    }

    public async getAsset(assetId: string, user: GetAssetDTO): Promise<void>{
        const params = {
            TableName : this.tableName,
            Key: {
                "id": assetId
            },
            ...createUpdateParams(user)
        };
        await this.docClient.update(params).promise()
    }
}
