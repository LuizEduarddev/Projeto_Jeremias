const area = document.getElementById('area');
const arquivo = document.getElementById('arquivo');

arquivo.addEventListener('change', selecao);
area.addEventListener('dragover', handleDragOver);
area.addEventListener('drop', handleDrop);

function handleDragOver(event) 
{
    event.preventDefault();
}

function handleDrop(event) 
{
    event.preventDefault();
    var file = event.dataTransfer.items[0].getAsFile();
    const leitor = new FileReader();
    leitor.readAsText(file);
    const conteudo = leitor.result;
    leitor.addEventListener('load', function()
    {
        const conteudo = leitor.result;
        interpretador(conteudo);
    });  
}

function selecao()
{
    const file = this.files[0];
    const leitor = new FileReader();
    leitor.readAsText(file);
    leitor.addEventListener('load', function()
    {
        const conteudo = leitor.result;
        interpretador(conteudo);
    });
}

function isTextoValido(conteudo) {
    if (conteudo) 
    {
        let codigo = 0;
        let linhas = conteudo.split('\n');
        let validacao = true;
        linhas.pop();
        linhas.forEach((linha, indice) => 
        {
        for (let i = 0; i < linha.length; i++) 
        {
            codigo = linha.charCodeAt(i);
            if (codigo > 126) 
            {
                validacao = false;
            }
            else if(linha[i] === '\r')
            {
                validacao = true;
            }
        }
        });
        return validacao;
    } 
    else 
    {
      console.log(conteudo);
      window.alert('Falha na abertura do arquivo.');
      return false;
    }
  }

function interpretador(leitor)
{
    let str;

    if (isTextoValido(leitor))
    {
        leitor = Ordenazacao(leitor);
        verifica_NomeFunc(leitor);
        compilador(leitor);
    }
    else
    {
        window.alert('Desculpe, o arquivo nao parece ser um txt, a pagina sera recarregada.');
        pageReload();
    }
    
    console.log('Operacao validada');
}

function Ordenazacao(string)
{
    let arrayString = string.split('');
    let codigo = 0;
    for (let i=0; i < arrayString.length ; i++)
    {
        if (arrayString[i] === '' || arrayString[i] === ' ')
        {
            if(((codigo = string.charCodeAt(i + 1)) < 33) || ((codigo = string.charCodeAt(i + 1)) > 126))
            {
                arrayString.splice(i, 1);
                i--;
            }
        }
    }
    
    
    arrayString = arrayString.join('');
    arrayString = arrayString.split(/\r|\n/);
    let teste = 0;
    for (let i=0; i < arrayString.length; i++)
    {
        if (arrayString[i] === '' || arrayString[i] === ' ')
        {
            arrayString.splice(i, 1);
            i--;
        }
    }
    return arrayString;
}

function verifica_NomeFunc(arrayString)
{
    for (let i=0; i < arrayString.length; i++)
    {
        parametros_Func(arrayString[i]);
    }
    return;
}

function verifica_string(arrayString)
{
    let ultimoCaracter = arrayString.slice(-1);
    if (ultimoCaracter === ':')
    {
        return;
    }
    else
    {
        window.alert(`A string ${arrayString} nao faz parte da lista de strings permitidas.`);
        pageReload();
        process.abort();
    }
}

function pageReload()
{
    window.alert('Erro detectado, recarregando a página.');
    window.location.reload(true);
}

function getFunc(arrayString)
{
    let string = [];
    let str;
    let toFor = arrayString.length

    for (let i=0; i < toFor; i++)
    {
        if (arrayString[i] === '\n' || arrayString[i] === '\0' || arrayString[i] === ' ' || arrayString[i] === '')
        {
            break;
        }
        string[i] = arrayString[i];
    }
    str = string.join('');
    
    return str;

}

