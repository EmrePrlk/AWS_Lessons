import { DynamoDB } from "aws-sdk";
import * as env from 'env-var';
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

const USER_TABLE_NAME = env.get('USER_TABLE_NAME').required().asString();

const docClient = new DynamoDB.DocumentClient({
    region: 'us-east-1' 
});

const userRepository = new UserRepository('Asset-Table', docClient);

export const userService = new UserService(userRepository)