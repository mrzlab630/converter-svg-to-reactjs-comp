'use strict';

import ExportSvgToReactJsAll from './ExportSvgToReactJsAll';


const App =  () =>{
    try {

        const dirFileIn = './public/in';
        const dirFileOut= './public/out';
        const prefixName= 'Icon';
        const iconsFolder='brandsFaIcons';
        const unlinkStatus = true;


        ExportSvgToReactJsAll(dirFileIn,dirFileOut,prefixName,iconsFolder,unlinkStatus);




    }catch (e) {
        console.error(e);
    }

};

App();