import Model from './model.js';
import View from './view.js';


export default {
    async friendsAll() {
        const friendsAll = document.querySelector('[data-role="friends-all"]');

        const friendsVK = await Model.getFriends({
            fields: "photo_100",
            order: "name"
        });

        for (const obj of friendsVK.items) {
            obj.add = true;

            (obj.photo_100 !== "https://vk.com/images/camera_100.png" &&
                obj.photo_100 !== "https://vk.com/images/deactivated_100.png") ?
            obj.photo = true: obj.photo = false
        }

        friendsAll.innerHTML = View.render({
            friends: friendsVK.items
        });
    },


    async friendsSelect() {
        const friendsSelect = document.querySelector('[data-role="friends-select"]');
        friendsSelect.innerHTML = "";

        if (Model.getSelect() !== null &&
            Model.getSelect().length !== 0) {
                
            const friendsVK = await Model.getUser({
                user_ids: Model.inString(Model.getSelect()),
                fields: "photo_100"
            });

            for (const obj of friendsVK) {
                obj.add = false;

                (obj.photo_100 !== "https://vk.com/images/camera_100.png" &&
                    obj.photo_100 !== "https://vk.com/images/deactivated_100.png") ?
                obj.photo = true: obj.photo = false
            }

            friendsSelect.innerHTML = View.render({
                friends: friendsVK
            });

        } else {
            Model.setSelect([]);
        }
    },


    NOfriends() {
        let all = document.querySelector('[data-role="friends-all"]');
        let NOfriendsAll = {};
        NOfriendsAll.items = [];

        for (let i = 0; i < 10; i++) {
            NOfriendsAll.items.push({
                first_name: "Имя",
                last_name: "Фамилия",
                add: true,
                photo: false,
                id: false
            })
        }

        all.innerHTML = View.render({
            friends: NOfriendsAll.items
        });
        NOfriendsAll = undefined;

        let select = document.querySelector('[data-role="friends-select"]');
        let NOfriendsSelect = {};
        NOfriendsSelect.items = [];

        for (let i = 0; i < 10; i++) {
            NOfriendsSelect.items.push({
                first_name: "Имя",
                last_name: "Фамилия",
                add: false,
                photo: false,
                id: false
            })
        }

        select.innerHTML = View.render({
            friends: NOfriendsSelect.items
        });
        NOfriendsSelect = undefined;
    }
};