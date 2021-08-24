import axios from 'axios'
export const getMovies= async(type,setStore)=>{
    console.log("iam in")
    let query
    switch(type){
      case "newMovies":
        query="InTheaters"
        break;
      case "comingSoon":
        query="ComingSoon"
        break;
      case "top250Movies":
        query="top250movies"
          break;
      case "top250TV":
        query="top250TVs"
          break;
      case "mostPopularMovies":
        query="MostPopularMovies"
          break;
      case "mostPopularTVs":
        query="MostPopularTVs"
          break;
    }
    //k_u4bd5sfo
    //k_4h2wqyjq
    const res=await axios.get(`https://imdb-api.com/en/API/${query}/k_u4bd5sfo`)
    console.log(res,type)
    await setStore({[type]: res.data.items})
  }