import * as passport from 'passport';
import * as passportStrategy from 'passport-google-oauth20';
import { AuthService } from '@mogilev-guide/api/services/authorization';
import { Inject } from '@mogilev-guide/api/ioc';
import { User } from '@mogilev-guide/models';
import { GUIDE_ENV_CONFIG } from '@mogilev-guide/api/src/config/env';

export class GoogleOAuth20Authorization {
  @Inject() private authService!: AuthService;

  private GoogleStrategy = passportStrategy.Strategy;

  private googleStrategy = new this.GoogleStrategy(
    {
      clientID: GUIDE_ENV_CONFIG.CLIENT_ID,
      clientSecret: GUIDE_ENV_CONFIG.CLIENT_SECRET,
      callbackURL: GUIDE_ENV_CONFIG.REDIRECT_URL
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.getLoginCallback(this.authService)
  );

  constructor() {
    this.serialize();
    this.init();
  }

  public getStrategy(): passport.Strategy {
    return this.googleStrategy;
  }

  public getUserInfoURL(): string {
    return GUIDE_ENV_CONFIG.GOOGLE_INFO_URL;
  }

  private init() {
    passport.use(this.googleStrategy);
  }

  private serialize() {
    passport.serializeUser((user: User, done) => {
      done(null, user);
    });
  }

  private getLoginCallback(authServ: AuthService) {
    return async (
      accessToken: string,
      refreshToken: string,
      profile: passportStrategy.Profile,
      done: passportStrategy.VerifyCallback
    ) => {
      const loginUser: User = {
        id: profile.id,
        login: profile.displayName,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      };

      const currentUser: User = await authServ.getUsersByID(loginUser.id);
      if (!currentUser) {
        authServ.addUsers(loginUser);
        done(null, loginUser, accessToken);
        return;
      }
      done(null, currentUser, accessToken);
    };
  }
}
