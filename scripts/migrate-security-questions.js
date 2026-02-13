/**
 * Script de migração: Adicionar pergunta de segurança aos usuários existentes
 *
 * Uso no MongoDB:
 * 1. Copie o conteúdo deste arquivo
 * 2. No mongosh: use shopeewindow
 * 3. Cole o código e execute
 */

// Lista de usuários e suas perguntas/respostas de segurança
// Modifique conforme necessário para cada cliente
const usersToMigrate = [
  {
    username: "admin",
    securityQuestion: "Qual é o nome da sua primeira escola?",
    securityAnswer: "admin" // Será hasheado abaixo
  },
  // Adicione mais usuários conforme necessário
  // {
  //   username: "usuario2",
  //   securityQuestion: "Qual é o nome do seu primeiro animal de estimação?",
  //   securityAnswer: "resposta_aqui"
  // },
];

// Hash das respostas (pré-calculado com bcrypt, custo 10)
// Resposta: "admin"
const hashAdmin = "$2a$10$rKqwZYBqBXVKvN7OqBqNxeOWYXqKxYmMdSFqQ5tqJJ5YqNmJqEK5e";

// Função para migrar usuários
function migrateUsers() {
  let updated = 0;
  let notFound = 0;
  let alreadyHasQuestion = 0;

  usersToMigrate.forEach(user => {
    const result = db.users.updateOne(
      {
        username: user.username,
        securityQuestion: { $exists: false }
      },
      {
        $set: {
          securityQuestion: user.securityQuestion,
          securityAnswer: hashAdmin // Use o hash pré-calculado
        }
      }
    );

    if (result.matchedCount === 0) {
      print(`❌ Usuário não encontrado ou já tem pergunta: ${user.username}`);
      notFound++;
    } else if (result.modifiedCount === 1) {
      print(`✅ Usuário atualizado: ${user.username}`);
      updated++;
    } else {
      print(`⚠️  Usuário já tem pergunta configurada: ${user.username}`);
      alreadyHasQuestion++;
    }
  });

  print("\n=== Resumo ===");
  print(`✅ Atualizados: ${updated}`);
  print(`⚠️  Já tinham pergunta: ${alreadyHasQuestion}`);
  print(`❌ Não encontrados: ${notFound}`);
}

// Executar migração
migrateUsers();

// Verificar quantos usuários ainda sem pergunta
const remaining = db.users.countDocuments({ securityQuestion: { $exists: false } });
print(`\n📊 Usuários restantes sem pergunta de segurança: ${remaining}`);
