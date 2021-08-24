import bcrypt from 'bcrypt';

let salt = await bcrypt.genSalt(10);
let crypt = await bcrypt.hash("Ibrohim12", salt);

// console.log(crypt);

let x = await bcrypt.compare("Ibrohim12","$2b$10$dcDv037I6cGQKz2shTQRteU7DkZ7u4PTDet5x3pmzNB/52Ndf1sgC");
console.log(x);
 