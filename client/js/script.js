const { createApp } = Vue;

var moviePod = ({
    data() {
        return{
            movie: '',
            searchTitle: '',
            signUpUsername: '',
            signUpPassword: '',
            signUpDateOfBirth: '',
            logInUsername: '',
            logInPassword:'',
            loginStatus: 'Not logged in'
        };
    },
    methods: {
        async getMovie(){
            this.searchTitle.replace(/\s/g, "+");
			const {data} = await axios.get(`http://localhost:3000/getMovie/${this.searchTitle}`);
            console.log(data);
            this.movie = data;
        },
        async addUser(){
            //Add User to Database
            axios.post(`http://localhost:3000/adduser`, {
                username: this.signUpUsername,
                password: this.signUpPassword,
                dateOfbirth: this.signUpDateOfBirth
            })
            .then(response => { 
                console.log(response);
            })
            //Clear Text Boxes
            this.signUpUsername = '';
            this.signUpPassword = '';
            this.signUpDateOfBirth = '';
        },
        async checkLogIn(){
            // Send request with login information and check if its correct
            console.log('click');
            const res =  await axios.post(`http://localhost:3000/checkpassword`, {
                username: this.logInUsername,
                password: this.logInPassword
            })
            console.log(res);
            let response = res.data;
            if(res.data == true){
                alert('Login Successful');
                document.cookie = `loggedInUser=${this.logInUsername}; SameSite=None; max-age=300; secure`          //fix
                loginStatus = `Logged in as ${document.cookie}`;                    //fix
            }
            console.log(document.cookie);
            //Clear Text Boxes
            this.logInUsername = '';
            this.logInPassword = '';

            return response;
        },
    }
})

createApp(moviePod).mount('#app');
