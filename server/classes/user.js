

class User{

    constructor(){
        this.persons = [];
    }

    addPerson(id, name, room){
        let person = {id, name, room};
        this.persons.push(person);
        return this.persons;
    }

    getPerson(id){
        let person = this.persons.filter(personn => {
            return personn.id === id;
        })[0];

        return person;
    }

    getPersons(){
        return this.persons;
    }

    getPersonsPerRoom(room){
        let persons = this.persons.filter(person => {
            return person.room === room
        });
    }

    deletePerson(id){
        let personDeleted = this.getPerson(id);
        
        this.persons = this.persons.filter(person => {
            return person.id != id
        });

        return personDeleted;
    }


}

module.exports = {
    User
}