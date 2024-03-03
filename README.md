# Libros App

![App libros](https://private-user-images.githubusercontent.com/96125141/309574293-a18a9f54-d03f-4674-853d-c9193d930828.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDk0OTMyNzMsIm5iZiI6MTcwOTQ5Mjk3MywicGF0aCI6Ii85NjEyNTE0MS8zMDk1NzQyOTMtYTE4YTlmNTQtZDAzZi00Njc0LTg1M2QtYzkxOTNkOTMwODI4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAzMDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMzAzVDE5MDkzM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg5ZTNiZDE1YzQ2NDBiZTJiMjdkNTI3ZWZiZjhjYjNlNjFlZjlmZjBhYWI5MDYwMTE1NjgzZDI2MjE4ZjZmZjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.XrENyvpwnpzKwdREeHWgvo8BEwSPqRl-wVgjAtgmclQ)

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
