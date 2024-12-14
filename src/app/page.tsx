
import Navbar from "./components/navbar";
import AllArticles from "./components/all-articles";
import { TypeOfArticleData } from "@/types";


export default async function Home() {

  const response =  await fetch(`https://newsapi.org/v2/top-headlines?q=india&apikey=${process.env.NEXT_APP_API_KEY}`);
  const data = await response.json();



  if(data?.articles?.length){

    data.articles = data?.articles?.map((el:TypeOfArticleData, index:number)=>{

      if(index%2===0){

        return {
          ...el,
          id: index+1,
          type: "News"
        }

      }
      return {
       ...el,
        id: index+1,
        type: "Blog"
      }

    })

  }

  

  return (
    <>
      <Navbar/>

      {data?.articles?.length > 0 && <AllArticles data={data}/>}

      
      
    </>
  );
}
