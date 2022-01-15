const { createApp } = Vue;

var moviePod = ({
    data() {
        return{
            movie: '',
            searchTitle: '',
        };
    },
    methods: {
        async getMovie(){
            this.searchTitle.replace(/\s/g, "+");
			const {data} = await axios.get(`http://localhost:3000/getMovie/${this.searchTitle}`);
            console.log(data);
            this.movie = data;
        }
    }
})

createApp(moviePod).mount('#app');
