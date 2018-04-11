import Vue              from 'vue'


import About            from './components/About.vue';
import D3CirclePacking  from './components/D3CirclePacking.vue';
import D3BubbleChart    from './components/D3BubbleChart.vue';
import D3MergeCircle    from './components/D3MergeCircle.vue';


import * as request     from 'browser-request';
import * as debug       from 'debug';
import * as Promise     from 'bluebird';

const NotFound = { template: '<p>Page non trouvé</p>' };
const get = Promise.promisify(request.get);
const routes = {
  'about': About,
  'sujet': D3MergeCircle,
  'top1000': D3BubbleChart
};
const log = debug('main');



class Main {

  config = null;

  constructor() {
    log('main');
    Vue.config.productionTip = false;
  }

  render(createElement, component) {
    log('render ==> ' + component.name);
    let urlJson = this.config.API_HOST + '/data?id=gerardway';
    return createElement(component, {
      props: { id: 'gerardway', titre: 'Gerard Way', urlJson: urlJson}
    }); 
  }

  createElementMergeCircle(createElement, component) {
    log('createElementMergeCircle');
    return this.render(createElement, component);  
  }

  newVue(json) {
    log('newVue');
    var instance = this;
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
          } else if( this.currentRoute === '/top1000') {
            return routes['top1000'] || NotFound;
          } else {
            this.prefix = this.currentRoute.substring(0, 6);
            return routes['sujet'] || NotFound;
          }
        }
      },
      render (createElement) { 
        log('NAME ===> ' + this.ViewComponent.name);
        if (this.ViewComponent.name === About.name) { // About
          return createElement(this.ViewComponent);
        } else if (this.ViewComponent.name === D3MergeCircle.name) { // Sujet
          return instance.createElementMergeCircle(createElement, this.ViewComponent);
        } else if( this.ViewComponent.name === D3BubbleChart.name) { // top100
          return createElement(this.ViewComponent, {
            props: { data: JSON.parse(json.body) }
          });
        } else {
          return createElement(NotFound);
        }
      }  
    });
  }

  run() {
    log('run');
    return get('/config').then( (data) => {
      this.config = JSON.parse(data.body);
      return null;
    }).then( () => {
      if (window.location.pathname === '/top1000') {
        let apiRoute = this.config.API_HOST + '/top1000';
        return get(apiRoute);
      } else {
        return null;
      }
    }).then( (json) => {
      this.newVue(json);
      return null;
    }).catch( (err) => {
      log('err: ' + err);
    });
  }
}

new Main().run();









  



  