function parametros_Func(str, op = null)
{
    let arrayString;
    arrayString = getFunc(str);

    if (arrayString === 'NOP')
    {
        if (op != null) 
        {
            return 'NOP';
        }
    }
    else if (arrayString === 'MOV')
    {
        if (op != null) 
        {
            return 'MOV';
        }
    }
    else if (arrayString === 'SAV')
    {
        if (op != null) 
        {
            return 'SAV';
        }
    }
    else if (arrayString === 'SWP')
    {
        if (op != null) 
        {
            return 'SWP';
        }
    }
    else if (arrayString === 'NEG')
    {
        if (op != null) 
        {
            return 'NEG';
        }
    }
    else if (arrayString === 'ADD')
    {
        if (op != null) 
        {
            return 'ADD';
        }
    }
    else if (arrayString === 'SUB')
    {
        if (op != null) 
        {
            return 'SUB';
        }
    }
    else if (arrayString === 'PNT')
    {
        if (op != null) 
        {
            return 'PNT';
        }
    }
    else if (arrayString === 'JMP')
    {
        if (op != null) 
        {
            return 'JMP';
        }
    }
    else if (arrayString === 'JEQ')
    {
        if (op != null) 
        {
            return 'JEQ';
        }
    }
    else if (arrayString === 'JNZ')
    {
        if (op != null) 
        {
            return 'JNZ';
        }
    }
    else if (arrayString === 'JGZ')
    {
        if (op != null) 
        {
            return 'JGZ';
        }
    }
    else if (arrayString === 'JLZ')
    {
        if (op != null) 
        {
            return 'JLZ';
        }
    }
    else
    {
        verifica_string(arrayString)
    }

    return;
}

function compilador(string)
{
    let tamanho = string.length;
    let variavel;
    let registradores = criaRegistrador();
    let suporte;

    for (let i=0; i < tamanho; i++)
    {
        variavel = parametros_Func(string[i], 1);
        if (variavel === 'MOV')
        {
            registradores = MOV(string[i], registradores);
        }
        else if (variavel === 'SAV')
        {    
            registradores.BNK = registradores.ACC;
        }
        else if (variavel === 'SWP')
        {
            suporte = registradores.ACC;
            registradores.ACC = registradores.BNK;
            registradores.BNK = suporte;
        }
        else if (variavel === 'NEG')
        {
            registradores.ACC = NEG(registradores.ACC)
        }
        else if (variavel === 'ADD')
        {
            registradores.ACC = ADD(string[i], registradores.ACC);
        }
        else if (variavel === 'SUB')
        {
            registradores.ACC = SUB(string[i], registradores.ACC);
        }
        else if (variavel === 'PNT')
        {
            console.log(`Valor do acumulador: ${registradores.ACC}`);
        }
        else if (variavel === 'JMP')
        {
            i = saltoTemporal(variavel, registradores.ACC, string[i], tamanho, string, i);
        }
        else if (variavel === 'JEQ')
        {
            i = saltoTemporal(variavel, registradores.ACC, string[i], tamanho, string, i);
        }
        else if (variavel === 'JNZ')
        {
            i = saltoTemporal(variavel, registradores.ACC, string[i], tamanho, string, i);
        }
        else if (variavel === 'JGZ')
        {
            i = saltoTemporal(variavel, registradores.ACC, string[i], tamanho, string, i);
        }
        else if (variavel === 'JLZ')
        {
            i = saltoTemporal(variavel, registradores.ACC, string[i], tamanho, string, i);
        }
    }
    
}

function MOV(string, registrador)
{
    let imediato;
    string = string.split(' ');
    let parametros = string.length;
    
    if (parametros > 3)
    {
        window.alert(`O numero de parametros ${parametros} excede o aceitavel.`);
        pageReload();
    }

    try 
    {
        imediato = parseInt(string[2]);
    }
    catch(error) 
    {
        window.alert(`O parametro ${string[2]} nao e um numero aceitavel.`);
        pageReload();
    }
    
    if (string[1] !== "ACC" && string[1] !== "NIL")
    {
        window.alert(`Registrador ${string[2]} nao detectado no sistema.`);
        pageReload();
    }
    else
    {
        if (string[1] === 'ACC')
        {
            if (imediato < -128 || imediato > 127)
            {
                window.alert(`ERROR: o valor do imediato excede o aceitavel entre -128 e 127`);
            }
            registrador.ACC = imediato;
            return registrador;
        }
        return registrador;
    }
    
}

