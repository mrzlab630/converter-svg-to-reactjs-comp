### Icon converter svg to react.js component


## Development

* **yarn install / npm install**
* put svg files to dirFileIn
* **yarn start / npm start**
<br>
<br>


## how to use it.

```

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



```


* ExportSvgToReactJsAll -- all files in dir
* ExportSvgToReactJsOneFile -- one file





<br>
<br>

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :)
<br><br>
[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3FYLY9YVBTSEL)
<br>
<br>

## License

The MIT License.

<br>
<br>

## By

**mrZ** - mrz@mrzlab630.pw