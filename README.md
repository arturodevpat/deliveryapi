# Delivery api

## Pantalla principal

#### obtener informacion para la pantalla principal

Para la pantalla principal se tiene los siguientes endpoints

#### Obtener todos los titulos e imagenes

```http
  GET /api/v1/getAllmainScreen
```

#### Añadir nuevo registro

```http
  POST /api/v1/addMainScreenData
```

#### Obtener un unico registro

```http
  GET /api/v1/getMainScreen/:id
```

#### Actualizar un registro

```http
  PUT /api/v1/updateMainScreen/:id
```

#### Borrar un registro

```http
  DELETE /api/v1/deleteMainScreen/:id
```

## Registro e inicio de sesion

#### Realizar el registro y autenticacion de los usuarios

Para el inicio de sesion y registro de los usuarios se tiene los siguientes endpoints

#### Registrar un usuario

```http
  POST /api/v1/sign-up
```

Para el registro de un usuario se requiere la siguiente informacion:

**name**

**lastname**

**email**

**password**

**phoneNumber**

**birthdayDate**

**gender**

**profileUrl**

La contraseña debe contener minimo 6 caracteres, una letra mayuscula, una letra minuscula, y un simbolo, todos los campos deben ser proporcionados igualmente.

#### Inicio de sesion usuarios

```http
  POST /api/v1/sign-in
```

Para el inicio de sesion de un usuario se necesita del correo y contraseña

Si el inicio de sesion es correcto al usuario se le proporciona el TOKEN de acceso

## Perfil del usuario

#### Validacion del usuario y entrega de la informacion

Para que un usuario pueda ver su perfil se necesita comprobar que cuenta con el token que se le proporciono al iniciar sesion.

#### Perfil del usuario

```http
  GET /api/v1/profile
```

Si la verificacion del token y acceso son correctos se le devuelve la siguiente informacion al usuario:

**name**

**lastname**

**email**

**password**

**phoneNumber**

**birthdayDate**

**gender**

**profileUrl**

**role**

#### Actualizar perfil del usuario

```http
  PUT /api/v1/profile/:id
```

Si la verificacion del token y acceso son correctos se le permite al usuarios actualizar los siguientes campos:

**name**

**lastname**

**email**

**password**

**phoneNumber**

**birthdayDate**

**gender**

**profileUrl**

**role**

#### Borrar perfil del usuario

```http
  DELETE /api/v1/profile/:id
```

Al borrar el usuario el servidor retorna el mensaje "Se ha eliminado con exito la cuenta" por lo que se debe borrar toda la informacion tanto del cliente y servidor y retornar al usuario al registro o inicio de sesion.

## Direcciones del usuario

#### Registro,actualizacion,obtencion y borrado de las direcciones del usuario

El usuario puede registrar multiples direcciones asi como borrar obtener y actualizar las mismas.

#### Obtener todas las direcciones de un usuario

```http
  GET /api/v1/getUserAddress/:id
```

Para obtener las direcciones de un usuario se necesita el id del usuario, pasandole el dato obtendra todas las direcciones.

#### Añadir direccion de usuario

```http
  POST /api/v1/addUserAddress/:id
```

Al igual que lo anterior para registrar la direccion de un nuevo usuario se requiere la ruta y el id.

#### Actualizar las direcciones de un usuario

```http
  PUT /api/v1/updateUserAddress/:userId/address/:idAddress
```

Para actualizar la direccion de un usuario se requiere pasar el id del usuario y el id de la direccion que se quiere actualizar.

#### Borrar las direcciones de un usuario

```http
  DELETE /api/v1/deleteUserAddress/:userId/address/:idAddress
```

Para el borrado de una direccion es lo mismo que el actualizar.

## Perfil restaurante

#### Obtener, actualizar y borrar perfil del restaurante

Al igual que los usuarios el restaurante puede actualizar su informacion, en cuanto a validaciones los restaurantes no pueden poner nombres, correos y telefonos ya registrados.

#### Obtener el perfil del restaurante

```http
  GET /api/v1/restaurantProfile
```

Para poder obtener la informacion del restaurante se necesita verificar que tenga un token en el Authorization.

La informacion que se mostrara en el perfil del restaurante es lo siguiente:

**id**

**name**

**description**

**address**

**email**

**password**

**phone**

**entrega**

**envio**

**perfil_url**

**cover_url**

#### Actualizar informacion del restaurante

```http
  PUT /api/v1/restaurantProfile/:id
```

En caso de intentar actualizar con algun nombre,correo o telefono que ya existe se devolvera un error al cliente. Todos los campos se pueden modificar sin excepcion.

#### Borrar el restaurante

```http
  DELETE /api/v1/restaurantProfile/:id
```

## Terminos y condiciones

#### Obtener, actualizar y borrar los terminos y condiciones

En el cuerpo del metodo se envia el content

#### Obtener los terminos y condiciones

```http
  GET /api/v1/terminosYCondiciones
```

#### Añadir los terminos y condiciones

```http
  POST /api/v1/addterminosycondiciones
```

#### Actualizar los terminos y condiciones

```http
  PUT /api/v1/actualizarterminosycondiciones
```

1. **Terminos y condiciones**: Para poder actualizar los terminos y condiciones se debe enviar el contenido, ejemplo:

```json
{
  "content": "Terminos y condiciones"
}
```

#### Borrar los terminos y condiciones

```http
  DELETE /api/v1/eliminarterminosycondiciones
```

1. **Terminos y condiciones**: Para poder borrar los terminos y condiciones se debe enviar el contenido, ejemplo:

```json
{
  "content": "Terminos y condiciones"
}
```
