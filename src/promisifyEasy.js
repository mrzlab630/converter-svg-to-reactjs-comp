import fs from 'fs';
import {promisify} from 'util';


module.exports = {
    readdir: promisify(fs.readdir),
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
    unlink: promisify(fs.unlink),
    // etc...
};