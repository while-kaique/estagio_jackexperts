# Task Manager
 Projeto desenvolvido para uso completo das Hard Skills + conquista de uma vaga para estágio em Desenvolvimento Web.

 # Task Manager

Task Manager é um gerenciador dinâmico e completo de tarefas, no qual o usuário pode criar projetos e inserir, dentro desses projetos, cards de "tarefas" com cor, título, categoria, descrição e data de postagem.

## Layout Home
Logo na página Home podemos acessar o nome do usuário (que aparece ao fazer Login, substituindo "Jovem Garfanhoto"), a criação de projetos, a criação de cards e o Login/Registrar-se. Também é possível visualizar categorias de cada projeto como "em progresso" ou "concluídas".

Além disso, o site é Mobile-First, portanto, possui responsividade completa e um "Menu" aparece quando o usuário utiliza um dispositivo móvel para acessar o site.

![Home Page](https://github.com/user-attachments/assets/abae1ace-58eb-41f2-a318-b2fd101dc65d)



## Layout Login
Já página Login, podemos acessar a conta previamente cadastrada do usuário (API Node.js com MySQL) e retornar à página Home com o nome "Jovem Garfanhoto" subsituído pelo nome da conta cadastrada.

Como utilizamos um sistema de Token JWT, guardamos o Token do usuário para que o mesmo não precisa realizar Login a cada reload da página. Também usamos a técnica "Toke Refresh" para que o usuário posso até mesmo passar o dia utilizando o site, com a validade do Token sendo recuperada a cada vez que expira.

![Login Page](https://github.com/user-attachments/assets/17a1d9c9-80b0-47c8-8e25-df97d1985749)


## Layout Cadastro
Na página Cadastro podemos criar/cadastrar um novo usuário no Banco de Dados MySQL via backend em Node.js, o cadastro agora é completo e possui validação. O formulário, no front-end, utiliza a biblioteca "Formik" para UX/UI, com o objetivo de facilitar a inserção de dados no formulário.

![Register Page](https://github.com/user-attachments/assets/1e3cd3b9-9c90-41b3-b450-09e15139cd98)

)

# Tecnologias utilizadas
## Back end
- Node.js
- Express
- Multer
- MySQL
## Front end
- HTML / CSS / JavaScript
- ReactJS
- Redux
- Tailwind
- JWT
## Implantação em produção
- Back end: Render
- Front end: Vercel
- Banco de dados: MySQL

# Autor

Kaique Breno Gerônimo Medeiros

https://www.linkedin.com/in/kaique-breno
