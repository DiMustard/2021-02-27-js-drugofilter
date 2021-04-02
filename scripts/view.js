export default {
    render(data) {
        if (data) {
            let template = document.getElementById("friends-template");
            let handlebarsFunction = Handlebars.compile(template.innerHTML);
            return handlebarsFunction(data);
        } else {
            console.error("Не переданы данные");
        }
    }
};