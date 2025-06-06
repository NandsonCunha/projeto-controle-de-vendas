#!/bin/bash

echo "🔧 Criando estrutura do backend..."

# Nome do projeto
read -p "Digite o nome do projeto: " PROJECT_NAME

# Cria a pasta do projeto e entra nela
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# Inicializa projeto Node.js
npm init -y

# Instala pacotes básicos
npm install express dotenv sequelize mysql2

# Instala devDependencies (opcional)
npm install --save-dev nodemon

# Cria estrutura de pastas
mkdir -p src/{config,controllers,models,routes,services,middlewares}
touch src/app.js
touch src/server.js
touch .env

# Arquivo de configuração do DB (exemplo)
cat <<EOF > src/config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;
EOF

# Exemplo de conteúdo para app.js
cat <<EOF > src/app.js
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// Rotas
// const userRoutes = require("./routes/user.routes");
// app.use("/users", userRoutes);

module.exports = app;
EOF

# Exemplo de server.js
cat <<EOF > src/server.js
const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
  });
});
EOF

# .env de exemplo
cat <<EOF > .env
PORT=3000
DB_NAME=seu_banco
DB_USER=usuario
DB_PASS=senha
DB_HOST=localhost
EOF

echo "✅ Projeto '$PROJECT_NAME' criado com sucesso!"
