/**
 * Gerador de hash para resposta de segurança
 *
 * Uso: node scripts/generate-hash.js "resposta"
 */

const bcrypt = require("bcryptjs");

const answer = process.argv[2];

if (!answer) {
  console.log("Uso: node scripts/generate-hash.js \"sua_resposta_aqui\"");
  process.exit(1);
}

bcrypt.hash(answer, 10).then(hash => {
  console.log("\nResposta:", answer);
  console.log("Hash gerado:");
  console.log(hash);
  console.log("\nCopie o hash acima e use no script de migração.\n");
});
