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
      // this.movies.forEach(element => {
      //   const { data } = await axios.get(
      //     `http://localhost:3000/getMovie/${element.movietitle}`
      //   );
      //   console.log(data);
      //   this.movie = data;
      //   this.movieTitle = data.Title
      //   element.movietitle //--> damit film getten für die Ausgabe.
    } 
    catch {
      if(this.loggedInUser == ''){
        console.error('Kein User angemeldet');
      }
      else{
        console.error('MovieGet fehlgeschlagen');
      }
    }
  },
  methods: {
    async getPersonalMovieList() {},
  },
};

createApp(mymovies).mount('#app');