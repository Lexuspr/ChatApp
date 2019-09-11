import { Alert } from 'react-native'
import firebase from 'firebase'
import '@firebase/firestore'
import config from './Firebase'

class Fire {
    constructor() {
        this.init()
        this.observeAuth()
        this.db = firebase.firestore()
    }

    init = () => {
        firebase.initializeApp(config)
    }

    observeAuth = () => {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    }

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously()

            } catch ({ message }) {
                console.log('Fire.js Error ==> ', message)
                Alert.alert('Error!', message)
            }
        }
    }

    get ref() { return this.db.collection('messages') }

    on = callback => this.unsuscribe = this.ref.orderBy('createdAt').limit(20).onSnapshot( snapshot => {
        const changes = snapshot.docChanges()
        changes.forEach(change => {
            if(change.type === 'added')
                callback(this.parse(change))
        });
    })

    parse = ({ doc }) => {
        const { createdAt: numberStamp, text, user } = doc.data()
        const { id: _id } = doc
        const createdAt = numberStamp.toDate()

        const message = {
            _id,
            createdAt,
            text,
            user
        }

        return message
    }

    off = () => this.unsuscribe()

    get uid() { return (firebase.auth().currentUser || {}).uid}

    get timestamp() { return firebase.firestore.Timestamp.fromDate(new Date()) }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const {text, user} = messages[i];
            
            const message = {
                text,
                user,
                createdAt: this.timestamp
            }

            this.append(message)
        }
    }

    append = message => this.ref.add(message)
}

Fire.shared = new Fire()

export default Fire