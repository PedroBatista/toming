# Backend

##### Correr a 1ª vez para ele sacar as dependências:
```
npm install
```

##### Para correr o servidor em modo de dev e com isso ele fazer reload automaticamente sempre que fazem uma alteração no código:  
```
npm run dev
```

### Estrutura
```
public\            # Ficheiros públicos.
src\
 |--database\
  |--models\       # Modelos de dados para o Mongoose.
   |--index.js     # Indice dos modelos de base de dados.
 |--routes\        # Rotas da API. 
  |--index.js      # Indice das rotas da API.
  |--user.js       # Rotas específicas de utilizadores.
 |--services\      # Serviços utilitários.
 |--validations\   # Objetos para validação dos pedidos à API.
 |--views\         # Chamiços do @PedroBatista.
 |--app.js         # Aplicação Express.js
.env               # Ficheiro de configurações.
```
