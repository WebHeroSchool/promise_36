let body = document.body;
const preloader = document.getElementById('preloader');

let getName = () => {
  let url = window.location.toString();
  let userName = url.split('=');
  if (userName[1]) {
    username = userName[1];
  } else {
    username = 'gleb860'
  }
  return username;
}

let data = new Date().toLocaleDateString();
let userData = document.createElement('p');

const userUrl = `https://api.github.com/users/${getName()}`;

const getData = new Promise((resolve, reject) => {
  setTimeout(() => data ? resolve(userData.innerHTML = data) : reject('Данные отсутствуют'), 2000);
});

const getUrl = new Promise((resolve,reject) => {
   setTimeout(() => userUrl ? resolve(userUrl) : reject('Данные отсутствуют'), 3000);
})

Promise.all([getData, getUrl])
  .then(([data, userUrl]) => fetch(userUrl))
  .then(res => res.json())
  .then(json => {
        preloader.classList.add('hidden');
        console.log(json.avatar_url);
        console.log(json.name);
        console.log(json.bio);
        console.log(json.html_url);

    let img = new Image();
    img.src = json.avatar_url;
        body.append(img);

        let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация недоступна';
        }

        body.append(name);

        name.addEventListener("click", () => location.assign(`https://github.com/${getName()}`));

        let bio = document.createElement('p');
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация недоступна';
        }
        body.append(bio);
        body.append(userData);

    })

    .catch(err => document.body.innerHTML = ('Информация недоступна'));