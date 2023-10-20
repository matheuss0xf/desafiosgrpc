### Como executar

Utilizamos Docker para que todos os serviços que utilizaremos fiquem disponíveis.

    Faça o clone do projeto
    Tendo o docker instalado em sua máquina apenas execute: docker-compose up -d

Como executar a aplicação

    Acesse o container da aplicação executando: docker exec -it golang-app-1 bash
    Rode go run main.go para rodar o servidor grpc
    Rode go run client/main.go para rodar o client
