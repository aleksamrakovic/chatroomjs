//render chat template to dom

class Chatui {
    constructor(list) {
        this.list = list;
    }

    render(data) {
        let date = dateFns.distanceInWordsToNow(data.created_at.toDate(), {addSuffix: true});
        let html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${date}</div>
            </li>
        `
        this.list.innerHTML += html;
    }

    clear() {
        this.list.innerHTML = '';
    }
}