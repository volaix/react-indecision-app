name = 'chris';

const obj = {
    name: "john",
    callName: () =>w {
        console.log('this', this);
        return 'hello ' + this.name;
    },

}

console.log(obj.callName());

// obj.callName = function() {
//     return this.name
// }.bind(obj);

// const obj2 = {
//     name: "mark",
//     callName: obj.callName 
// }

// console.log(obj2.callName())
