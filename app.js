const Editor = {
    props: [
        'entityObject'
    ],
    data () {
        return {
            entity: this.entityObject
        }
    },
    //$emit未懂，回调给该父组件
    methods: {
        //回调更新
        update() {
            this.$emit("update")
        },
    },
    //v-model的理解不够深
    template:`
        <div class="ui form">
            <div class="field">
                <textarea
                    rows="5"
                    placeholder="写点东西"
                    v-model="entity.body"
                    v-on:input="update">
                </textarea>
            </div>
        </div>
    `
}

const Note = {
    props: [
        'entityObject',
    ],
    data () {
        return {
            entity: this.entityObject,
            open: false
        }
    },
    //计算属性
    computed: {
        header(){
            return _.truncate(this.entity.body, {length:30})
        },
        updated () {
            return moment(this.entity.meta.updated).fromNow()
        },
        words() {
            //去掉空格
            return this.entity.body.trim().length
        }
    },
    methods: {
      save() {
        loadCollection('notes')
            .then((collection) => {
                collection.update(this.entity)
                db.saveDatabase()
            })
      }  
    },
    //键是注册的标签名字，值是组件变量名
    components: {
      'editor': Editor  
    },
    //v-bind父子传值
    template: `
    <div class="item">
        <div class="meta">
            {{ updated }}
        </div>
        <div class="content">
            <div class="header" v-on:click="open = !open">
             {{ header || '新建笔记' }}            
            </div>
            <div class="extra">
                <editor
                    v-bind:entity-object="entity"
                    v-if="open"
                    v-on:update="save">
                </editor>
                <p>{{ words }} 字</p>
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