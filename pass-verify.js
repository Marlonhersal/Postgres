const bcrypt = require('bcrypt')

async function verifyPassword(){
    const hash = '$2b$10$Jufa09VFN74etwyn6zuxc.x3ZfdZ0r8dmqQQi0.VFx2iniCJAB0zi'
    const myPassword = 'admin123'
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch)
}

verifyPassword()