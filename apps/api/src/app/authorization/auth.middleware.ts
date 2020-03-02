import 'dotenv/config'; //for work with environment variables from .env file
import * as express from 'express';
import * as request from 'request';
import { User } from '@mogilev-guide/models';
import { Inject } from '@mogilev-guide/api/ioc';
import { AuthService } from '@mogilev-guide/api/services/authorization';

export class AuthorizationMiddleware {
  @Inject() private authService!: AuthService;

  private authRoutes = express.Router();
  private userInfoURL: string;
  private redirectFailURL: string = process.env.REDIRECT_IF_FAIL_URL;
  private errorFlag = false;

  public getMiddlewareRoutes(userInfoURL: string): express.Router {
    this.userInfoURL = userInfoURL;
    this.authRoutes
      .post('/api/*', this.checkCookie(this.redirectFailURL))
      .put('/api/*', this.checkCookie(this.redirectFailURL))
      .delete('/api/*', this.checkCookie(this.redirectFailURL));

    return this.authRoutes;
  }

  private checkCookie(redirectURL: string) {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const token = await req.cookies.access_token;
      if (!token) {
        res.redirect(redirectURL);
        return;
      }
      this.sendRequestForUserID(token);
      if (this.errorFlag) {
        res.redirect(redirectURL);
        return;
      }
      return next();
    };
  }

  private sendRequestForUserID(token: string) {
    request(
      {
        method: 'GET',
        url: this.userInfoURL,
        qs: {
          alt: 'json',
          accessToken: token
        }
      },
      this.getUserID(this.authService)
    );
  }

  private getUserID(authServ: AuthService) {
    return async (error: Error, response: express.Response, body) => {
      if (!error && response.statusCode == 200) {
        const user = JSON.parse(body);
        const currentUser: User = await authServ.getUsersByID(user.id);
        if (!currentUser) {
          this.errorFlag = true;
        }
      }
    };
  }
}
