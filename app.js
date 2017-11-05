const Note = {
    template: `
    <div>笔记</div>
    `
}

const Notes = {
    components: {
      'note': Note  
    },
    template: `
    <div>
        <a>添加笔记</a>
        <note></note>
        <note></note>
        <note></note>
        <note></note>        
    </div>
    `
}

/**
 * Vue最简单的用法就是e，c，t ...
 * 
 */
const app = new Vue({
    el: '#app',
    components: {
        'notes': Notes
    },
    template: `
        <notes></notes>
    `
})