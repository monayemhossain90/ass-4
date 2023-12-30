

## Install the dependencies:

```bash
  npm install
```

## Configuring the Environment Variables

Create a `.env` file in the root of the project and add any necessary environment variables. You can use the provided `.env.example` file as a template.

```bash
    NODE_ENV= development
    PORT= PORT
    DATABASE_URL= DATABASE_URL
    BCRYPT_SALT_ROUNDS= 8
```

# Usage

## Development Mode

To run the application in development mode with automatic transpilation and server restart:

```bash
  npm run start:dev
```

This command uses `ts-node-dev` to watch for changes in the `src` directory, transpile TypeScript files, and restart the server.

## Production Mode

To build the project for production:

```bash
  npm run build
```

This command uses the TypeScript compiler `tsc` to transpile the TypeScript code into JavaScript. The compiled code is output to the `dist` directory.

To start the application in production mode:

```bash
  npm run start:dev
```

## Install ESLint and related packages:

```bash
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```
## create a configuration file using the CLI
```bash
npx eslint --init
```
## Code Linting

To lint the code using `ESLint`:

```bash
  npm run lint
```

To automatically fix linting issues:

```bash
  npm run lint:fix
```
## Integrating Prettier

```bash
npm install --save-dev prettier
```

## Create a file called .prettierrc.json in the project’s root directory
```bash
{
"semi": false, 
"singleQuote": true,
}

```
## Using Prettier in the command line
```bash
npx prettier --write src/index.ts
```

## Code Formatting

To format the code using `Prettier`:

```bash
  npm run prettier
```

To automatically fix formatting issues:

```bash
  npm run prettier:fix
```
