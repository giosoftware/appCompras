// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, 
    firebase: {
        apiKey: "AIzaSyDb9Balue67MTmG_5TErtTZWODqGkz0Le8",
        authDomain: "comprasapp-a2363.firebaseapp.com",
        databaseURL: "https://comprasapp-a2363.firebaseio.com",
        projectId: "comprasapp-a2363",
        storageBucket: "comprasapp-a2363.appspot.com",
        messagingSenderId: "211598279079"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
