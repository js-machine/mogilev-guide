import "dotenv/config"; //for work with environment variables from .env file
import * as express from 'express';
import * as request from 'request';
import { User } from '@mogilev-guide/models';
import { Inject, Injectable } from '@mogilev-guide/api/ioc';
import { AuthService } from '@mogilev-guide/api/services/authorization';

export class AuthorizationMiddleware{
    @Inject() private authService!: AuthService;

    private authRoutes = express.Router();
    private redirectFailURL: string = process.env.REDIRECT_IF_FAIL_URL;
    private errorFlag: boolean = false;
  
    public getMiddlewareRoutes(): express.Router{
        this.authRoutes.get("/api/*", this.checkCookie(this.redirectFailURL));
        return this.authRoutes;
    }

    private checkCookie(redirectURL: string){
        return async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction)=>{

                let token = await req.cookies.access_token;
                if (!token){
                    res.redirect(redirectURL);
                    return;
                }
                await this.sendRequestForUserID(token);
                if (this.errorFlag){
                    res.redirect(redirectURL);
                    return;
                }
                return next();
            }
    }

    private async sendRequestForUserID(token: string){
            request({
                method: 'GET',
                url: process.env.GOOGLE_INFO_URL,
                qs: {
                    alt: 'json',
                    access_token: token
                }
           }, this.getUserID(this.authService)); 
    } 

    private getUserID(authServ: AuthService){
        return async(
            error: Error,
            response: express.Response, 
            body: any)=> {
                if (!error && response.statusCode == 200) {
                    let user = JSON.parse(body);
                    let currentUser: User[] = await authServ.getUsersByID(user.id);
                    if (!currentUser[0]){
                        this.errorFlag=true;
                    }
                }
        }
    }
}
