# Authentication Backend App 

- A backend auth server 

## Usage 



- POST /api/auth/register 
```json
"body":{
    "username": "username",
    "email": "email@example.com",
    "password": "password",
    "password_confirm": "password",
    "first_name": "Name",
    "last_name": "Last name"
}
```
- POST /api/auth/login ( set cookie )
```json
"body":{
    "email": "email@example.com",
    "password": "password",
}
```
- POST /api/auth/logout ( delete cookie )
```json
HEADERS 
--header 'Accept: application/json' \
--header 'Content-Type: application/json'

```

- POST /api/auth/refresh Bearer Token ( set cookie )
```json
--header 'Accept: application/json' \
--header 'Content-Type: application/json'
```

- GET /api/auth/user Bearer Token ( set cookie )
```json
--header 'Accept: application/json' \
--header 'Content-Type: application/json'

"response":{
    "username": "username",
    "email": "email@example.com",
    "password": "password",
    "password_confirm": "password",
    "first_name": "Name",
    "last_name": "Last name"
}
```