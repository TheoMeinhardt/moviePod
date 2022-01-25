const { createApp } = Vue;

var moviePod = {
  data() {
    return {
      movie: '',
      searchTitle: '',
      signUpUsername: '',
      signUpPassword: '',
      loggedInUser: '',
      signUpDateOfBirth: '',
      logInUsername: '',
      logInPassword: '',
      loginStatus: 'Not logged in',
      loginSuccess: false,
      response: true,
      invalidLogin: false,
      invalidPassword: false,
      cookieValue: '',
      movieTitle: '',
      movieAdded: false,
      userRating: null,
      notLoggedIn: false
    };
  },
  created() {
    try {
      this.cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('loggedInUser='))
        .split('=')[1];
      return (this.loginStatus = `Logged in as ${this.cookieValue}`);
    } catch {
      console.error(
        `Keine cookies gesetzt. Cookies length: ${document.cookie.length}`
      );
    }
    try {
      this.loggedInUser = document.cookie
        .split('; ')
        .find((row) => row.startsWith('loggedInUser='))
        .split('=')[1];
    } catch {
      if(this.loggedInUser == ''){
        console.error('Kein User angemeldet');
      }
      else{
        console.error('MovieGet fehlgeschlagen');
      }
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
      this.movieTitle = data.Title
    },

    async addUser() {
      //Add User to Database
      const res = axios
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
      console.log(res.data)
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
          document.cookie = `loggedInUser=${this.logInUsername}; SameSite=None; max-age=180; Secure`; //fix

          let cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('loggedInUser='))
            .split('=')[1];
          this.loginStatus = `Logged in as ${cookieValue}`
          this.invalidLogin = false;
          this.invalidPassword = false;
          this.loginSuccess = true;
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


    async addToWatchList() {
      console.log(this.movieTitle)
      try{
        const res = await axios.post(`http://localhost:3000/addMovieToList`, {
          username: this.cookieValue,
          movieTitle: this.movieTitle
        });
        console.log(res);
        if(res.status == 200){
          movieAdded = true;
        }
        const response = await axios.post(`http://localhost:3000/ratemovie`, {
          username: this.cookieValue,
          movieTitle: this.movieTitle,
          rating: this.userRating
        });
        console.log(this.userRating)
        console.log(response)
        this.movieAdded = true;
      }
      catch (err){
        this.notLoggedIn = true;
        console.log(err);
      }
    },
    deleteAllCookies() {
        const cookies = document.cookie.split(";");  for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  },
};

createApp(moviePod).mount('#app');
