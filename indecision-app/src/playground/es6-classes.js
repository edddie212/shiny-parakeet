class Person {
    constructor(name, age = 0) {
      this.name = name || 'Unknown';
      this.age = age;
    }
    getGreeting() {
        return `Hello my name is: ${this.name}, and i am ${this.age} years old.`;
    }
}

//Example2
class Traveler extends Person {
    constructor(name, age, location) {
        super(name, age);
        this.location = location;
    }
    getGreeting() {
        let userInfo = super.getGreeting() + ` Currently live in ${this.location}`;
        return this.location ? userInfo : 'No info provided';
    }
}

const check1 = new Traveler('Chill', 29, 'Tel-Aviv');
console.log(check1.getGreeting())

const check2 = new Traveler('Chill', 29);
console.log(check2.getGreeting())

//Example 1
class Student extends Person{
 constructor(name, age, major) {
     super(name, age);
     this.major = major;
 }
 hasMajor(){
     return !!this.major;
 }
 getGreeting() {
     let description = super.getGreeting();

     if(this.hasMajor()) {
         description = `Hello my name is: ${this.name}, and i am ${this.age} years old, and i live in ${this.location}`;
     } else {
         description = 'No Info Is Aviliable';
     }
     return description;
 }
}
const person = new Student('Brad', 25, 'Web Dev');
// console.log(person.getGreeting())

const other = new Student();
// console.log(other.getGreeting())
