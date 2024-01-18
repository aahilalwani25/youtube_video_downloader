import { LOGIN_WITH_GOOGLE_BUTTON_PRESSED } from "./types";

export const LoginWithGoogleButtonAction=(payload)=>{
    return {
        type: LOGIN_WITH_GOOGLE_BUTTON_PRESSED,
        payload
    }
}