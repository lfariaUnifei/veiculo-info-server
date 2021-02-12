# veiculo-info-server
O projeto foi estruturado utilizando alguns conceitos do DDD (simpificado).
Foi escolhida essa estratégia para poder conversar sobre na
entrevista técnica e também para mostrar a aplicação de alguns
padrões de projeto.

## Como iniciar o projeto
para iniciar o projeto é necessário ter o docker e o docker compose instalado.
Rodar: docker-compose up

## Como testar
usar docker-compose up db e depois npm run test

### Estrutura
```
src
└── shared  // Conteudo compartilahdo por todos o módulos
    └── Infra // Configuração de database + Configuração de servidor
        └── http // Controllers genéricos/rotas/server init
            ├── controllers
            │   └── screens
            │       ├── Reports
            │       └── Users
            └── Routes
            │ 
            └── server.ts
        └── Database // Configuração do mongo
            ├── mongoose
            │   └── config
            │   └── Models

└── modules // (separado por recurso) contem controllers, dtos, repositories, etc
```

