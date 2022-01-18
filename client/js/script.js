const { createApp } = Vue;

var moviePod = {
  data() {
    return {
      movie: '',
      searchTitle: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpDateOfBirth: '',
      logInUsername: '',
      logInPassword: '',
      loginStatus: 'Not logged in',
      response: true,
      invalidLogin: false,
      invalidPassword: false

    };
  },
  created() {
    try {
      let cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('loggedInUser='))
        .split('=')[1];
      return (this.loginStatus = `Logged in as ${cookieValue}`);
    } catch {
      console.error(
        `Keine cookies gesetzt. Cookies length: ${document.cookie.length}`
      );
    }
  },
  methods: {
    async getMovie() {
      this.searchTitle.replace(/\s/g, '+');
      const { data } = await axios.get(
        `http://localhost:3000/getMovie/${this.searchTitle}`
      );
      console.log(data);
      this.movie = data;
    },
    async addUser() {
      //Add User to Database
      axios
        .post(`http://localhost:3000/adduser`, {
          username: this.signUpUsername,
          password: this.signUpPassword,
          dateOfbirth: this.signUpDateOfBirth,
        })
        .then((response) => {
          console.log(response);
        });
      //Clear Text Boxes
      this.signUpUsername = '';
      this.signUpPassword = '';
      this.signUpDateOfBirth = '';
    },
    async checkLogIn() {
      // Send request with login information and check if its correct
      try {
        const res = await axios.post(`http://localhost:3000/checkpassword`, {
          username: this.logInUsername,
          password: this.logInPassword,
        });
        response = res.data;
        console.log(response);
        if (res.data == true) {
          alert('Login Successful');
          document.cookie = `loggedInUser=${this.logInUsername}; SameSite=None; max-age=300; secure`; //fix

          let cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('loggedInUser='))
            .split('=')[1];
            this.loginStatus = `Logged in as ${cookieValue}`
            this.invalidLogin = false;
            this.invalidPassword = false;
        }
        else if(response == false){
            this.invalidPassword = true;
            this.invalidLogin = false;
        }
        console.log(document.cookie);
        //Clear Text Boxes
        this.logInUsername = '';
        this.logInPassword = '';
      } catch (err) {
        this.invalidLogin = true;
        this.invalidPassword = false;
      }
    },
  },
};

createApp(moviePod).mount('#app');
