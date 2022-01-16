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
            logInPassword:''
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
            axios.post(`http://localhost:3000/adduser`, {
                username: this.signUpUsername,
                password: this.signUpPassword,
                dateOfbirth: this.signUpDateOfBirth
            })
            .then(response => { 
                console.log(response);
            })
        },
        async checkLogIn(){
            console.log('click');
            const res =  await axios.post(`http://localhost:3000/checkpassword`, {
                username: this.logInUsername,
                password: this.logInPassword,
            })
            console.log(res);
        },
    }
})

createApp(moviePod).mount('#app');
