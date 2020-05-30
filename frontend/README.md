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
`/public` Ficheiros públicos.

`--/index.html--` O ficheiro carregado pelo browser que vai carregar a aplicação vue. 

`/src`

`--/assets/--` Assets tipo imagens.

`--/components/--` Componentes do Vue.

`----/layout/--` Componentes relacionados com o layout das páginas.

`--/plugins/--` Cenas do bootstrap (Não interessa).

`--/router/--` Roteamento das páginas da aplicação.

`--/router/index.js--` Configuração do vue-router.

`--/services/--` Serviços da aplicação.

`--/store/--` Configuração do vuex.

`--/views/--` Componentes que são utilizados como páginas no routing (se está no routing vem para aqui).

`--/App.vue--` Componente raiz da aplicação com a navegação, rodapé com a router-view para os outros componentes.

`--/main.js--` Configuração da aplicação vue.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
