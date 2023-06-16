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
    const conteudo = leitor.result;
    leitor.addEventListener('load', function()
    {
        const conteudo = leitor.result;
        window.alert('esta entrando aqui');
        console.log(conteudo);
        interpretador(conteudo);
    });
}

function isTextoValido(conteudo) 
{
    if (conteudo)
    {
        try 
        {
            return true;
        }
        catch(error)
        {
            return false;
        }
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
            
            let linhas = leitor.split('\n');
            linhas = Ordenazacao(linhas);
            
            linhas.forEach((linha, indice) => 
            {
                if (linha.endsWith(':'))
                {
                    
                }
                else if(linha === 'oi')
                {
                    console.log(`A linha ${indice + 1} é oi`);
                }
            })
        }
        else
        {
            window.alert('O arquivo é diferente de txt');
            window.location.reload(true);
        }
}

function Ordenazacao(string)
{
    string.forEach((linha, indice) =>
    {
       for (let i=0; linha[i] !== '\n' ; i++)
       {
            if (linha[i] === '')
            linha.splica(i, 1);
       }
    })
    console.log(string);
}
