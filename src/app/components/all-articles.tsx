"use client";

import { TypeOfArticleData, TypeOfArticleRate, TypeOfFetchedData, TypeOfFilters } from "@/types";
import React, { useEffect, useState } from "react";
import Article from "./article";
import SelectField from "./dynamic-select-field";
import { typesDropDown } from "@/constant";
import ExportCSV from "@/utils/export-csv";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type TypeOfPageProps = {
  data: TypeOfFetchedData;
};

const AllArticles: React.FC<TypeOfPageProps> = ({ data }) => {

  const [filteredData, setFilteredData] = useState<TypeOfFetchedData>({...data});
  const { type, buyArticles, email, password } = useSelector((state: RootState) => state.user);




  const [selectedFilteres, setSelectedFilteres] = useState<TypeOfFilters>({
    author: "",
    type: "",
  });

  useEffect(() => {
    if (selectedFilteres.author || selectedFilteres.type) {

      const filteredArticles: TypeOfArticleData[] =
        selectedFilteres.author && selectedFilteres.type
          ? data?.articles.filter(
              (el: TypeOfArticleData) =>
                el.author === selectedFilteres?.author &&
                el?.type === selectedFilteres.type
            )
          : selectedFilteres.type
          ? data?.articles.filter(
              (el: TypeOfArticleData) => el?.type === selectedFilteres?.type
            )
          : data?.articles.filter(
              (el: TypeOfArticleData) => el?.author === selectedFilteres?.author
            );


      setFilteredData({
        ...data,
        articles: filteredArticles,
      });

    } else {
        
        if(localStorage.getItem("payout")){

            setFilteredData({
                ...filteredData,
                articles: data?.articles?.map((el)=>{
                    return {
                        ...el,
                        rate: JSON.parse(localStorage.getItem("payout") as string)?.find((item:TypeOfArticleRate)=> item.id===el?.id)?.rate
                    }
                  })
    
            })
        }else setFilteredData(data);
    }
  }, [selectedFilteres]);


  useEffect(()=>{

    if(localStorage.getItem("payout")){

        setFilteredData({
            ...filteredData,
            articles: data?.articles?.map((el)=>{
                return {
                    ...el,
                    rate: JSON.parse(localStorage.getItem("payout") as string)?.find((item:TypeOfArticleRate)=> item.id===el?.id)?.rate
                }
              })

        })
    }

  },[]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    setSelectedFilteres({
      ...selectedFilteres,
      [e.target.name]: e.target.value,
    });

  };

  const handleReset = () =>{

    setSelectedFilteres({
      author: "",
      type: "",
    });

    

  }

  const handleEditRate  = (index: number, rate:number) => {
    
    const updateRate = [...filteredData?.articles];

    updateRate[index-1].rate = rate;
 

    setFilteredData({
     ...filteredData,
      articles: updateRate,
    });
    
  }

  return (
    <>
    

      <div className="flex flex-wrap items-center justify-start md:justify-end gap-4 mx-4 mt-4">
         {type==="user" && email && password && buyArticles?.length > 0  && <ExportCSV data={data?.articles}  title="Export CSV File" buyArticles={buyArticles}/>}

        <SelectField
          label={false}
          handleChange={handleChange}
          value={selectedFilteres?.author ? selectedFilteres?.author : ""}
          inputName="author"
          placeholder={"Select an author"}
          dropdown={data?.articles
            .filter((el: TypeOfArticleData) => el?.author)
            ?.map((el: TypeOfArticleData, index: number) => {
              return {
                id: index + 1,
                value: el?.author ? el?.author : "",
                label: el?.author ? el?.author : "",
              };
            })}
        />

        <SelectField
          label={false}
          handleChange={handleChange}
          value={selectedFilteres?.type ? selectedFilteres?.type : ""}
          inputName="type"
          placeholder={"Select a type"}
          dropdown={typesDropDown}
        />
       {(selectedFilteres?.author || selectedFilteres?.type)  && <button onClick={handleReset} className="text-primaryColor">Reset</button>}
      </div>

      <div className="flex flex-wrap justify-center gap-8  mx-2 md:mx-4 my-4 md:mt-8">
        {filteredData?.articles?.length>0 ? filteredData?.articles?.map((el: TypeOfArticleData, index: number) => {
          return <Article key={index} data={el} handleEditRate={handleEditRate}/>;
        }) :

        <h3>Nothing found!</h3>
        
        }
      </div>
    </>
  );
};

export default AllArticles;
