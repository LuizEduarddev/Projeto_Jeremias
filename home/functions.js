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
        window.alert('esta entrando aqui');
        console.log(conteudo);
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
        window.alert('esta entrando aqui');
        console.log(conteudo);
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
            console.log('Operacao validada');
            leitor = Ordenazacao(leitor);
            str = verifica_NomeFunc(leitor);
            compilador(leitor);
        }
        else
        {
            window.alert('Desculpe, o arquivo nao parece ser um txt, a pagina sera recarregada.');
            pageReload();
        }
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
        bool = getFunc(arrayString[i]);
    }
}

function verifica_string(arrayString)
{
    ultimoCaracter = arrayString.charAt(arrayString.length - 1);
    if (ultimoCaracter === ':')
    {
        return true;
    }
    else
    {
        window.alert(`A string ${arrayString} nao faz parte da lista de strings permitidas.`);
        pageReload();
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

    str = parametros_Func(arrayString);
    return str;

}

function parametros_Func(arrayString, op = null)
{
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
        bool = verifica_string(arrayString)
    }

    return bool;
}

function compilador(string)
{
    let tamanho = string.length;
    let variavel;
    let ACC, BNK, IPT, NIL;

    for (let i=0; i < tamanho; i++)
    {
        variavel = parametros_Func(string[i], 1);
        if (variavel === 'MOV')
            MOV(string[i], ACC, NIL);
    }
}

function MOV(string, ACC, NIL)
{
    let tamanho = string.lenght;

    console.log(string);
}

