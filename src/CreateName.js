'use strict';



const CreateName = (listNames = [], prefixName = 'Icon') =>{

            try {

                if(!listNames || listNames.length === 0){
                    throw Error('no data');
                }

                return  listNames.map(itm =>{

                    let cleanName =  itm.split('.svg')[0];

                    let cleanNameArr = cleanName.split('-');

                    let cleanNameUP = cleanNameArr.map(itmUp => ( itmUp.charAt(0).toUpperCase() + itmUp.slice(1) ));

                    return   cleanNameUP.join('') + prefixName;

                });



            }catch (e) {
            console.log(e);
            }


};


export default CreateName;