import chalk from "chalk";

function extraiLinks(arrLinks) {
   return arrLinks.map((objetoLink) => 
        Object.values(objetoLink).join()
    ) //Recebe um callbak
}


async function verificaStatus(arrUrl) {
    const arrStatus = await Promise.all(
        
        arrUrl.map(async (url) => {

            try {
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`;
                
            } catch (erro) {
                return manejaErros(erro)
            }
     }) 
    )
    return arrStatus;
}


function manejaErros(erro) {
    if(erro.cause.code === "ENOTFOUND") {
        return chalk.green.bgBlack("link não encontrado")
    } else {
        return chalk.green.bgBlack("ocorreu algum erro")
    }
}


export default async function listaValidada(listaDeLinks) {
    const links =  extraiLinks(listaDeLinks);
    const status = await verificaStatus(links)
    
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))

}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)
