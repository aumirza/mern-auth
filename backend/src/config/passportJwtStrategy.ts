import User from "../models/userModel";

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

// At a minimum, you must pass these options (see note after this code snippet for more)
const passportJWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY || secret phrase,
    issuer: 'enter issuer here',
    audience: 'enter audience here',
    algorithms: ['RS256'],
    ignoreExpiration: false,
    passReqToCallback: false,
    jsonWebTokenOptions: {
        complete: false,
        clockTolerance: '',
        maxAge: '2d', // 2 days
        clockTimestamp: '100',
        nonce: 'string here for OpenID'
    }
}

// The JWT payload is passed into the verify callback
passport.use(new JwtStrategy(passportJWTOptions, function(jwt_payload, done) {
    
    // We will assign the `sub` property on the JWT to the database ID of user
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    });
    
}));