//dom
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const rooms = document.querySelector('.chat-rooms');


//class instances
const chatui = new Chatui(chatList);
const chatroom = new Chatroom('general', 'anonimus');

chatroom.getChats(data => chatui.render(data));


newChat.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = newChat.message.value.trim();

    chatroom.addChat(message).then(() => {
        newChat.reset();
    }).catch((err) => {
        console.log(err);
    });
});


newName.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = newName.name.value.trim();
    chatroom.updateName(name);
    newName.reset();
});


rooms.addEventListener('click', e => {
    if (e.target.tagName == 'BUTTON') {
        let id = e.target.getAttribute('id');
        console.log(id);
        chatroom.updateRoom(id);
        chatui.clear();
        chatroom.getChats(data => chatui.render(data));
    }
})