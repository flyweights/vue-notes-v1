const Note = {
    props: [
        'entityObject',
    ],
    data () {
        return {
            entity: this.entityObject,
        }
    },
    template: `
    <div class="item">
        <div class="content">
            <div class="header">
             {{ entity.body || '新建笔记' }}            
            </div>
        </div>
    </div>
    `
}

const Notes = {
    data () {
        return {
            entities: []
        }
    },
    methods: {
      create() {
          loadCollection('notes')
            .then((collection) => {
                const entity = collection.insert({
                    body: ''
                })
                db.saveDatabase()//保存到数据库
                this.entities.unshift(entity)//修改界面
            })
      }
    },
    created () {
        loadCollection('notes')
            .then((collection) => {
                //console.log(collection)
                const _entities = collection.chain()//链操作
                    .find()//取出
                    .simplesort('$loki', 'isdesc')//排序
                    .data()//返回数组
                this.entities = _entities
                console.log(this.entities + this.key)
            })
    },
    components: {
        'note': Note
    },
    /*
        v-bind的理解不足
        暂时的理解是，让界面某一字符串跟着变量走
    */
    template: `
    <div class="ui container notes">
        <h4 class="ui horizontal divider header">
            <i class="paw icon"></i>
            vue-notes-v1
        </h4>
        <a class="ui right floated basic violet button"
        v-on:click="create"
        >添加笔记</a>
        <div class="ui divided items">
            <note
            v-for="entity in this.entities"
            v-bind:entityObject="entity"
            v-bind:key="entity.$loki"
            >
            </note>
        </div>
    </div>
    `
    
}

/**
 * Vue最简单的用法就是e，c，t，m，p ...
 * 常用函数d，
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