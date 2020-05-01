# reCAPTCHA v3

## Overview

reCAPTCHA v3 is truely invisiable and will never interrupt your users.
It's recommended to include reCAPTCHA verification on forms or actions as well as in the background of pages for analytics.

reCAPTCHA v3 returns a score for each request (1.0 is very likely a good interaction, 0.0 is very likely a bot). By default, you can use a threshold of 0.5.

>https://developers.google.com/recaptcha/docs/v3

## reCAPTCHA admin console

>https://g.co/recaptcha/admin

## Integration

### Preparation

1. Register reCAPTCHA v3 keys https://g.co/recaptcha/v3.
    - copy site key for FE integration
    - copy secret key for BE integration
2. Open admin console to review the overall traffic reports (for analyzing and management)

#### FE

1. Import a module (ng-recaptcha) and listen to the web page events and actions
2. Call recaptchaV3Service to execute action to get a token
3. Call BE api to verify the token and obtain a score
4. Check this score to decide if it's robot's behavour

#### BE

1. Implement server side api to verify the FE reCAPTCHA token with reCAPTCHA server
    >https://www.google.com/recaptcha/api/siteverify

#### Note

>reCAPTCHA tokens expire after two minutes. If you're protecting an action with reCAPTCHA, make sure to call execute when the user takes the action.

## Reference

1. Angular third-party component: ng-recaptcha 
    >https://www.npmjs.com/package/ng-recaptcha
2. Implement from scratch
    >https://w3path.com/how-to-integrate-recaptcha-in-angular-8/
