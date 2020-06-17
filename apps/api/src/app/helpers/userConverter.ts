import { User } from '@mogilev-guide/models';
import { UserModel } from '@mogilev-guide/api/models';
import { Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class UsersConverter {
  public static async fromDBToFront(dbUser: UserModel): Promise<User> {
    return {
      id: dbUser.id,
      login: dbUser.login,
      email: dbUser.email,
      firstName: dbUser?.firstName || null,
      lastName: dbUser?.lastName || null,
      rights: dbUser?.rights || null,
      avatar: dbUser?.avatar || null
    };
  }

  public static async fromFrontToDB(frontUser: User): Promise<UserModel> {
    return {
      id: frontUser.id,
      login: frontUser.login,
      email: frontUser.email,
      firstName: frontUser?.firstName || null,
      lastName: frontUser?.lastName || null,
      rights: frontUser?.rights || null,
      avatar: frontUser?.avatar || null
    };
  }

  public static async fromDBToFrontArray(dbUser: UserModel[]): Promise<User[]> {
    const dbUserArr = dbUser.map((user) => this.fromDBToFront(user));
    return Promise.all(dbUserArr);
  }

  public static async fromFrontToDBArray(
    frontUser: User[]
  ): Promise<UserModel[]> {
    const dbUserArr = frontUser.map((langRec) => this.fromFrontToDB(langRec));
    return Promise.all(dbUserArr);
  }
}
