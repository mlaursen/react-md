# react-md with-webpack-2
This project is a basic example of using a custom webpack config instead of using `create-react-app`.
This is a client-side only project with no server outside of development mode.

## Quickstart

```bash
$ yarn
$ yarn start:dev   # Start development server in watch mode
```

```bash
$ yarn build
$ yarn start       # Start production server
```

```
$ yarn test        # Run all tests
$ yarn test:watch  # Run tests in watch mode
```

## File Structure
```
.
├── __mocks__
│   ├── fileMock.js
│   └── styleMock.js
├── public            # Generated files
│   ├── chunks-670d558cafa26cc619a1.min.js
│   ├── favicon.ico
│   ├── index.html
│   ├── main-670d558cafa26cc619a1.min.js
│   ├── styles.min.css
│   └── styles.min.css.map
├── nodemon.json
├── package.json
├── src
│   ├── _globals.scss
│   ├── components
│   │   ├── App.jsx
│   │   ├── Greeting.jsx
│   │   ├── __tests__
│   │   │   ├── App.jsx
│   │   │   ├── Greeting.jsx
│   │   │   └── __snapshots__
│   │   │       ├── App.jsx.snap
│   │   │       └── Greeting.jsx.snap
│   │   └── _greeting.scss
│   ├── favicon.ico
│   ├── index.jsx
│   ├── server.js
│   ├── setup
│   │   ├── beforeTest.js
│   │   └── htmlTemplate.js
│   └── styles.scss
├── webpack.config.js
└── yarn.lock

7 directories, 27 files
```

