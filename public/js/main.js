
Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.window.MessageBox',
    'Ext.fx.target.Element'
]);



Ext.onReady(function(){

    var store = Ext.create('Ext.data.Store', {
        fields : ['id', 'name', 'titleEducation', 'titleCity'],
        proxy  : {
            type   : 'ajax',
            url    : 'index/getdata',
            reader : {
                type : 'json',
                root : 'items'
            }
        },
        autoLoad : true
    });

    Ext.create('Ext.grid.Panel', {
        title    : 'Таблица',
        height   : 400,
        width    : 900,
        renderTo:'table',
        store    : store,
        columns  : [
            new Ext.grid.RowNumberer(),
            { text : 'Имя пользователя', dataIndex : 'name', flex: 3 },
            { text : 'Образование', dataIndex : 'titleEducation', flex : 3 },
            { text : 'Город', dataIndex : 'titleCity', flex : 3 }
        ]
    });


    var nameStore = Ext.create('Ext.data.Store', {
        fields : ['boxLabel', 'name', 'inputValue'],
        proxy  : {
            type   : 'ajax',
            url    : 'index/getusers',
            reader : {
                type : 'json',
                root : 'data'
            }
        },
        autoLoad : true,
        listeners: {
            load: function(store, records) {
                usersName.removeAll();

                usersName.add(Ext.Array.map(records, function(record) {
                    return {
                        boxLabel: record.get('boxLabel'),
                        inputValue: record.get('inputValue'),
                        name: record.get('name')
                    };
                }));
            }
        }
    });

    var educationsStore = Ext.create('Ext.data.Store', {
        fields : ['boxLabel', 'name', 'inputValue'],
        proxy  : {
            type   : 'ajax',
            url    : 'index/geteducations',
            reader : {
                type : 'json',
                root : 'data'
            }
        },
        autoLoad : true,
        listeners: {
            load: function(store, records) {
                educationTitle.removeAll();

                educationTitle.add(Ext.Array.map(records, function(record) {
                    return {
                        boxLabel: record.get('boxLabel'),
                        inputValue: record.get('inputValue'),
                        name: record.get('name')
                    };
                }));
            }
        }
    });

    Ext.create('Ext.data.Store', {
        fields : ['boxLabel', 'name', 'inputValue'],
        proxy  : {
            type   : 'ajax',
            url    : 'index/getcities',
            reader : {
                type : 'json',
                root : 'data'
            }
        },
        autoLoad : true,
        listeners: {
            load: function(store, records) {
                citiesTitle.removeAll();

                citiesTitle.add(Ext.Array.map(records, function(record) {
                    return {
                        boxLabel: record.get('boxLabel'),
                        inputValue: record.get('inputValue'),
                        name: record.get('name')
                    };
                }));
            }
        }
    });

    var usersName = Ext.create('Ext.form.CheckboxGroup', {
        fieldLabel: 'Имена',
        componentCls : 'column'
    });

    var educationTitle = Ext.create('Ext.form.CheckboxGroup', {
        fieldLabel: 'Образования',
        componentCls : 'column'
    });

    var citiesTitle = Ext.create('Ext.form.CheckboxGroup', {
        fieldLabel: 'Города',
        componentCls : 'column'
    });

    var fp = Ext.create('Ext.FormPanel', {
        title: 'Задание для тестов',
        frame: true,
        fieldDefaults: {
            labelWidth: 110
        },
        width: 900,
        renderTo:'form-ct',
        bodyPadding: 10,

        items: [
            usersName,
            educationTitle,
            citiesTitle
        ],
        buttons: [{
            text: 'Обновить список',
            handler: function() {
                var form = this.up('form').getForm().getValues();
                store.proxy.extraParams = { data : Ext.JSON.encode(form)};
                store.load();
            }
        }]
    });

});
