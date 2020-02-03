import * as express from 'express';
import * as request from 'request';
import { User } from '@mogilev-guide/models';
import { AuthService } from '@mogilev-guide/api/services/authorization';


export default class AuthorizationMiddleware{

    public authRoutes = express.Router();

    private authService: AuthService = new AuthService;
    private rediretErrorURL = "http://localhost:5000/mogilev-guide/us-central1/api/login/google";
    private errorFlag: boolean = false;

    constructor(){
        this.authRoutes.get("/api/*", this.checkCookie());
    }
    
    private checkCookie(){
        return async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction)=>{

                let token = await req.cookies.access_token;
                if (!token){
                    res.redirect(this.rediretErrorURL);
                }
                await this.sendRequestForUserID(token);
                if (this.errorFlag){
                    res.redirect(this.rediretErrorURL);
                }else{
                    next();
                }
            }
    }

    private async sendRequestForUserID(token: string){
            request({
                method: 'GET',
                url: "https://www.googleapis.com/oauth2/v1/userinfo",
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
