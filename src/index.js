import Plugin from 'stc-plugin';

//babel not export default property
//so can not use `import babel from 'babel-core'`
let babel = null;

const defaultPresets = ['es2015-loose', 'stage-1'];
const defaultPlugins = ['transform-runtime'];

/**
 * Use babel to transpile ES6+ to ES5 
 */
export default class BabelPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    if(!babel){
      babel = require('babel-core');
    }
    
    let content = await this.getContent('utf8');
    
    let presets = this.options.presets || [];
    if(presets[0] === true){
      presets = presets.slice(1);
    }else{
      presets = defaultPresets.concat(presets);
    }
    
    let plugins = this.options.plugins || [];
    if(plugins[0] === true){
      plugins = plugins.slice(1);
    }else{
      plugins = defaultPlugins.concat(plugins);
    }
    let data = babel.transform(content, {
      filename: this.file.path,
      presets: presets,
      plugins: plugins,
      sourceMaps: this.options.sourceMap,
      sourceFileName: this.file.path
    });
    return {content: data.code};
  }
  /**
   * update
   */
  update(data){
    this.setContent(data.content);
    this.file.extname = this.options.extname || 'js';
  }
  /**
   * cache
   */
  static cache(){
    return true;
  }
  /**
   * use cluster to compile it
   */
  static cluster(){
    return true;
  }
}