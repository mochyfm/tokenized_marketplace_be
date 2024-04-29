# Idiomas:

- [English](../../README.md)

<br>

## Demo de un Marketplace Tokenizado

El presente documento trata sobre la estructura seguida para la creación de una demo relacionada con la tarea T4.4 del proyecto europeo EnPower. Se debe consultar el _Grant Agreement_ para conocer lo que se solicita.

Siguiendo esto, el backend da forma a una estructura que constituye toda la aplicación. Esta documentación se divide en dos componentes sustanciales: el primero es este documento de texto, y el segundo es un esquema realizado en [Escalidraw](./docs/diagram.excalidraw), donde se detallan todos los módulos de la aplicación, así como sus funciones, controladores y demás. En este documento se describe el funcionamiento de cada elemento, junto con una explicación de su funcionalidad. En caso de preferir una representación visual, lo ideal sería consultar directamente el esquema mencionado anteriormente.

## Dependencias

Las dependencias de la aplicación se pueden ver desde el `package.json` de este proyecto: [package.json](package.json). A modo de resumen, las dependencias más sustanciales con sus versiones son las siguientes:

- Axios
- DotEnv
- Eslint
- Fast-xml-parser
- Prettier
- SuperTest
- SWC
- Vitest (con unplugin-swc)

Además, debido no solo a la estructura de trabajo que sigue NestJS, se ha optado por usar TypeScript en todo el proyecto salvo en algunas excepciones en las que se usa JS.

## Estructura por Carpetas

El proyecto está dividido por carpetas, según funcionalidad. A continuación una definición por elementos:

| Carpeta     | Descripción                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| app         | Carpeta principal de la aplicación, donde se gestiona toda la lógica de Módulos                        |
| config      | Carpeta relacionada con la configuración específica de los módulos                                     |
| constants   | Carpeta de constantes de la aplicación, incluidas también las variables de entorno                     |
| decorators  | Carpeta de los decoradores personalizados                                                              |
| middlewares | Carpeta para la lógica de los middlewares                                                              |
| types       | Carpeta de tipos para TypeScript                                                                       |
| utils       | Carpeta donde se almacenan todas las funciones de utilidad (conversión de Json a XML, encriptación...) |

## Estructura del Proyecto

Para entender la estructura del proyecto deberemos primero entender los componentes que la estructuran. En Nest, el funcionamiento es similar al que se tiene en Angular, cada elemento es un Modulo y de ahí cada uno de ellos tiene su estructura independiente.

| Parent    | Child            |
| --------- | ---------------- |
| AppModule | AuthModule       |
|           | BlockchainModule |
|           | UsersModule      |
|           | StorageModule    |
|           | StatusModule     |

Aquí se reflejarán todos los módulos independientes. Para ver la estructura completa, ve al diagrama.

- AuthModule: Módulo de autenticación. Contiene todas las normas y endpoints necesarios para el uso de la aplicación.
- BlockchainModule: Módulo de interacción con la blockchain, cualquier comunicación que se quiera hacer con la blockchain deberá hacerse desde aquí.
- UsersModule: Módulo de gestión (CRUD) de los usuarios.
- StorageModule: Módulo de gestión e interacción con el sistema de almacenamiento.
- StatusModule: Módulo de representación del estado de la aplicación web.

## Estructura para cada Módulo

Cada módulo sigue una estructura, teniendo (o no) las siguientes subcarpetas y archivos

| Carpeta    | Descripción                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| controller | Carpeta para la gestión de los controladores REST                                    |
| service    | Carpeta para los servicios de ese módulo en específico y lo relacionado con el mismo |
| dto        | Carpeta para la concentración de los DTOs del módulo                                 |
| entity     | Carpeta para la gestión de entidades                                                 |

Dentro de cada una, habrá los elementos mencionados y **siempre debe acompañarle un archivo de test**. Los tests se realizan con vitest.
