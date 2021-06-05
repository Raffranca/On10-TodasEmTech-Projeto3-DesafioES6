const urlBase = 'https://api.github.com/users/'
const input = document.querySelector('#nomeUsuario');
const button = document.querySelector('.btn');
const cardUserFound = document.querySelector('.card')
const avatarUrl = document.querySelector('#avatar_url');
const nameUsuario = document.querySelector('.name');
const loginUsuario = document.querySelector('.login');
const bioUsuario = document.querySelector('.bio');
const seguidores = document.querySelector('#people');
const followersUsuario = document.querySelector('#followers');
const publicRepos = document.querySelector('#public_repos');
const repositorios = document.querySelector('#class');
const titleNotFound = document.querySelector('.title_not_found');
const subtitleNotFound = document.querySelector('.subtitle_not_found');
const imgNotFound = document.querySelector('.img_not_found');
const articleRepositorio = document.querySelector('#array_repositorios');

button.addEventListener('click',(event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (name){
        cleanCard()
        getUserName(name);
    }else{
        alert('Digite o username do usuárie!')
    }    
})

/*const replaceName = (name) => {
    let nameModificado = name;
    return nameModificado.tolowerCase()
}*/

const getUserName = (nome) => {
    let nameModificado = nome.toLowerCase();
    

    fetch(urlBase + nameModificado)
        .then(response => response.json())
        .then(object => {
            const array = object;
            if(array.message){
                throw new Error();
            }else{
                console.log(array)
                const {name, login, avatar_url, bio, public_repos, followers } = array
                cardFound(name, login, avatar_url, bio, public_repos, followers)
                repos(login)
            }    
        })
        .catch(()=>{
            console.log('usuário não existe')
            userNotFound();
        })
}

const cardFound = (name, login, avatar_url, bio, public_repos, followers) =>{
    cardUserFound.classList.replace('off', 'card')
    avatarUrl.src = avatar_url;
    nameUsuario.innerHTML = name;
    loginUsuario.innerHTML = login;
    bioUsuario.innerHTML = bio;
    followersUsuario.innerHTML = followers;
    publicRepos.innerHTML = public_repos;
    seguidores.src = "/entrega-projeto/rafaela-franca/img/people_outline.png";
    repositorios.src = "/entrega-projeto/rafaela-franca/img/Vector.png";
}

const repos = (login, nameUser) => {
    fetch(`https://api.github.com/users/${login}/repos`)
    .then(response => response.json())
    .then(repositorios => {
        const arrayRepositorios = repositorios;
        if(arrayRepositorios.length>0){

        console.log(arrayRepositorios)
        const array = arrayRepositorios.map((repositorio)=>{
            
            const {name,description,language,stargazers_count} = repositorio;
            let parseDescription = !description? "-": description;
            let parseLanguage = !language? "-": language;
            return `
            <div class="card-repositorios">
            <div>
                <h5 class="title_repositorio">${name}</h5>
                <pc class="descricao_repositorio">${parseDescription}</p>
            </div>
            <div class="card_rodape">
                <div class="linguagem">
                    <span class="material-icons ${parseLanguage} circle">fiber_manual_record</span>
                    <p class="tipo_linguagem">${parseLanguage}</p>
                </div>
                <div class="estrelas">
                    <span class="material-icons star">star_border</span>
                    <p class="qtd_estrelas">${stargazers_count}</p>
                </div>
            </div>
        </div>
        `
        }).join('');
        articleRepositorio.innerHTML = array;
        } else {
            anyRepositorios(login, nameUser);
        }
    })
}

const anyRepositorios=(login, nameUser)=>{
    if(!nameUser){
        articleRepositorio.innerHTML = `<p>${login} não tem repositórios públicos ainda<p>`;
    } else {
        articleRepositorio.innerHTML = `<p>${nameUser} não tem repositórios públicos ainda<p>`;
    }
}


const cleanCard = () =>{
    avatarUrl.src = "";
    nameUsuario.innerHTML = "";
    loginUsuario.innerHTML = "";
    bioUsuario.innerHTML = "";
    followersUsuario.innerHTML = "";
    publicRepos.innerHTML = "";
    seguidores.src = "";
    repositorios.src = "";
    titleNotFound.innerHTML = "";
    subtitleNotFound.innerHTML = "";
    imgNotFound.src = "";
}

const userNotFound = () =>{
    cardUserFound.classList.replace('card, off')
    titleNotFound.innerHTML = 'Usuário não encontrado :(';
    subtitleNotFound.innerHTML = 'Pesquisar novamente';
    imgNotFound.src = '/entrega-projeto/rafaela-franca/img/not-found.svg'
}

