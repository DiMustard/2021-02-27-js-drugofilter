import Model from './model.js';
import Controller from './controller.js';
Controller.NOfriends();



Model.login(7811603, 2)
    .then(() => {
        return Model.getUser({
            name_case: 'gen'
        }).then(([me]) => {
            let current = document.querySelector('[data-role="current-user"]');
            current.setAttribute("href", `https://vk.com/id${me.id}`)
            current.setAttribute("id", `${me.id}`)
            current.innerHTML = `${me.first_name} ${me.last_name}`;
        });
    })
    .then(() => {
        Controller.friendsAll();
        Controller.friendsSelect();
    })
    .then(() => {
        document.addEventListener("click", e => {
            let target;

            if (e.path[0].classList.contains("material-icons")) {
                target = e.path[1];

            } else if (e.path[0].classList.contains("mdl-button")) {
                target = e.path[0];
            }


            if (target && target.getAttribute("data-role") === "add") {
                let addID = target.getAttribute("data-id");
                let addUser = document.getElementById(`${addID}`);
                localStorage.setItem(`drugofilter${addID}`, `https://vk.com/id${addID}`);
                Controller.friendsSelect();

            } else if (target && target.getAttribute("data-role") === "remove") {
                let removeID = target.getAttribute("data-id");
                let removeUser = document.getElementById(`${removeID}`);
                localStorage.removeItem(`drugofilter${removeID}`);
                Controller.friendsSelect();
            }
        });
    })
    .catch(e => {
        console.error(e);
        alert('Ошибка: ' + e.message);
    });