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
            
            const linhas = leitor.split('\n');
            linhas = Ordenazacao(leitor);
            
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
    Object.keys(string).forEach((linha, indice) =>
    {
        console.log(string[linha]);
        if (string[linha] === '')
        {
            string.splice(indice, 1);
        }
        if (string[linha] === '\n')
        {
            string.splice(indice, 1);
        }
    })
    console.log(string);
}
