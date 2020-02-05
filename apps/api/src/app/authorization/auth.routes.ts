import * as express from 'express';
import * as passport from 'passport'


export class AuthorizationRouter{
    private authRoutes = express.Router();

    private strategyName: string;
    private token: string;
    private finishRedirectURL: string = process.env.SUCCESS_LOGIN_URL;
   
    public getAuthRoutes(strategy: passport.Strategy): express.Router{
        passport.use(strategy);
        this.strategyName=strategy.name;

        this.authRoutes.get(
            `/login/${strategy.name}`
            , passport.authenticate(this.strategyName, { scope: ['profile','email'] })
            );
        
        this.authRoutes.get(
            `/login/${strategy.name}/callback`
            , passport.authenticate(this.strategyName, { scope: ['profile','email'] })
            , (req, res) => {
                this.token = req.authInfo as string;
                res.cookie('access_token', this.token, {
                    expires: new Date(Date.now() + 30 * 60000) // cookie will be removed after 30 minutes
                  });
                res.redirect(this.finishRedirectURL);
        });
        return this.authRoutes;
    }
}
