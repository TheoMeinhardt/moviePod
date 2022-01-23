const { createApp } = Vue;
var mymovies = {
  data() {
    return {
      movies: [],
      loggedInUser: '',
      movieObjectList: []
    };
  },
  async created() {
    try {
      this.loggedInUser = document.cookie
        .split('; ')
        .find((row) => row.startsWith('loggedInUser='))
        .split('=')[1];
    } catch {
      console.error(
        `Kein User angemeldet. Cookies length: ${document.cookie.length}`
      );
    }

    try {
      let res = await axios.get(
        `http://localhost:3000/getPersonalMovieList/${this.loggedInUser}`
      );
      console.log(res.data)
      this.movies = res.data;
      for (const iterator of this.movies) {
        const res = await axios.get(`http://localhost:3000/getMovie/${iterator.movietitle}`);
        console.log(res);
        this.movieObjectList.push(res.data)
      };
      console.log(this.movieObjectList);
      console.log(this.movieObjectList[0].Title)
    } 
    catch {
      if(this.loggedInUser == ''){
        console.error('Kein User angemeldet');
      }
      else{
        console.error('MovieGet fehlgeschlagen');
      }
    }
    const res = await axios.delete(`http://localhost:3000/deletemoviefrompersonallist`, {
        username: "QinX",
        movieTitle: "Chocolat",
      });
  },
  methods: {
    async removeFromList(title) {
      console.log('yes')
      console.log(this.loggedInUser)
      console.log(title)
      const res = await axios.delete(`http://localhost:3000/deletemoviefrompersonallist`, {
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          username: this.loggedInUser,
          movieTitle: title
        }
      });
      console.log(res);
    },
  },
};

createApp(mymovies).mount('#app');