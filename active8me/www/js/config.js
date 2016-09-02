//app.constant('API_BASE_URL', 'http://actapi.sourcefuse.com/html/activateme/')
app.constant('API_BASE_URL', 'http://active8me.sourcefuse.com/')
//app.constant('API_BASE_URL', 'http://192.168.1.75/html/activateme/')
.constant('DB_CONFIG', {
    name: 'activate8me.temp',
    tables: [
      {
            name: 'users',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'user_id', type: 'integer'},
                {name: 'name', type: 'text'},
                {name: 'email', type: 'text'},
                {name: 'program_id', type: 'integer'},
                {name: 'weight_to_loose', type: 'text'},
                {name: 'fitness_level', type: 'integer'},
                {name: 'calorie_level', type: 'text'},
                {name: 'gender', type: 'text'},
                {name: 'dob', type: 'text'},
                {name: 'height', type: 'text'},
                {name: 'weight', type: 'text'},
                {name: 'country_id', type: 'integer'},
                {name: 'logged_in', type: 'integer'}
            ]
        }
    ]
});