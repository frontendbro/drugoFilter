'use strict';
import 'styles/index.scss';
import template from './myfriends.hbs';

VK.init({
	apiId: 6491959
})

function auth() {
	return new Promise((resolve, reject) => {
		VK.Auth.login(data => {
			if (data.session) {
				resolve();
			} else {
				reject(new Error('Ошибка авторизации'));
			}
		}, 2);
	})
}

function callAPI(method, params) {
	params.v = '5.76';

	return new Promise((resolve, reject) => {
		VK.api(method, params, (data) => {
			if (data.error) {
				reject(data.error);
			} else {
				resolve(data.response);
			}
		})
	})
}

// (async () => {
// 	try {
// 		await auth();
// 		const [me] = await callAPI('users.get', { name_case: 'gen' });
// 		const friends = await callAPI('friends.get', {fields: 'city, country, photo_50'});
// 		document.querySelector('#myfriends-list').innerHTML = template(friends);
// 	} catch (e) {
// 		console.error(e);
// 	}
// })();


auth()
	.then(() => {
		return callAPI('users.get', {
			name_case: 'gen'
		});
	})
	.then(([me]) => {
		return callAPI('friends.get', {
			fields: 'city, country, photo_50'
		})
	})
	.then(friends => {
		console.log('​friends', friends);
		document.querySelector('#myFriends-list').innerHTML = template(friends);
	})

const source = document.querySelector('#myFriends-list');
const target = document.querySelector('#friends-list');

makeDND([source, target]);

function makeDND(items) {
	let currentDrag;
	items.forEach(item => {
		item.addEventListener('dragstart', (e) => {
			currentDrag = {
				source: item,
				node: e.target
			};
		});
		item.addEventListener('dragover', (e) => {
			e.preventDefault();
		});
		item.addEventListener('drop', (e) => {
			e.preventDefault();
			if (currentDrag) {
				if (currentDrag.source !== item) {
					if (e.target.classList.contains('friends-list_item')) {
						item.insertBefore(currentDrag.node, e.target.nextElementSibling)
					} else {
						item.insertBefore(currentDrag.node, item.lastElementChild)
					}
				}
				currentDrag = null;
			}
		});
	})
}
