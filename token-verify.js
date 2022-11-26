const jwt = require('jsonwebtoken');

const secret = 'myCat';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2OTIyNTM0NH0.Eup45Lir7g1ENT0kS_r_Ngl7pfa0Jr3-gcLrVPI966w';

function verifyToken(token, secret){
    return jwt.verify(token, secret)
}


const payload = verifyToken(token, secret);

console.log(payload)