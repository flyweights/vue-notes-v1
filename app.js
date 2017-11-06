const Note = {
    template: `
    <div class="item">
        <div class="content">
            <div class="header">笔记</div>
        </div>
    </div>
    `
}

const Notes = {
    data () {
        return {
            entites: []
        }
    },
    created () {
        loadCollection('notes')
            .then((collection) => {
                //console.log(collection)
                const _entites = collection.chain()
                    .find()//取出
                    .simplesort('$loki', 'isdesc')//排序
                    .data()//返回数组
                this.entites = _entites
                console.log(this.entites)
            })
    },
    components: {
        'note': Note
    },
    template: `
    <div class="ui container notes">
        <h4 class="ui horizontal divider header">
            <i class="paw icon"></i>
            vue-notes-v1
        </h4>
        <a class="ui right floated basic violet button">添加笔记</a>
        <div class="ui divided items">
            <note></note>
            <note></note>
            <note></note>
            <note></note>
        </div>
    </div>
    `
}

/**
 * Vue最简单的用法就是e，c，t， ...
 * 常用函数d
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