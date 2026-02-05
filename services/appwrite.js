import { Client, Databases, Account, ID } from 'react-native-appwrite'

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)

const db = new Databases(client);

const account = new Account(client);

const accountService = {
    async tryLogin(email, password) {
        let session = await account.createEmailPasswordSession({ email, password })
        return true;
    },
    async createAccount(email, password) {
        const result = await account.create({
            userId: ID.unique(),
            email,
            password
        });
        let session = await account.createEmailPasswordSession({ email, password })
        return true;
    }
}

const dbService = {
    async listNotes(dbId, colId) {

    },

    async createNote(mood, note, icon) {
        const result = await databases.createDocument({
            databaseId: '<DATABASE_ID>',
            collectionId: '<COLLECTION_ID>',
            documentId: '<DOCUMENT_ID>',
            data: {
                "username": "walter.obrien",
                "email": "walter.obrien@example.com",
                "fullName": "Walter O'Brien",
                "age": 30,
                "isAdmin": false
            },
            permissions: [Permission.read(Role.any())], // optional
            transactionId: '<TRANSACTION_ID>' // optional
        });
    }, 
    
};

export { db, account, dbService, client, accountService }