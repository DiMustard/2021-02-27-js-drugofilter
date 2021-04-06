export default {
    render(data) {
        if (data) {
            let template = document.getElementById("friends-template");
            let handlebarsFunction = Handlebars.compile(template.innerHTML);
            return handlebarsFunction(data);
        } else {
            console.error("Не переданы данные");
        }
    },


    search(input, ul) {
        let list = ul.querySelectorAll(".mdl-list__item");
        for (const friend of list) {
            friend.classList.remove("none");
            let name = friend.querySelector('[data-role="name"]').textContent;
            if (!name.toLowerCase().includes(input.value.toLowerCase())) {
                friend.classList.add("none");
            }
        }
    }
};