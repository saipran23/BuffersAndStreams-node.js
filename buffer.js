
const buffOne = Buffer.alloc(10)  // allocate a buffer of 10 bytes.
//this will all initialize to zeros
console.log(buffOne); //<Buffer 00 00 00 00 00 00 00 00 00 00>


const bufferFromString = Buffer.from("Hello");
console.log(bufferFromString);  //<Buffer 48 65 6c 6c 6f>


const bufferFromArrayofIntegers = Buffer.from([1,2,3,4,5]);
console.log(bufferFromArrayofIntegers); //<Buffer 01 02 03 04 05>



//  write a string to the buffer.

buffOne.write('Node js'); //<Buffer 4e 6f 64 65 20 6a 73 00 00 00>
console.log(buffOne.toString());  //Node js


//read the single element form the string.
console.log(bufferFromString[0]);

//we can slice .slice() also concate two buffers


const concatBuffs = Buffer.concat([buffOne, bufferFromString]);
console.log(concatBuffs);