import "dotenv/config"; //for work with environment variables from .env file
import * as passport from 'passport'
import * as passportStrategy from 'passport-google-oauth20'
import { AuthService } from '@mogilev-guide/api/services/authorization';
import { User } from '@mogilev-guide/models';

export default class GoogleOAuth20Authorization{
    private authService: AuthService = new AuthService;
    private GoogleStrategy = passportStrategy.Strategy;

    private googleStrategy = new this.GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URL
      },this.getLoginCallback(this.authService));
      
    constructor(){  
        this.serialize();
        this.init();
    }

    public getStrategy(): passport.Strategy{
          return this.googleStrategy;
    }
    
    private init(){
        passport.use(this.googleStrategy);
    }

    private  serialize() {
        passport.serializeUser((user: User, done) => {
            done(null, user);
        });
    }
    
    private  getLoginCallback(authServ: AuthService){
        return async (accessToken: string
            , refreshToken: string
            , profile: passportStrategy.Profile
            , done: passportStrategy.VerifyCallback)=>{
                let loginUser: User = {
                    id:profile.id ,
                    login: profile.displayName,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                };
        
               let currentUser: User[] = await authServ.getUsersByID(loginUser.id);
               if(!currentUser[0]){
                    authServ.addUsers(loginUser);
                    done(null, loginUser, accessToken);
                    return;
                }
                done(null, currentUser[0], accessToken); 
            }
    }
}
