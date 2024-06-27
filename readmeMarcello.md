![LBCA | Helpinho](/assets/header.svg)

![Projeto fictício! Seu código será usado apenas para avaliação, em hipótese alguma o usaremos internamente.](/assets/alert.svg)

Helpinho é uma plataforma onde pessoas podem ajudar e pedir ajuda. Você pode se cadastrar e criar o seu helpinho, onde outras pessoas lhe darão todo o apoio que precisar.

Este é o meu projeto para o teste técnico de desenvolvedor pleno da LBCA.

Abaixo segue um pequeno resumo do projeto e como executá-lo.

### Desenvolvimento:
Para facilitar o desenvolvimento, optei por utilizar uma configuração de DevContainer que já utilizo em outros projetos pessoais. Isso de certa forma se provou um desafio, já que o plugin de desenvolvimento offline do framework Serverless também roda uma instância de docker por trás dos panos. No final, não bastava apontar meu localhost, mas sim 0.0.0.0 nas configurações do plugin.

Outro desafio encontrado, foi o fato da escolha por utilizar um monorepo via Turbo, visando o compartilhamento de tipos entre cliente e o servidor. Após muito debugging, pude notar que o PNPM não é compatível com framework Serverless quando utilizado dentro de um monorepo, devido a forma como ele armazena as depêndencias. Devido a isso, optei pela utilização do Yarn unido ao plugin de monorepo do Serverless Framework.

### BackEnd:

- **Serverless** utilizando **AWS**

O desenvolvimento do backend se mostrou simples, devido a minha escolha de utilizar o framework NestJS, cujo já estou familiarizado. O NestJS possui a capacidade de se integrar com o Serverless de maneira que podemos definir apenas uma function através de um proxy, que se resolve para os controllers definidos dentro dos arquivos do NestJS.

O único real desafio encontrado foi realizar a administração de segredos entre a AWS e o Serverless (através do arquivo de config). No fim, optei pela administração manual dos segredos, utilizando um plugin do Serverless Framework e meu próprio arquivo .env.

Quanto a implementação na AWS, decidi por fazer uso do serviço de buckets S3 e banco de dados DynamoDB. Quanto ao S3, nada fora do normal, é um serviço de fácil administração e integração. No caso do DynamoDB, eu a primeira vista reconheci o projeto como um caso de database relacional (Usuários possuem helpinhos, que por sua vez possuem doações e que por sua vez são de autoria dos mesmos usários). Porém, eu senti que seria uma boa oportunidade de aprendizado e desafio desenvolver o projeto utilizando um recurso da stack da empresa. No final, após algumas batidas de cabeça, comecei a compreender melhor como funciona o serviço e como aplicá-lo de maneira correta.

Esperamos as funcionalidades:

### FrontEnd:

- **Angular v17+**
- **Tailwind**

No frontend, a utilização do tailwind facilitou muito a minha vida em relação a estilização. Em meus projetos já faço uso da ferramenta há muito tempo, então fiquei feliz de poder desenvolver este projeto com ela.

Possuo também experiência em desenvolvimento Angular, que era parte da stack da minha antiga empresa. Já durante este projeto, aprofundei meus conhecimentos em RXJS para manipulação de observables, ao mesmo que tempo que me introduzi ao conceito dos Signals, ferramenta que me deixou muito feliz como desenvolvedor de React, devido a sua grande semelhança com os hooks de estado.

Outra parte interessante foi o desenvolvimento da ferramenta de infinite scroll de helpinhos. A manipulação do scroll através de observables com a integração do dynamoDB utilizando cursores foi divertida e ver funcionando também foi muito legal!

Para facilitar, realizei o deploy do cliente Angular na própria Vercel, onde já tenho bastante familiaridade dado minha experiência com NextJS.




1. **Página de Listagem de Helpinhos**:

   ✅ Listar todos os helpinhos criados (com infinite scroll).
   ✅ Função de pesquisa (opcional ter filtros e ordenação).

2. **Página de Criação de Helpinho**:

   ✅ Validação de formulário. (Class Validator no front e backend para garantir a integridade dos payloads)
   ✅ Confirmação de envio e redirecuionar para o helpinho criado.

3. **Página de Visualização de Helpinho**:

   ✅ Mostrar todos os dados não sensíveis do helpinho e do criador.
   ✅ Mostrar valores recebidos até o momento  

4. **Página de Autenticação**:

   ✅ Tela de login e cadastro.
   ✅ Validação de formulário.
   ✅ Seguração de dados do usuário. (autenticação via JWT e)


Funcionalidades:

1. **CRUD de Usuário**:

   ✅ Nome, telefone, email e senha.

2. **CRUD de Solicitação de Help**:

   ✅ Imagem, meta, descrição, título e solicitante.

3. **CRUD de Help Realizado**:

   ✅ Solicitação, valor e doador.

## Instruções para a Aplicação

1. **Instale as dependências**:
Na pasta raiz do projeto, rode:
    ```code
        yarn install
       ```

2. **Preencha as environment variables do backend (.env.development e .env.production)**:

   ```env
    JWT_SECRET=''
    BUCKET_NAME=''
    DEV_AWS_ACCESS_KEY_ID=''
    DEV_AWS_SECRET = ''
    DEV_AWS_REGION = ''
    S3_BUCKET_NAME = ''
    NODE_ENV=''
   ```

3. **Preencha as environment variables do backend (.env.development e .env.production)**
   Dentro de cada pasta, `frontend` e `backend`, crie sua aplicação e documente o passo a passo para execução e uma breve explicação do seu desenvolvimento. Caso necessário, crie um outro arquivo .md na raíz, mas não altere este arquivo README.md

4. **Execute o Serverless ao menos uma vez (dev e prod) para obter a URL de execução do Lambda e criar os recursos.**
Na pasta .apps/backend, rode o comando:
   ```env
    yarn nest build && deploy --stage=development
   ```
   ```env
    yarn nest build && deploy --stage=production
   ```
   

5. **Obtenha suas URLs e preencha os arquivos de ambiente do Angular**
Na pasta .apps/frontend/src/environment (environment.ts e environment.prod.ts)
   ```ts
    export const environment = {
    production: false,
    apiUrl: "URLDEV",
    };
   ```
   ```ts
    export const environment = {
    production: false,
    apiUrl: "URLPROD",
    };
   ```
4. **Na raiz do projeto, rode:**
    Desenvolvimento Offline com Nodemon
   ```code
        yarn dev
     ```
    No deploy do backend
   ```code
        yarn deploy-prod
     ```

