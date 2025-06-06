🎯 **Objetivo**  
Aplicação web para gerenciar as etapas de uma obra.

🚀 **Como executar o projeto:**

### Clonar o repositório
`git clone https://`

### Executar uma instância do MySQL
##### sugestão docker
```shell
docker run --name construction-mysql \                                            
    -e MYSQL_ROOT_PASSWORD=root \
    -e MYSQL_DATABASE=construction_phase_manager \
    -e MYSQL_USER=construction_phase_manager \
    -e MYSQL_PASSWORD=construction \
    -p 3306:3306 \
    -d mysql:latest
```
> caso a instância do MySQL não seja via docker atentar-se para a criação do user: **"construction_phase_manager"**,
> com a senha **"construction"** e a criação do database: **"construction_phase_manager"**

### Executar o backend
##### Se estiver no linux
```shell
cd backend \
./mvnw spring-boot:run 
```
##### Se estiver no windows
```shell
cd backend ^
mvnw.cmd spring-boot:run
```

### Executar o frontend _(em outra aba de seu terminal)_
##### Necessário ter o node instalado na máquina versão 20.16.0 ou superior
##### Se estiver no linux
```shell
cd frontend \
npm install \
npm start 
```
##### Se estiver no windows
```shell
cd frontend ^
npm install ^
npm start
```
#### Acessar os recursos

##### Frontend
[http://localhost:3000](http://localhost:3000)

##### Documentação API (backend)
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### 💻 **Tecnologias Utilizadas**

**Backend**
- Java 21
- Spring Boot 3.5.0
- JPA + Hibernate
- MySQL
- Flyway
- OpenAPI

**Frontend**
- React
- Redux Toolkit (RTK)
- Ant Design
- Axios

--- 



