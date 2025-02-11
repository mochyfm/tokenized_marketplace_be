# Idiomas:

- [Español](docs/Es-es/README-es.md)

## Tokenized Marketplace Demo

This document deals with the structure followed for the creation of a demo related to task T4.4 of the European project EnPower. The _Grant Agreement_ should be consulted to understand what is requested.

Following this, the backend shapes a structure that constitutes the entire application. This documentation is divided into two substantial components: the first is this text document, and the second is a schema created in [Escalidraw](./docs/diagram.excalidraw), where all the application modules are detailed, as well as their functions, controllers, and more. This document describes the functioning of each element, along with an explanation of its functionality. In case of preferring a visual representation, it would be ideal to consult directly the mentioned schema.

## Dependencies

The application dependencies can be seen from the `package.json` of this project: [package.json](package.json). In summary, the most substantial dependencies with their versions are as follows:

- Axios
- DotEnv
- Eslint
- Fast-xml-parser
- Prettier
- SuperTest
- SWC
- Vitest (with unplugin-swc)

Additionally, due not only to the working structure followed by NestJS, TypeScript has been chosen for the entire project except for some exceptions in which JS is used.

## Folder Structure

The project is divided into folders, according to functionality. Below is a definition by elements:

| Folder      | Description                                                                              |
| ----------- | ---------------------------------------------------------------------------------------- |
| app         | Main folder of the application, where all module logic is managed                        |
| config      | Folder related to the specific configuration of the modules                              |
| constants   | Folder of constants of the application, including environment variables                  |
| decorators  | Folder of custom decorators                                                              |
| middlewares | Folder for middleware logic                                                              |
| types       | Folder of types for TypeScript                                                           |
| utils       | Folder where all utility functions are stored (Json to XML conversion, encryption, etc.) |

## Project Structure

To understand the structure of the project, we must first understand the components that structure it. In Nest, the operation is similar to that of Angular, each element is a Module and from there each of them has its independent structure.

| Parent    | Child            |
| --------- | ---------------- |
| AppModule | MongooseModule   |
|           | JwtModule        |
|           | AuthModule       |
|           | BlockchainModule |
|           | UsersModule      |
|           | StatusModule     |
|           | SwaggerModule    |
|           | UtilsModule      |

Here all independent modules will be reflected. To see the complete structure, go to the diagram.

- AuthModule: Authentication module. It contains all the rules and endpoints necessary for the use of the application.
- BlockchainModule: Module for interacting with the blockchain, any communication to be made with the blockchain must be done from here.
- UsersModule: Management (CRUD) module of users.
- DatabaseModule: Module for management and interaction with the database system.
- StatusModule: Module for representing the state of the web application.

## Structure for each Module

Each module follows a structure, having (or not) the following subfolders and files:

| Folder     | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| controller | Folder for managing REST controllers                          |
| service    | Folder for services of that specific module and related to it |
| dto        | Folder for concentrating the DTOs of the module               |
| entity     | Folder for entity management                                  |

Within each one, there will be the mentioned elements and **a test file must always be with it**. Tests are performed with vitest.

## Environment Variables

### Backend Configuration

- `BACKEND_IP`: Backend IP address. Defaults to *'127.0.0.1'*.
- `BACKEND_PORT`: Backend port. Defaults to *7543*.
- `SWAGGER`: Swagger state. Enables or disables swagger. Defaults to *false*.
- `SWAGGER_ENDPOINT`: Swagger endpoint. Defaults to *'swagger-dev'*.

### Blockchain Configuration

- `RPC_PROV_PROTOCOL`: RPC provider protocol. Defaults to *'http'*.
- `RPC_PROV_IP`: RPC provider IP address. Defaults to *'127.0.0.1'*.
- `RPC_PROV_PORT`: RPC provider port. Defaults to *8545*.

### Database Configuration

- `DB_HOST`: Hostname of the database server. Defaults to *'localhost'*.
- `DB_NAME`: Name of the element to connect to (e.g., database, table). Defaults to *'tokenized_marketplace'*.
- `DB_PORT`: Port of the MongoDB container. Defaults to *27017*.
- `DB_USERNAME`: Username for authentication. Defaults to *'enpower'*.
- `DB_PASSWORD`: Password for authentication. Defaults to *'Test1234!'*.

### JWT Authentication Configuration

- `JWT_EXPIRATION_TIME`: JWT expiration time (in seconds). Defaults to *3600* (1 hour).
- `JWT_SECRET`: JWT secret key.
