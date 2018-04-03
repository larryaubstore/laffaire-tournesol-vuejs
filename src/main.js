import Vue              from 'vue'


import About            from './components/About.vue';
import D3CirclePacking  from './components/D3CirclePacking.vue';
import D3BubbleChart    from './components/D3BubbleChart.vue';
import D3MergeCircle    from './components/D3MergeCircle.vue';
const NotFound = { template: '<p>Page non trouvé</p>' };

import * as request     from 'browser-request';
import * as debug       from 'debug';
import * as Promise     from 'bluebird';





const log = debug('main');
log('main');
Vue.config.productionTip = false;


const routes = {
  '/': About,
  '/sujet/gerardway': D3MergeCircle
};

new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {

      log('current route ==> ' + this.currentRoute);

      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }  
});


/*

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

*/





