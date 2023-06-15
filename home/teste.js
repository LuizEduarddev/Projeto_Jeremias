erro = teste_erro(leitor);
        if (erro == error)
        {
            window.alert(`Ocorreu um erro! ${erro}`)
            segundo = setTimeout(1000*5);
            window.alert(`A pagina sera recarregada em ${segundo}`)
            if (segundo >=5)
            {
                location.reload()
            }
        }
        else
        {

        }