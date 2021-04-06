import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';
Controller.NOfriends();



Model.login(7811785, 2)
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

            if (e.target.classList.contains("material-icons")) {
                if (e.target.classList.contains("search")) {
                    let attr = e.target.getAttribute("data-role");
                    target = document.querySelector(`[data-role="search-${attr}"]`);

                } else {
                    target = e.target.closest(".mdl-button");
                }

            } else if (e.target.classList.contains("mdl-button")) {
                target = e.target;
            }


            if (target && target.getAttribute("data-role") === "add") {
                let addID = target.getAttribute("data-id");
                Model.addSelect(Number(addID));
                Controller.friendsSelect();

            } else if (target && target.getAttribute("data-role") === "remove") {
                let removeID = target.getAttribute("data-id");
                Model.removeSelect(Number(removeID));
                Controller.friendsSelect();

            } else if (target && target.tagName === "INPUT") {
                target.focus();
            }
        });



        document.addEventListener("input", e => {
            if (e.target.getAttribute("data-role") === "search-all") {
                let input = e.target;
                let ul = document.querySelector('[data-role="friends-all"]');
                View.search(input, ul);

            } else if (e.target.getAttribute("data-role") === "search-select") {
                let input = e.target;
                let ul = document.querySelector('[data-role="friends-select"]');
                View.search(input, ul);
            }
        });
    })
    .catch(e => {
        console.error(e);
        alert('Ошибка: ' + e.message);
    });