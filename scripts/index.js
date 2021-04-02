import Model from './model.js';
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

        document.addEventListener("input", e => {
            if (e.target.getAttribute("data-role") === "search-all") {
                let input = e.target;
                let ul = document.querySelector('[data-role="friends-all"]');
                search(input, ul);

            } else if (e.target.getAttribute("data-role") === "search-select") {
                let input = e.target;
                let ul = document.querySelector('[data-role="friends-select"]');
                search(input, ul);
            }
        });

        function search(input, ul) {
            let list = ul.querySelectorAll(".mdl-list__item");
            for (const friend of list) {
                friend.classList.remove("none");
                let name = friend.querySelector('[data-role="name"]').textContent;
                if (!name.toLowerCase().includes(input.value.toLowerCase())) {
                    friend.classList.add("none");
                }
            }
        }
    })
    .catch(e => {
        console.error(e);
        alert('Ошибка: ' + e.message);
    });