## Hello World API

Simple NodeJs application without any third-party packages (Added ability to start this app using all available cpu cores using **cluster** package)

### To start this application

For staging

```
NODE_ENV=staging node bin/www
```

For production

```
NODE_ENV=production node bin/www
```

### Available Endpoints

1. GET

    ```
    curl -X GET http://localhost:3000/hello?query=string
    ```

    Response:

    ```
    {"method":"get","query":{"query":"string"}}
    ```

2. POST

    ```
    curl -X POST http://localhost:3000/hello?query=string \
        -H 'Content-Type: application/json' \
        -d '{"message": "hello"}'
    ```

    Response:

    ```
    {"method":"post","query":{"query":"string"},"body":{"message":"hello"}}
    ```

PUT, PATCH, DELETE requests work in the same way