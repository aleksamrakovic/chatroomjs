class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsubscribe;
    }

    async addChat(message) {
        //format chat object
        let now = new Date();
        let chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        //add to db
        let response = await this.chats.add(chat);
        return response;
    }

    getChats(callback) {
        this.unsubscribe = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
            snapshot.docChanges().forEach((change) => {
                if(change.type === 'added') {
                    //update ui
                    callback(change.doc.data())
                }
            })
        });
    }

    updateName(name) {
        this.username = name;
    }

    updateRoom(room) {
        this.room = room;
        this.unsubscribe ? this.unsubscribe() : null;
    }
}