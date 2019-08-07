'use strict';

import fs from 'fs';
import path from 'path';
import {readdir, readFile, writeFile,mkdir,exists} from './promisifyEasy';
import ExportSvgToReactJsOneFile from './ExportSvgToReactJsOneFile';


const ExportSvgToReactJsAll = async (dirFileIn = './public/in',dirFileOut= './public/out',prefixName= 'Icon',iconsFolder='icons',unlinkStatus=false) =>{
    try {
        console.log('start');


        const dirIn = dirFileIn;
        const dirOut = dirFileOut+'/'+iconsFolder;


        const testExists = fs.existsSync(dirOut);

        console.log('create a folder -- start');

        if (!testExists){
            fs.mkdirSync(dirOut);

        }

        console.log('create a folder -- OK');

        console.log('list names of svg files...');

        const names = await readdir(dirIn);

        console.log('list names of svg files -- OK');

        console.log('conversion start...');

        const res =[];
        const componentNamesArr = [];
        const importFromArr = [];

        for (let index = 0; index < names.length; ++index) {

            let act = await ExportSvgToReactJsOneFile(dirIn,dirOut,names[index],prefixName,unlinkStatus)

            res.push(act);

            if(act.componentName){
                componentNamesArr.push(act.componentName);

                importFromArr.push(`import ${act.componentName} from './${act.componentName}';`)
            }

        }


        if(res.length === 0){
            throw Error('conversion -- error');
        }

        console.log('conversion -- OK');

        console.log('add index.js &  IconWrapper.js -- start');

        const IconWrapperFile = await readFile(path.join(__dirname,'./tmpl/IconWrapper_js.tmpl'), 'utf8');

        await writeFile(`${dirOut}/IconWrapper.js`, IconWrapperFile);

        const importFrom = importFromArr.join("\n");
        const exportList = "export {\nIconWrapper,\n"+componentNamesArr.join(",\n")+"\n};";


        await writeFile(`${dirOut}/index.js`, " import IconWrapper from './IconWrapper';\n\r"+importFrom + "\n\r" + exportList);



        console.log('add index.js &  IconWrapper.js -- OK');


        console.log('done.');
        return true;




    }catch (e) {
        console.error(e);
    }

};


export default ExportSvgToReactJsAll;