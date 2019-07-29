FORMAT: 1A
HOST: http://192.168.0.100:3333

# API MEETAPP

API do aplicativo MeetApp!

## Sobre [/]

API do desafio final da RocketSeat feita com AdonisJS + banco de dados MySQL!

# Group Usuário

## Criar Usuário  [/register]

### Criar Usuário [POST]

- Request (application/json)

   - Body

            {
               "username": "Bins2",
               "email": "bins22@ig.com.br",
               "password": "1234576"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (CreateUserResponse)
   
   - Body

            {

               "message": "Usuário gravado com sucesso!",
               "user": {
               "username": "Biin1s231",
               "email": "biins111223@ig.com.br",
               "password": "$2a$10\$Fw1Nk5YFS3v7XU2DqK3rWuOhxbAStOJz30MaNS8/cukcUpuoYydsK",
               "created_at": "2019-05-05 16:29:57",
               "updated_at": "2019-05-05 16:29:57",
               "id": 52
               },
               "token": {
                  "type": "bearer",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUyLCJpYXQiOjE1NTcwODQ1OTd9.d0LDChT503W263fazumB2Hp31xb1DCxu4WEkuMozjgg",
                  "refreshToken": null
               }
            }

## Login do usuário [/login]

### Login do usuário [POST]

- Request (application/json)

   - Body

            {
               "email": "bins22@ig.com.br",
               "password": "1234576"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (LoginResponse)

   - Body

            {
            "message": "Login realizado com sucesso",
            "user": {
               "id": 67,
               "username": "Bins",
               "email": "bins22@ig.com.br",
               "password": "$2a$10$Qk5RWCW9hFcssle8.Ro4PunagPKoKkaeAMw7.N45E7ViUHBw8Wxii",
               "created_at": "2019-05-21 23:11:34",
               "updated_at": "2019-05-21 23:12:57",
               "preferences": [
                  {
                     "id": 1,
                     "name": "Teste 1",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 2,
                     "name": "Teste 2",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 3,
                     "name": "Teste 3",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 4,
                     "name": "Teste 4",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 5,
                     "name": "Front-end",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 6,
                     "name": "Back-end",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 7,
                     "name": "Mobile",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 8,
                     "name": "DevOps",
                     "created_at": null,
                     "updated_at": null
                  }
               ]
            }
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQ4LCJpYXQiOjE1NTcwODQzMTN9.uJ-yVN3oAzuLQ7pz0PU4UK7DggGf1VGnXN3XZZzDZHk"
            }



# Group Preferences
## Preferências do Usuário [/preferences]

### Preferências do Usuário [GET]
         
- Request (application/json)

   - Headers

            Authentication: Bearer JWT


- Response 200 (application/json; charset=utf-8)
   
   - Attributes(array[PreferenceUserResponse])
   
   - Body

            [
            {
               "id": 1,
               "name": "Teste 1",
               "created_at": null,
               "updated_at": null
            },
            {
               "id": 2,
               "name": "Teste 2",
               "created_at": null,
               "updated_at": null
            },
            {
               "id": 3,
               "name": "Teste 3",
               "created_at": null,
               "updated_at": null
            }
            ]


## Salvar Preferências do Usuário [/preferences/save]

### Salvar Preferências do Usuário [POST]
         
- Request (application/json)

   - Headers

            Authentication: Bearer JWT


   - Body
   
            {
                "preferences": [1, 2, 3]
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes(MessageResponse)
   
   - Body

            {
               "message": "As preferências foram gravadas com sucesso"
            }

# Group Profile
Rotas referentes ao perfil do usuário
         
## Perfil do Usuário [/profile]

### Retornar Dados do Usuário [GET]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT


- Response 200 (application/json; charset=utf-8)

   - Attributes(ProfileResponse)
   
   - Body
         

            {
            "user": {
               "id": 48,
               "username": "Bins2",
               "email": "bins22@ig.com.br",
               "password": "$2a$10$faXNf12mh/f0wasp17JxLuaePwy2myAf/JRFEINesGTeq7oI4L3vW",
               "created_at": "2019-05-05 16:13:41",
               "updated_at": "2019-05-05 16:13:41"
            },
            "userPreferences": [
               1
            ],
            "preferences": [{
               "id": 1,
               "name": "Teste 1",
               "created_at": null,
               "updated_at": null
            },
            {
               "id": 2,
               "name": "Teste 2",
               "created_at": null,
               "updated_at": null
            },
            {
               "id": 3,
               "name": "Teste 3",
               "created_at": null,
               "updated_at": null
            }]
            }


### Atualizar Perfil do Usuário [PUT]
         
- Request (application/json)

   - Headers

            Authentication: Bearer JWT


   - Body 
   
            {
                "username": "Bins Atualizado"
            } 

- Response 200 (application/json; charset=utf-8)

   - Attributes(UpdateProfileResponse)

   - Body
   
            {
            "message": "Usuário atualizado com sucesso!",
            "user": {
               "id": 67,
               "username": "Bins Atualizado",
               "email": "dia217@ig.com.br",
               "password": "$2a$10$Qk5RWCW9hFcssle8.Ro4PunagPKoKkaeAMw7.N45E7ViUHBw8Wxii",
               "created_at": "2019-05-21 23:11:34",
               "updated_at": "2019-05-21 23:12:57",
               "preferences": [
                  {
                     "id": 1,
                     "name": "Teste 1",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 2,
                     "name": "Teste 2",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 3,
                     "name": "Teste 3",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 4,
                     "name": "Teste 4",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 5,
                     "name": "Front-end",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 6,
                     "name": "Back-end",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 7,
                     "name": "Mobile",
                     "created_at": null,
                     "updated_at": null
                  },
                  {
                     "id": 8,
                     "name": "DevOps",
                     "created_at": null,
                     "updated_at": null
                  }
               ]
            }
            
            }

# Group Files
Imagens dos Meetups         
         
## Imagens dos Meetups    [/files/{id}]

### Imagem do meetup [GET]

- Parameters

   - id: 1 (number) - ID do arquivo


- Response 200 (image/jpeg)      

   
### Apagar Imagem do Meetup [DELETE]

- Parameters

   - id: 1 (number) - ID do arquivo

- Request (application/json)

   - Headers

            Authentication: Bearer JWT


- Response 200 (application/json; charset=utf-8)

   - Attributes(MessageResponse)

   - Body         

            {
                "message": "Arquivo excluído com sucesso "
            }


## Enviar Imagem do Meetup    [/files/]         
### Enviar Imagem do Meetup [POST]
O envio do arquivo deve ser feito atráves de form-data (multipart/form-data). O nome da variável deve ser file

- Request (multipart/form-data; boundary=---BOUNDARY)

        -----BOUNDARY
        Content-Disposition: form-data; name="file"; filename="image.jpg"
        Content-Type: image/jpeg
        Content-Transfer-Encoding: base64

        /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a
        HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy
        MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA
        AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
        AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AD//Z
        -----BOUNDARY

   
   - Headers

            Authentication: Bearer JWT   
      
- Response 200 (application/json; charset=utf-8)

   - Attributes(FileResponse)

   - Body
   
            {
               "file": {
               "file": "1557088194989.jpeg",
               "name": "0_11b748_d4d498a0_XXL.jpg",
               "type": "image",
               "subtype": "jpeg",
               "created_at": "2019-05-05 17:29:54",
               "updated_at": "2019-05-05 17:29:54",
               "id": 1
               }   
            }
         
# Group Dashboard
Rota com os dados do Meetups
         
## Dashboard [/dashboard]

### Dashboard [GET]

- Request (application/json)

   - Parameters
      - s: `teste` (string, optional) - Título do meetup a ser pesquisado

   - Headers

            Authentication: Bearer JWT
      

- Response 200 (application/json; charset=utf-8)

   - Attributes (DashboardResponse)

   - Body         

            {
            "nextMeetups": [
               {
                  "id": 3,
                  "title": "teste",
                  "description": "meetup de testes",
                  "location": "São Paulo -SP",
                  "datetime": "2019-05-10T13:00:00.000Z",
                  "file_id": 1,
                  "created_at": "2019-05-05 17:36:14",
                  "updated_at": "2019-05-05 17:36:14",
                  "urlimagem": "http://192.168.9.1:3333/files/1",
                  "file": {
                     "id": 1,
                     "file": "1557088194989.jpeg",
                     "name": "0_11b748_d4d498a0_XXL.jpg",
                     "type": "image",
                     "subtype": "jpeg",
                     "created_at": "2019-05-05 17:29:54",
                     "updated_at": "2019-05-05 17:29:54"
                  },
                  "__meta__": {
                     "subscriptions_count": 0
                  }
               }
            ],
            "subscriptions": [
               "id": 4,
               "title": "teste",
               "description": "meetup de testes",
               "location": "São Paulo -SP",
               "datetime": "2019-05-10T13:00:00.000Z",
               "file_id": 2,
               "created_at": "2019-05-05 17:36:14",
               "updated_at": "2019-05-05 17:36:14",
               "urlimagem": "http://192.168.9.1:3333/files/2",
               "file": {
                  "id": 2,
                  "file": "1557088194989.jpeg",
                  "name": "0_11b748_d4d498a0_XXL.jpg",
                  "type": "image",
                  "subtype": "jpeg",
                  "created_at": "2019-05-05 17:29:54",
                  "updated_at": "2019-05-05 17:29:54"
               },
               "__meta__": {
                  "subscriptions_count": 0
            }],
            "nextRecommended": [
               "id": 5,
               "title": "teste",
               "description": "meetup de testes",
               "location": "São Paulo -SP",
               "datetime": "2019-05-10T13:00:00.000Z",
               "file_id": 3,
               "created_at": "2019-05-05 17:36:14",
               "updated_at": "2019-05-05 17:36:14",
               "urlimagem": "http://192.168.9.1:3333/files/3",
               "file": {
                  "id": 3,
                  "file": "1557088194989.jpeg",
                  "name": "0_11b748_d4d498a0_XXL.jpg",
                  "type": "image",
                  "subtype": "jpeg",
                  "created_at": "2019-05-05 17:29:54",
                  "updated_at": "2019-05-05 17:29:54"
               },
               "__meta__": {
                  "subscriptions_count": 0
            }],
            "search": [{
               "id": 5,
               "title": "teste",
               "description": "meetup de testes",
               "location": "São Paulo -SP",
               "datetime": "2019-05-10T13:00:00.000Z",
               "file_id": 3,
               "created_at": "2019-05-05 17:36:14",
               "updated_at": "2019-05-05 17:36:14",
               "urlimagem": "http://192.168.9.1:3333/files/3",
               "file": {
                  "id": 3,
                  "file": "1557088194989.jpeg",
                  "name": "0_11b748_d4d498a0_XXL.jpg",
                  "type": "image",
                  "subtype": "jpeg",
                  "created_at": "2019-05-05 17:29:54",
                  "updated_at": "2019-05-05 17:29:54"
               },
               "__meta__": {
                  "subscriptions_count": 0
            }]
            }


# Group Meetup
Dados do Meetup         
         
## Dados do Meetup [/meetup/{id}]

### Ver Meetup [GET]

- Parameters

   - id: 1 (required, number) - ID do Meetup

- Request (application/json)

   - Headers

            Authentication: Bearer JWT

- Response 200 (application/json; charset=utf-8)

   - Attributes (ViewMeetupResponse)
   
   - Body   
         
            {
            "meetup": [
               {
                  "id": 3,
                  "title": "teste",
                  "description": "meetup de testes",
                  "location": "São Paulo -SP",
                  "datetime": "2019-05-10T13:00:00.000Z",
                  "file_id": 1,
                  "created_at": "2019-05-05 17:36:14",
                  "updated_at": "2019-05-05 17:36:14",
                  "urlimagem": "http://192.168.9.1:3333/files/1",
                  "file": {
                     "id": 1,
                     "file": "1557088194989.jpeg",
                     "name": "0_11b748_d4d498a0_XXL.jpg",
                     "type": "image",
                     "subtype": "jpeg",
                     "created_at": "2019-05-05 17:29:54",
                     "updated_at": "2019-05-05 17:29:54"
                  },
                  "__meta__": {
                     "subscriptions_count": 1
                  }
               }
            ],
            "subscription": true
            }
      
## Dados do Meetup [/meetup]
### Cadastrar Meetup [POST]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT

   - Body 
   
            {
                "title":"teste",
                "description": "meetup de testes",
                "location": "São Paulo -SP",
                "datetime": "2019-05-10 10:00",
                "preferences": [1, 2, 3],
                "file_id":"1"
            }
      

- Response 200 (application/json; charset=utf-8)

   - Attributes (NewMeetupResponse)
   
   - Body   
   
            {
                "message": "Meetup cadastrado com sucesso!",
                "data": {
                    "title": "teste",
                    "description": "meetup de testes",
                    "location": "São Paulo -SP",
                    "datetime": "2019-05-10 10:00",
                    "file_id": "1",
                    "created_at": "2019-05-05 17:36:14",
                    "updated_at": "2019-05-05 17:36:14",
                    "id": 3
                }
            }

## Inscrição no Meetup [/meetup/subscription]

### Inscrição no Meetup [POST]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT

   - Body 
            
            {
                "meetup_id": "3"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes(MessageResponse)

   - Body   
      
            {
                "message": "Sua inscrição foi registrada com sucesso!"
            }

   

   
## Confirmação Inscrição Meetup [/meetup/confirmation]

### Confirmação Inscrição Meetup [POST]

- Request (application/json)

   - Headers

             Authentication: Bearer JWT
         
   - Body
   
            {
                "meetup_id": "3"
            }      

- Response 200 (application/json; charset=utf-8)

   - Attributes (ConfirmMeetupResponse)

   - Body   

            {
            "meetup": {
               "id": 3,
               "title": "teste",
               "description": "meetup de testes",
               "location": "São Paulo -SP",
               "datetime": "2019-05-10T13:00:00.000Z",
               "file_id": 1,
               "created_at": "2019-05-05 17:36:14",
               "updated_at": "2019-05-05 17:36:14",
               "urlimagem": "http://192.168.9.1:3333/files/1",
               "file": {
                  "id": 1,
                  "file": "1557088194989.jpeg",
                  "name": "0_11b748_d4d498a0_XXL.jpg",
                  "type": "image",
                  "subtype": "jpeg",
                  "created_at": "2019-05-05 17:29:54",
                  "updated_at": "2019-05-05 17:29:54"
               }
            },
            "message": "Confirmação enviada com sucesso"
            }

# Data Structures

## UsuarioResponse (object)

- id (number) - ID do usuário
- username (string) - Nome do usuário
- email (string) - E-mail do usuário, deve ser único
- password (string) - Senha criptografada
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- preferences (array[PreferenceUserResponse]) - Array de objetos Preference
- token (TokenResponse) - Objeto com os dados do token

## PreferenceUserResponse (object)

- id (number) - ID da preference
- name (string) -  Nome da preference
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização

## TokenResponse (object)

- type (string) - tipo de token
- token (string) - Token criptografado
- refreshToken (string, nullable) - Tempo de vida do token

## LoginResponse (object)

- message (string) - Retorno da operação
- user (UsuarioResponse) - Objeto com os dados do usuário
- token (string) - Token criptografado

## CreateUserResponse (object)

- message (string) - Retorno da operação
- user (UsuarioResponse) - Objeto com os dados do usuário
- token (TokenResponse) - Objeto com os dados do token

## MessageResponse(object)

- Message (string) - Retorno da operação

## ProfileResponse (object)

- user (UsuarioResponse) - Objeto com os dados do usuário
- userPreferences (array[string]) - IDs das preferences do usuário
- preferences (array[PreferenceUserResponse]) - Array de objetos Preference

## UpdateProfileResponse  (object)

- message (string) - Retorno da operação
- user (UsuarioResponse) - Objeto com os dados do usuário

## FileObject (object)

- id (number) - ID do arquivo
- name (string) - Nome do arquivo
- type (string) - Tipo do arquivo
- subtype (string) - Extensão do arquivo
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização

## FileResponse (object)

- file (FileObject) - Objeto com os dados da imagem

## MetaResponse (object)

- subscriptions_count (number) - Total de inscritos no meetup

## MeetupResponse (object)

- id (number) - ID do meetup
- title (string) - Título do meetup
- description (string) - Descrição do meetup
- location (string) - Local do meetup
- datetime (string) - Data e hora do meetup
- file_id (number) - ID do arquivo de imagem
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- urlimagem (string) - URL para o arquivo de imagem
- file (FileResponse) - Objeto com os dados da imagem
- __meta__ (MetaResponse) - Objeto com os inscrito no meetup

## AddMeetupResponse (object)

- id (number) - ID do meetup
- title (string) - Título do meetup
- description (string) - Descrição do meetup
- location (string) - Local do meetup
- datetime (string) - Data e hora do meetup
- file_id (number) - ID do arquivo de imagem
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização

## ConfirmMeetupResponse (object)

- message (string) - Resultado da operação
- meetup (MeetupResponse) - Dados do meetup

## NewMeetupResponse (object)

- message (string) - Retorno da operação
- data (AddMeetupResponse) - Dados do meetup

## ViewMeetupResponse (object)

- meetup (array[MeetupResponse]) - Dados do meetup
- subscription (boolean) - Se o usuário está inscrito ou não

## DashboardResponse (object)

- nextMeetups (array[MeetupResponse]) - Array dos próximos meetups
- subscriptions (array[MeetupResponse]) - Array dos meetups em que o usuário se inscreveu
- nextRecommended (array[MeetupResponse]) - Array dos meetups de acordo com as preferências do usuário
- search (array[MeetupResponse]) - Array dos meetups pesquisados pelo usuário (opcional)