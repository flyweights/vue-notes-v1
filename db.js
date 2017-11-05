const db = new loki('notes',{
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 3000
})

function databaseInitialize() {
    const notes = db.getCollection('notes')
    if (notes === null) {
        db.addCollection('notes')
    }
}
/*
1.直接查看数据库
```
db
```

2.得到数据库中的某一集合
```
const notesCollections = db.getCollection('notes')
```

3.集合中的所有文档
```
notesCollections.find()
```

4.在集合中插入一个文档
```
notesCollections.insert({body: 'hello ~'})
```

5.用id来查询文档,返回一个数据
```
notesCollections.find('$loki': 1)
```

6.用id来查询文档,返回一个文档
```
const note =  notesCollections.findOne('$loki': 1)
```

7.直接修改文档的数据
```
note.body = 'hola ~'
notesCollections.update(note)
```

8.删除文档
```
notesCollections.remove(note)
```
*/
