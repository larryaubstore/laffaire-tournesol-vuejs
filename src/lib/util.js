import * as debug           from 'debug';
import * as _               from 'lodash';
import * as d3              from 'd3';



const log = debug('util');
log('util --');

export class Util {

    constructor() {
        log('util');
    }

    flat(data) {
        log('flat');
        

        if (data.children && data.children.length > 0) {
            let emptyList = [];
            data.children.forEach( (child) => {
                emptyList = emptyList.concat(this.flat(child));
            });
            return emptyList;
        } else {
            return data;
        }
    }

    loadJson(urlJson) {
        log('loadJson');

        return new Promise( (resolve, reject) => {
            d3.json(urlJson, function(error, root) {
                if (error) {
                    log(error);
                    reject(error);
                } else {
                    resolve(root);
                }
            });
        });
    }



}


