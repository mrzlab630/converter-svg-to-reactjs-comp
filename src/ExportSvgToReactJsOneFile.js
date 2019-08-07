'use strict';

import {readdir,readFile,writeFile,unlink} from './promisifyEasy';
import path from 'path';


const ExportSvgToReactJsOneFile = async (dirIn='./public/in',
                                         dirOut='./public/out',
                                         fileName,
                                         prefixName ='Icon',
                                         unlinkStatus=false) =>{
    try {

        /////CreateName

        let cleanName =  fileName.split('.svg')[0];

        let cleanNameArr = cleanName.split('-');

        let cleanNameUP = cleanNameArr.map(itmUp => ( itmUp.charAt(0).toUpperCase() + itmUp.slice(1) ));

        let compName = prefixName + cleanNameUP.join('');



        const svgFile = await readFile(`${dirIn}/${fileName}`, 'utf8');

        let width = svgFile.match(/width="([0-9]*)"/i);

        let height = svgFile.match(/ height="([0-9]*)"/i);

        let viewBox = svgFile.match(/ viewBox="([0-9]*\s[0-9]*\s[0-9]*\s[0-9]*)"/i);

        let pathData = svgFile.match(/<path d="(.*)"/i);

        const dataToExport = {
            width: width && width[1] || false,
            height: height  && height[1] || false,
            viewBox: viewBox  && viewBox[1] || false,
            data: pathData  && pathData[1] || false,
            compName,
            dir:{
                from:dirIn,
                to: dirOut
            },
            fileName:{
                from:fileName,
                to: compName + '.js'
            }
        };

/////Template

        const jsFileTemplateFile = await readFile(path.join(__dirname,'./tmpl/jsFileTemplate.tmpl'), 'utf8');

        const findCompName = new RegExp('%{compName}%', 'g');
        const findViewBox = new RegExp('%{viewBox}%', 'g');
        const findData = new RegExp('%{data}%', 'g');

        const jsToFile = jsFileTemplateFile.replace(findCompName,dataToExport.compName)
            .replace(findViewBox,dataToExport.viewBox)
            .replace(findData,dataToExport.data);


        await writeFile(`${dataToExport.dir.to}/${dataToExport.fileName.to}`, jsToFile);

        if(unlinkStatus){
            unlink(`${dataToExport.dir.from}/${dataToExport.fileName.from}`);
        }


        const res = {
                        status: true,
                        statusText: 'created',
                        componentName:dataToExport.compName,
                        fileFrom:{
                            dir:dataToExport.dir.from,
                            name:dataToExport.fileName.from
                                },
                        fileTo:{
                            dir:dataToExport.dir.to,
                            name:dataToExport.fileName.to
                                 }
                    };

        console.log(`component: ${res.componentName} from ${res.fileFrom.name} to file ${res.fileTo.name}  -- ${res.statusText}`);

        return res;

    }catch (e) {
        console.error(e);
    }

};

export default ExportSvgToReactJsOneFile;