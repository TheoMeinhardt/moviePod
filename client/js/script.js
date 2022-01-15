<<<<<<< HEAD
<<<<<<< HEAD
const { createApp } = Vue;

var moviePod = ({
    data() {
        return{
            res: "",  
            movieSearch: "",  
        };
    },
    methods: {
        async searchMovie(){
            let searchTitle;
            if(this.movieSearch.includes(" ")){
                searchTitle = this.movieSearch.replace(/ /g,"+");
            }
            let response = await axios.get(`http://localhost:3000/getmovie/${searchTitle}`);
            this.res = response.data;
        }
    }
})

createApp(moviePod).mount('#app');
=======
>>>>>>> parent of b4197b6 (Movie Search implemented)
=======
>>>>>>> parent of b4197b6 (Movie Search implemented)
