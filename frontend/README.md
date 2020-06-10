# Frontend

## Project setup
```
npm install
```

##### Compiles and hot-reloads for development
```
npm run serve
```

##### Compiles and minifies for production
```
npm run build
```

##### Lints and fixes files
```
npm run lint
```

### Estrutura
```
public\            # Ficheiros públicos.
 |--index.html     # Ficheiro lido pelo browser para carregar a aplicação vue.
src\
 |--assets\        # Assets tipo imagens.
 |--components\    # Componentes do Vue.
  |--layout\       # Componentes relacionados com o layout das páginas.
 |--plugins\       # Cenas do bootstrap (Não interessa).
 |--router\        # Roteamento das páginas da aplicação.
  |--index.js      # Configuração do vue-router.
 |--services\      # Serviços utilitários.
 |--store\         # Configuração do vuex.
 |--views\         # Componentes que são utilizados como páginas no roteamento (se está no vue-router vem para aqui).
 |--App.vue        # Componente raiz da aplicação com a navegação, rodapé com a router-view para os outros componentes.
 |--main.js        # Configuração da aplicação vue.
.env               # Ficheiro de configurações.
```

### Framework de Frontend BootstrapVue
See [Docs](https://bootstrap-vue.org/docs)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
