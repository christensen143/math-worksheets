# Math Worksheets

## Description

Math Worksheets is a React and Firebase application that creates a math test for students based on a choice of multiples. The project idea came from my wife who is a Math teacher. Basically, she wants a way to administer times tests that automates the grading and storage of results.

## Instructions

1. Fork the repo
2. Run `yarn` or `npm install`
3. Setup your firebase project
4. Add a firebase config into /src/utils/firebase.js that looks similar to the following:

```
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  databaseURL: 'YOUR_DATABASE_URL_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE',
  storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
  messagingSenderId: 'YOUR_MESSAGING_ID_HERE',
  appId: 'YOUR_APP_ID_HERE',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();
```

5. Hack away!

## License

The code is licensed under the MIT License. For further information on the MIT license go to <https://opensource.org/licenses/MIT>
