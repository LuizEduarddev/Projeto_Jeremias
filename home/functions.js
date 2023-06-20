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
    if (isTextoValido(leitor))
        {
            let bool = true;
            console.log('Operacao validada');
            leitor = Ordenazacao(leitor);
            bool = verifica_NomeFunc(leitor);
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
    let nomes_permitidos = ['NOP' ,'MOV' ,'SAV' ,'SWP' ,'NEG' , 'ADD', 'SUB'  ,'PNT'  ,'JMP'  ,'JEQ'  ,'JNZ' ,'JGZ' ,'JLZ']
    let bool = false;

    for (let i=0; i < arrayString.length; i++)
    {
        for (let j=0; j < nomes_permitidos.length; j++)
        {
            if (arrayString[i] === nomes_permitidos[j])
            {
                bool = true;
            } 
        }
        if (bool === false)
        {
            if(!verifica_string(arrayString[i]))
            {
                pageReload();
            }
        }
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
        return false;
    }
}

function pageReload()
{
    window.alert('Erro detectado, recarregando a página.');
    window.location.reload(true);
}
