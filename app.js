const Note = {
    props: [
        'entityObject'
    ],
    data () {
        return {
            entity: this.entityObject
        }
    },
    template: `
    <div class="item">
        <div class="content">
            <div class="header">
             {{ entity.body }}            
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
    created () {
        loadCollection('notes')
            .then((collection) => {
                //console.log(collection)
                const _entities = collection.chain()
                    .find()//取出
                    .simplesort('$loki', 'isdesc')//排序
                    .data()//返回数组
                this.entities = _entities
                console.log(this.entities)
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