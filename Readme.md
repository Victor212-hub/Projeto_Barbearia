# Projeto Barbearia

Site institucional desenvolvido em React para uma barbearia, com foco em apresentação profissional, divulgação de serviços, galeria de imagens e futura funcionalidade de agendamento.

O projeto foi pensado para ser simples, direto e comercial, evitando aparência genérica ou artificial. A proposta é criar uma landing page limpa, responsiva e fácil de adaptar para outras barbearias no futuro.

---

## Objetivo do projeto

O objetivo principal é criar um site institucional para uma barbearia, apresentando:

- Identidade visual em tons de preto, cinza e branco
- Serviços oferecidos
- Valores dos principais serviços
- Galeria de fotos
- Área futura para agendamento
- Estrutura preparada para expansão

Além de atender uma barbearia real, o projeto também tem como objetivo servir como item de portfólio e base para possíveis sites semelhantes no futuro.

---

## Tecnologias utilizadas

- React
- JavaScript
- HTML
- CSS
- Vite
- Git e GitHub
- Java

---

## Status atual

O projeto ainda está em desenvolvimento.

Componentes já criados:

- Header / Navbar
- Hero
- Services
- Gallery

Componentes planejados:

- BookingForm
- Quem somos
- Localização
- Footer
- Menu mobile com `useState`
- Depoimentos reais, caso existam avaliações disponíveis

---

## Estrutura atual do projeto

src/
  assets/
  components/
    Header/
      Header.jsx
      Header.css

    Hero/
      Hero.jsx
      Hero.css

    Services/
      Services.jsx
      Services.css

    Gallery/
      Gallery.jsx
      Gallery.css

  App.jsx
  App.css
  index.css
  main.jsx

---

## Componentes

### Header / Navbar

O Header contém a navegação principal do site.

Itens atuais:

- Início
- Serviços
- Quem somos
- Localização
- Área do barbeiro
- Agende já

O botão **Agende já** recebe destaque visual por ser a principal chamada para ação do site.

---

### Hero

A seção Hero é a primeira área visual da página.

Ela apresenta:

- Chamada principal da barbearia
- Texto de apoio
- Botões de ação
- Destaques rápidos
- Card com serviço em destaque

O objetivo dessa seção é comunicar rapidamente o tipo de serviço oferecido e conduzir o usuário para o agendamento ou para a lista de serviços.

---

### Services

A seção Services apresenta os serviços da barbearia em formato de cards.

Cada serviço possui:

- Nome
- Descrição
- Preço
- Link de agendamento
- Destaque opcional para serviço mais pedido

Os serviços são renderizados a partir de um array de objetos, facilitando a manutenção e a adição de novos serviços.

Exemplo de estrutura usada:

{
  name: "Corte masculino",
  description: "Corte feito de acordo com o estilo do cliente, com acabamento limpo.",
  price: "R$ 35,00",
  highlight: false,
}

A grid está preparada para receber mais serviços sem quebrar o layout. Em telas maiores, os cards aparecem lado a lado. Em telas menores, a quantidade de colunas é reduzida automaticamente.

---

### Gallery

A seção Gallery foi criada para exibir fotos da barbearia, cortes, ambiente e detalhes do atendimento.

No momento, a galeria utiliza placeholders, pois as fotos reais ainda serão adicionadas.

Quando houver imagens reais, elas devem ser colocadas dentro da pasta:

public/gallery/

Exemplo:

public/
  gallery/
    corte-degrade.jpg
    barba.jpg
    ambiente.jpg

Depois, basta informar o caminho da imagem no array do componente `Gallery.jsx`:

{
  title: "Corte degradê",
  category: "Corte",
  image: "/gallery/corte-degrade.jpg",
}

---

## Decisões de design

O projeto utiliza uma identidade visual escura, baseada em:

- Preto
- Cinza escuro
- Branco
- Bordas discretas
- Botões objetivos
- Layout limpo

A intenção é evitar excesso de efeitos visuais, textos genéricos ou aparência de template automático.

O foco visual está em clareza, profissionalismo e facilidade de navegação.

---

## Depoimentos

A seção de depoimentos ainda não foi adicionada ao site.

A decisão atual é não utilizar avaliações fictícias. A seção será criada apenas quando houver depoimentos reais de clientes, avaliações autorizadas ou comentários confiáveis.

Essa escolha evita passar uma impressão falsa ao usuário e mantém o projeto mais profissional.

---

## Próximas etapas

As próximas funcionalidades planejadas são:

1. Criar o componente `BookingForm`
2. Adicionar estado ao formulário usando `useState`
3. Criar validações simples no formulário
4. Criar seção "Quem somos"
5. Criar seção "Localização"
6. Criar o Footer
7. Implementar menu mobile com `useState`
8. Adicionar imagens reais na galeria
9. Adicionar depoimentos reais, se disponíveis

---

## Como rodar o projeto localmente

Clone o repositório:

git clone URL_DO_REPOSITORIO

Acesse a pasta do projeto:

cd nome-do-projeto

Instale as dependências:

npm install

Rode o projeto:

npm run dev

Acesse no navegador:

http://localhost:5173

---

## Padrão de commits

O projeto utiliza o padrão Conventional Commits.

Exemplos:

feat: add header component
feat: add hero section
feat: add services section
feat: add gallery section
fix: adjust hero layout
style: update services spacing
docs: add project readme

Tipos mais usados no projeto:

- `feat`: nova funcionalidade ou componente
- `fix`: correção de erro
- `style`: alteração visual sem mudança de lógica
- `refactor`: melhoria interna no código
- `docs`: alteração na documentação
- `chore`: tarefas de configuração ou manutenção

---

## Aprendizados aplicados

Durante o desenvolvimento, foram praticados conceitos importantes do React:

- Criação de componentes funcionais
- Organização por pastas de componente
- Uso de props
- Renderização de listas com `.map()`
- Renderização condicional
- Classes CSS dinâmicas
- Separação de responsabilidades entre JSX e CSS
- Limpeza dos estilos padrões do Vit
- Estruturação inicial de uma landing page responsiva

---

## Observações

Este projeto está sendo desenvolvido de forma incremental, componente por componente.

A prioridade atual é construir uma base sólida, simples e compreensível antes de adicionar interatividade mais complexa.

O foco é manter o código organizado, fácil de entender e adequado para evolução futura.
