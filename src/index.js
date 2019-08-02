'use strict';

import fs from 'fs';
import CreateFiles from './CreateFiles';



const App = () =>{

    try {


        const dirIn = './public/in';
        const dirOut = './public/out';

      //  const crtFiles = CreateFiles(dirIn,dirOut);

/*
        let list = fs.readdirSync(dirIn);


        if(typeof list !== 'object'){
            throw Error('no file in dir');
        }
*/

const fileName = 'address-book.svg';
const prefixName = 'Icon';

  fs.readFile(`${dirIn}/${fileName}`, 'utf8', (err,data)=>{

            if (err) throw err;

            let width = data.match(/width="([0-9]*)"/i);

            let height = data.match(/ height="([0-9]*)"/i);

            let viewBox = data.match(/ viewBox="([0-9]*\s[0-9]*\s[0-9]*\s[0-9]*)"/i);

            let pathData = data.match(/<path d="(.*)"/i);

            const dataToExport = {
                                        width: width[1] || false,
                                        height: height[1] || false,
                                        viewBox: viewBox[1] || false,
                                        data: pathData[1] || false,
                                    };


            /////CreateName

      let cleanName =  fileName.split('.svg')[0];

      let cleanNameArr = cleanName.split('-');

      let cleanNameUP = cleanNameArr.map(itmUp => ( itmUp.charAt(0).toUpperCase() + itmUp.slice(1) ));

      let compName = cleanNameUP.join('') + prefixName;


      const res = {
            ...dataToExport,
          compName,
          fileName:{
                from:fileName,
                to: compName + '.js'
          }
      };

      /// write to file

      const dataToFile = `import React from 'react';
import IconWrapper from './IconWrapper';

const ${res.compName} = props => {

    return <IconWrapper
        viewBox = {'${res.viewBox}'}
        data = {"${res.data}"}
        {...props} />;
};

export default ${res.compName};`;

      fs.writeFile(`${dirOut}/${res.fileName.to}`, dataToFile, function(err){
          if (err) {
              console.log(`${res.fileName.to} Файл не создан`,err);
          } else {
              console.log(`${res.fileName.to} Файл создан`);
          }
      });




      console.info(res);

        });






    }catch (e) {
        console.error(e);
    }


};


App();