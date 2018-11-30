import { Server } from './server/server'
import { usersRouter } from './users/users.route'

const server = new Server()

server.bootstrap([usersRouter]).then(server => {
    console.log('Server is listening on: ', server.app.address())
}).catch(err => {
    console.log('Server failed to start')
    console.error(err)
    process.exit(1)
})

