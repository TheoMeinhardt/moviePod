const { createApp } = Vue;
var mymovies = {
  data() {
    return {
      movies: [],
      loggedInUser: document.cookie
        .split('; ')
        .find((row) => row.startsWith('loggedInUser='))
        .split('=')[1],
    };
  },
  async created() {
    const res = await axios.get(
      `http://localhost:3000/getPersonalMovieList/${loggedInUser}`
    );
    this.movies = res.data;
  },
  methods: {
    async getPersonalMovieList() {},
  },
};

createApp(mymovies).mount('#app');
