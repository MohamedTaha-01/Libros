# Libros App

![App libros](https://github.com/MohamedTaha-01/Libros/assets/96125141/a18a9f54-d03f-4674-853d-c9193d930828)

## Contenidos

- [Descripción](#descripción)
- [Funciones y características](#funciones-y-características)
- [Tecnologías y librerías](#tecnologías-y-librerías)
- [Contacto](#contacto)

## Descripción

App de android que permite crear, consultar, actualizar y eliminar libros.

El backend se compone de una API REST con los siguientes endpoints:
| DESCRIPCIÓN                   | URL               |
| ----------------------------- | ----------------- |
| Listado de todos los libros   | GET /books        |
| Creación de un libro          | POST /books       |
| Obtención de un libro mediante ID         | GET /books/:id    |
| Actualización de un libro mediante ID    | PUT /books/:id    |
| Borrado de un libro mediante ID          | DELETE /books/:id |

Los datos se almacenan en una base de datos Firestore.

Para el frontend, se utiliza react native y la librería react-navigation para gestionar la navegación entre pantallas.

## Funciones y características

- API REST desarrollada en NodeJs
- Consumo API REST mediante React Native
- Validación de inputs básica y control de excepciones en cliente y servidor
- Custom hooks

## Tecnologías y librerías

- NodeJs
  - express
  - firebase-tools
- React native
  - react-navigation
- Firebase firestore

## Contacto

Correo: mohamedtaha.mt01@gmail.com

[Linkedin](https://es.linkedin.com/in/mohammed-taha-hasan)
