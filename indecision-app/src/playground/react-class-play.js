class Person  {
    constructor(name='Unknown', age, stam = 'Chill') {
       this.name = name;
}
getGreeting() {
    return this.name
}
}
const me = new Person('Chill Chill');
console.log(me.getGreeting())

const other = new Person()
console.log(other.getGreeting())

