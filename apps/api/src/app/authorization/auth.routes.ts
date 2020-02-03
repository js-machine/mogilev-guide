import * as express from 'express';
import * as passport from 'passport'
import GoogleOAuth20Authorization from '@mogilev-guide/api/authorization/googleAuth.passport'

export default class AuthorizationRouter{
    public authRoutes = express.Router();

    private googleOAuth20 = new GoogleOAuth20Authorization;
    private strategyName: string;
    private token: string;
    private finishRedirectURL: string = "http://localhost:5000/mogilev-guide/us-central1/api/api/interests"
   
    constructor(strategy: passport.Strategy){
        passport.use(strategy);
        this.strategyName=strategy.name;

        this.authRoutes.get(
            `/login/${strategy.name}`
            , this.loginUser());
        
        // define the about route
        this.authRoutes.get(
            `/login/${strategy.name}/callback`
            , this.loginUser()
            , (req, res) => {
                this.token = req.authInfo as string;
                res.cookie('access_token', this.token, {
                    expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 1 hours
                  });
                res.redirect(this.finishRedirectURL);
        });
    }
    
    private loginUser(): any{
       return passport.authenticate(this.strategyName, { scope: ['profile','email'] });
    }

    public getCookie(): any{
        return this.token;
     }
}
