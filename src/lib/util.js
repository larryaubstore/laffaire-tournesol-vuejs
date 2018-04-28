import * as debug           from 'debug';
import * as _               from 'lodash';
import * as d3              from 'd3';



const log = debug('util');

export class Util {
    constructor() {
        log('util');
    }

    flat(data) {
        log('flat');
        var list = [];
        _.each(data, function(item){
            list.push(_.omit(item, 'children'));
            list.push(_.flatten(_.pick(item, 'children')));
        });
        var result = _.flatten(list);
        return result;
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


