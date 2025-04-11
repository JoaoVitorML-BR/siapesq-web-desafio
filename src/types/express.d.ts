import { IJwtUserPayload } from '../interface/user.interface';

declare global {
    namespace Express {
        interface Request {
            user?: IJwtUserPayload;
        }
    }
}

export { };