function criaRegistrador()
{
    let registrador = {
        ACC: 0,
        BNK: 0,
        IPT: 0,
        NIL: 0
    }

    return registrador;
}

function NEG(valor)
{
    if (valor < 0)
    {
        valor = Math.abs(valor);
        return valor;
    }
    else if (valor === 0)
    {
        valor = 0;
        return valor;
    }
    else
    {
        valor = valor * -1;
        return valor;
    }
}

function ADD(string, valor)
{
    let imediato = 0;
    string = string.split(' ');
    let parametros = string.length;
    
    if (parametros > 2)
    {
        window.alert(`O numero de parametros ${parametros} excede o aceitavel.`);
        pageReload();
    }

    try 
    {
        imediato = parseInt(string[1]);
    }
    catch(error) 
    {
        window.alert(`O parametro ${string[1]} nao e um numero aceitavel.`);
        pageReload();
    }

    imediato = imediato + valor;
    if (imediato < -128 || imediato > 127)
    {
        window.alert(`ERROR: O valor ${imediato} excede o permitido entre -128 e 127`);
        pageReload();
    }

    return imediato
}

function SUB(string, valor)
{
    let imediato = 0;
    string = string.split(' ');
    let parametros = string.length;
    
    if (parametros > 2)
    {
        window.alert(`O numero de parametros ${parametros} excede o aceitavel.`);
        pageReload();
    }

    try 
    {
        imediato = parseInt(string[1]);
    }
    catch(error) 
    {
        window.alert(`O parametro ${string[1]} nao e um numero aceitavel.`);
        pageReload();
    }

    imediato = valor - imediato ;
    if (imediato < -128 || imediato > 127)
    {
        window.alert(`ERROR: O valor ${imediato} excede o permitido entre -128 e 127`);
        pageReload();
    }

    return imediato
}

function saltoTemporal(jump, valor, pedacoStr, tamanho, string, i)
{
    let str = pedacoStr.split(' ');

    if (jump === 'JMP')
    {
        i = getFor(str[1], tamanho, string);
        return i;
    }
    else if (jump === 'JEQ')
    {
        if (valor === 0)
        {
            i = getFor(str[1], tamanho, string);
            return i;
        }
        else
        {
            console.log(`Valor ${valor} diferente de 0, salto impedido.`);
            return i;
        }
    }
    else if (jump === 'JNZ')
    {
        if (valor !== 0)
        {
            i = getFor(str[1], tamanho, string);
            return i;
        }
        else
        {
            console.log(`Valor ${valor} igual a 0, salto impedido.`);
            return i;
        }
    }
    else if (jump === 'JGZ')
    {
        if (valor > 0)
        {
            i = getFor(str[1], tamanho, string);
            return i;
        }
        else
        {
            console.log(`Valor ${valor} menor que 0, salto impedido.`);
            return i;
        }
    }
    else if (jump === 'JLZ')
    {
        if (valor < 0)
        {
            i = getFor(str[1], tamanho, string);
            return i;
        }
        else
        {
            console.log(`Valor ${valor} maior que 0, salto impedido.`);
            return i;
        }
    }
}

function getFor(valorJump, tamanho, string)
{
    let arrayString;
    valorJump = valorJump.concat(':'); 
    for (let i=0; i < tamanho; i++)
    {
        arrayString = getFunc(string[i]);
        if (valorJump === arrayString)
        {
            return i;
        }
    }
    window.alert(`Instrucao ${valorJump} nao encontrada.`);
    pageReload();
}