import Vue            from 'vue'
import App            from './App.vue'

import * as request   from 'browser-request';
import * as debug     from 'debug';
import * as Promise   from 'bluebird';


const log = debug('main');

Vue.config.productionTip = false;

const get = Promise.promisify(request.get);


get('/config').then( (data) => {
  return render(JSON.parse(data.body));
}).catch( (err) => {
  log('err: ' + err);
});
  

function render(data) {
  log('render');
  return new Promise( (resolve, reject) => {
    var vm = new Vue({
      render: function(createElement) {
   
        log('vm render');
    
    
        if (window.location.pathname !== '/') {
    
        } else {
          
        }

        let urlJson = data.API_HOST + '/data?id=gerardway';
        log('urlJson => ' + urlJson );
    
        return createElement(App, {
          props: { id: 'gerardway', titre: 'Gerard Way', urlJson: urlJson}
        }); 
      },
      
    }).$mount('#app');

    resolve(vm);
  })
}







