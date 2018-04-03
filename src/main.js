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
  'about': About,
  'sujet': D3MergeCircle
};

new Vue({
  el: "#app",
  data: {
    prefix: null,
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      log('current route ==> ' + this.currentRoute);
      if (this.currentRoute === '/') {
        return routes['about'] || NotFound;
      } else {
        this.prefix = this.currentRoute.substring(0, 6);
        return routes['sujet'] || NotFound;
      }
    }
  },
  render (createElement) { 
    log('NAME ===> ' + this.ViewComponent.name);
    if (this.ViewComponent.name === About.name) {
      return createElement(this.ViewComponent);
    } else if (this.ViewComponent === D3MergeCircle.name) {
    } else {
      return createElement(NotFound);
    }
  }  
});

function render(data, createElement) {
  log('render');
    
  if (window.location.pathname !== '/') {

  } else {
    
  }

  let urlJson = data.API_HOST + '/data?id=gerardway';
  log('urlJson => ' + urlJson );

  return createElement(App, {
    props: { id: 'gerardway', titre: 'Gerard Way', urlJson: urlJson}
  }); 
}

function createElementMergeCircle(createElement) {
  const get = Promise.promisify(request.get);
  
  get('/config').then( (data) => {
    return render(JSON.parse(data.body), createElement);
  }).catch( (err) => {
    log('err: ' + err);
  });
    
}

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





