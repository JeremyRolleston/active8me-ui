app.factory("dbService", ['$http', '$q', '$cordovaSQLite', 'DB_CONFIG', function($http, $q, $cordovaSQLite, DB_CONFIG) {
	var self = this;
    self.db = null;
    self.init = function() {
        console.log("dssds")

        //self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name});
        //self.query("CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        // self.db = $cordovaSQLite.openDB("my.db");
        // $cordovaSQLite.execute(self.db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

        // // // Use 
        // self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); //in production
        // //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        // angular.forEach(DB_CONFIG.tables, function(table) {
        //     var columns = [];

        //     angular.forEach(table.columns, function(column) {
        //         columns.push(column.name + ' ' + column.type);
        //     });

        //     var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
        //     self.query(query);
        //     console.log('Table ' + table.name + ' initialized');
        // });
    };

    self.query = function(query, bindings) {
    	console.log(query, bindings)
    	bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
}]);