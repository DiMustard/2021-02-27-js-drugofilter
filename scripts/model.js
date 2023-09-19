export default {
    login(appId, perms) {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(response => {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);

            document.querySelector('[data-role="exit"]').addEventListener("click", () => {
                localStorage.removeItem("drugofilter");
                VK.Auth.logout();
                setTimeout(() => {
                    location.reload();
                }, 2000);
            })
        });
    },


    callApi(method, params) {
        params.v = params.v || '5.95';

        return new Promise((resolve, reject) => {
            VK.api(method, params, response => {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },


    getUser(params = {}) {
        return this.callApi('users.get', params);
    },


    getFriends(params = {}) {
        return this.callApi('friends.get', params);
    },


    getSelect() {
        return JSON.parse(localStorage.getItem("drugofilter"));
    },


    setSelect(array) {
        return localStorage.setItem("drugofilter", JSON.stringify(array));
    },


    addSelect(id) {
        let array = this.getSelect();
        if (!array.includes(id)) {
            array.push(id);
        }
        this.setSelect(array);
    },


    removeSelect(id) {
        let array = this.getSelect();
        array.forEach((idSelect, i, arr) => {
            if (idSelect === id) {
                arr.splice(i, 1);
            }
        });
        this.setSelect(array);
    },


    inString(array) {
        let string = "";
        array.forEach(elem => {
            if (string === "") {
                string = String(elem);
            } else {
                string += `,${String(elem)}`;
            }
        });
        return string;
    }
};