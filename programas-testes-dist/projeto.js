const fs = require('fs');

// Definição dos registradores
let ACC = 0; // Registrador acumulador
let BNK = 0; // Registrador de backup
let IPT = 0; // Registrador ponteiro de instrução
let NIL = 0; // Registrador nulo

// Tabela de rótulos
const labels = {};

// Função para executar as instruções
function executeInstruction(instruction) {
  const parts = instruction.split(' ');

  const opcode = parts[0].toUpperCase();
  const operand = parts[1] || null;

  switch (opcode) {
    case 'NOP':
      break;

    case 'MOV':
      if (operand === 'ACC') {
        ACC = parseInt(parts[2]);
      } else if (operand === 'NIL') {
        NIL = parseInt(parts[2]);
      }
      break;

    case 'SAV':
      BNK = ACC;
      break;

    case 'SWP':
      [ACC, BNK] = [BNK, ACC];
      break;

    case 'NEG':
      ACC = -ACC;
      break;

    case 'ADD':
      ACC += parseInt(parts[1]);
      break;

    case 'SUB':
      ACC -= parseInt(parts[1]);
      break;

    case 'PNT':
      console.log(ACC);
      break;

    case 'JMP':
      IPT = labels[operand] - 1;
      break;

    case 'JEQ':
      if (ACC === 0) {
        IPT = labels[operand] - 1;
      }
      break;

    case 'JNZ':
      if (ACC !== 0) {
        IPT = labels[operand] - 1;
      }
      break;

    case 'JGZ':
      if (ACC > 0) {
        IPT = labels[operand] - 1;
      }
      break;

    case 'JLZ':
      if (ACC < 0) {
        IPT = labels[operand] - 1;
      }
      break;
  }
}

// Função para realizar a análise do arquivo e validação de sintaxe
function parseAndValidateIDPFile(filename) {
  const program = fs.readFileSync(filename, 'utf8').split('\n');

  // Verifica a quantidade máxima de instruções
  if (program.length > 32) {
    console.log('Erro: O programa excede o limite máximo de 32 instruções.');
    return;
  }

  // Realiza a análise do arquivo e armazena os rótulos
  for (let i = 0; i < program.length; i++) {
    const instruction = program[i].trim();

    // Ignora linhas em branco
    if (instruction.length === 0) {
      continue;
    }

    // Verifica se a instrução possui um rótulo
    if (instruction.includes(':')) {
      const [label, _] = instruction.split(':');
      const trimmedLabel = label.trim();

      // Verifica a validade do rótulo
      if (!trimmedLabel.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
        console.log(`Erro: Rótulo inválido na linha ${i + 1}: ${trimmedLabel}`);
        return;
      }

      // Verifica se o rótulo já foi definido anteriormente
      if (labels.hasOwnProperty(trimmedLabel)) {
        console.log(`Erro: Rótulo duplicado na linha ${i + 1}: ${trimmedLabel}`);
        return;
      }

      // Armazena o rótulo e o índice da instrução
      labels[trimmedLabel] = i;
    }
  }

  // Executa o programa
  for (IPT = 0; IPT < program.length; IPT++) {
    const instruction = program[IPT].trim();

    // Ignora linhas em branco
    if (instruction.length === 0) {
      continue;
    }

    executeInstruction(instruction);
  }
}

// Execução do programa principal
const filename = 'prog-correto-03.idp'; // Nome do arquivo .idp contendo o programa
parseAndValidateIDPFile(filename);
