const { io } = require('../server');
const {User} = require('../classes/user');
const {createMessage} = require('../utilities/utilities');

const users = new User();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if(!data.name || !data.room){
            return callback({
                error: true,
                message: 'Name and room are required'
            });
        }

        client.join(data.room);

        let persons = users.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('personList', users.getPersonsPerRoom(data.room));

        callback(persons);
    });

    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id);

        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);
        client.broadcast.to(deletedPerson.room).emit('createMessage',  createMessage('admin', `${deletedPerson.name} left`));
        client.broadcast.to(deletedPerson.room).emit('personList', users.getPersonsPerRoom(deletedPerson.room));
    });

    // private messages
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message)); 
    });
});