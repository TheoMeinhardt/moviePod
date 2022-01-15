//diewalds js :)
const appear = document.querySelector(".appear");
const cb = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview");
    } else {
      entry.target.classList.remove("inview");
    }
  });
};
const io = new IntersectionObserver(cb);
io.observe(appear);
//end


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
