## API Endpoints:

### Product:

#### Get all products:
Route: `/api/products`  
Method: `GET`  
Response:
```
{
    "errors": [],
    "data": [
      {
        "name": {string}
        "displayName": {string},
        "price": {float},
        "description": {string}
      }
    ],
    "status": 200,
    "statusText": "Ok"
}
```

#### Get a product:
Route: `/api/products/{product-name}`  
Method: `GET`  
Response:
```
{
    "errors": [],
    "data": {
      "name": {string}
      "displayName": {string},
      "price": {float},
      "description": {string}
    },
    "status": 200,
    "statusText": "Ok"
}
```

#### Create a product:
Route: `/api/products`  
Method: `POST`  
Request body:
```
{
    "errors": [],
    "data": {
      "name": {string}
      "displayName": {string},
      "price": {float},
      "description": {string}
    },
    "status": 200,
    "statusText": "Ok"
}
```
Response:
```
{
    "errors": [],
    "data": {
      "name": {string}
      "displayName": {string},
      "price": {float},
      "description": {string}
    },
    "status": 201,
    "statusText": "Created"
}
```

#### Update a product:
Route: `/api/products/{product-name}`  
Method: `PUT`  
Request body:
```
{
  "name": {string}
  "displayName": {string},
  "price": {float},
  "description": {string}
}
```
Response:
```
{
    "errors": [],
    "data": {
      "name": {string}
      "displayName": {string},
      "price": {float},
      "description": {string}
    },
    "status": 200,
    "statusText": "Ok"
}
```