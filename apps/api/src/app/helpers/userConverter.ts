import { User } from '@mogilev-guide/models';
import { UserModel } from '@mogilev-guide/api/models';
import { Injectable } from '@mogilev-guide/api/ioc';

@Injectable()
export class UsersConverter {
  public static async fromDBToFront(dbUser: UserModel): Promise<User> {
    const frontUser: User = {
      id: dbUser.id,
      login: dbUser.login,
      email: dbUser.email,
      firstName: dbUser?.firstName || null,
      lastName: dbUser?.lastName || null,
      rights: dbUser?.rights || null,
      avatar: dbUser?.avatar || null
    };
    return frontUser;
  }

  public static async fromFrontToDB(frontUser: User): Promise<UserModel> {
    const dbUser: UserModel = {
      id: frontUser.id,
      login: frontUser.login,
      email: frontUser.email,
      firstName: frontUser?.firstName || null,
      lastName: frontUser?.lastName || null,
      rights: frontUser?.rights || null,
      avatar: frontUser?.avatar || null
    };
    return dbUser;
  }

  public static async fromDBToFrontArray(dbUser: UserModel[]): Promise<User[]> {
    const dbUserArr = dbUser.reduce((userArr, user) => {
      const frontUser = this.fromDBToFront(user);
      userArr.push(frontUser);
      return userArr;
    }, []);

    return Promise.all(dbUserArr);
  }

  public static async fromFrontToDBArray(
    frontUser: User[]
  ): Promise<UserModel[]> {
    const dbUserArr = frontUser.reduce((userArr, langRec) => {
      const dbUser = this.fromFrontToDB(langRec);
      userArr.push(dbUser);
      return userArr;
    }, []);

    return Promise.all(dbUserArr);
  }
}
