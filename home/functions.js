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
    
    leitor.addEventListener('load', function() 
    {
        if (isTextoValido(file))
        {
            window.alert('Funcionou!');
        }
        else
        {
            window.alert('O arquivo é diferente de txt')
        }
    });
}

function selecao()
{
    const arquivo = this.files[0];
    const leitor = new FileReader();

    leitor.addEventListener('load', function()
    {
        if (isTextoValido(arquivo))
        {
            window.alert('Funcionou!');
        }
        else
        {
            window.alert('O arquivo é diferente de txt')
        }
    });

    if (arquivo)
    {
        leitor.readAsText(arquivo);
    }
}

function isTextoValido(conteudo) 
{
    if (conteudo)
    {
        if (conteudo.type === '')
        {
            window.alert('vazio')
            return true;
        }
    }
    else
    {
        window.alert('Falha na abertura do arquivo.');
        return false;
    }
}
