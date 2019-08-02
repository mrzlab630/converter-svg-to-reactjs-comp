'use strict';

import fs from 'fs';
import CreateName from './CreateName';


const CreateFiles = (dirIn = './public/in',
                     dirOut = './public/out') =>{

    try {

        let list = fs.readdirSync(dirIn);


        if(typeof list !== 'object'){
            throw Error('no file in dir');
        }

        const newNames = CreateName(list);

        const dataToFile = "const test = () => console.log('test');";

        const createFiles = newNames.forEach(itm =>{

            fs.writeFile(`${dirOut}/${itm}.js`, dataToFile, function(err){
                if (err) {
                    console.log(`${itm}.js Файл не создан`,err);
                } else {
                    console.log(`${itm}.js Файл создан`);
                }
            });

        });

            return createFiles;



    }catch (e) {
        console.error(e);
    }

};

export default CreateFiles;