import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { IUser } from '@/interfaces/users.interface';

export class UserModel extends Model<IUser> implements IUser {
    createdAt: Date;
    updatedAt: Date;
    public id: string;
    public userName: string;
    public userType: string;
    public email: string;
    public password: string;
   
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                field: "id",
            },
            userName: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                field: "UserName",
            },
            userType: {
                type: DataTypes.STRING,
                field: "UserTyep",
            },
            email: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: "email",
            },
            password: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: "Password",
            },

            createdAt:{
              type: DataTypes.DATE,
              field: "createdAt",

            },
            updatedAt:{
              type:DataTypes.DATE,
              field:"updatedAt"
            }
        },
        {
            tableName: 'users',
            sequelize,
            timestamps: true,
            freezeTableName: true,
        },
    );

    return UserModel;
}