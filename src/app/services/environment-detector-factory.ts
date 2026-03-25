import { DOCUMENT, inject } from "@angular/core";
import { AuthConfig } from "angular-oauth2-oidc";

export const getOAuthConfig = (): AuthConfig => {
    const document = inject(DOCUMENT)
    console.log("The host is: ", document.location.host)
    const isLocalhost = document.location.host === 'localhost:4200' || document.location.host === '127.0.0.1'
    console.log("isLocalHost is: ", isLocalhost)

    return {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        redirectUri: isLocalhost ? 
        'http://localhost:4200/callback' : 'https://job-tracker-sage-mu-39.vercel.app/callback',
        clientId: '507581015842-mnrmq3msprik2iabpub5bd0uq8206m5f.apps.googleusercontent.com',
        scope: 'openid profile email',
        responseType: 'code',
        disableAtHashCheck: true,
        showDebugInformation: true,
        requireHttps: false
    }
}