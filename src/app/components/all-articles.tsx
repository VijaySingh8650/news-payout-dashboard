"use client";

import { TypeOfArticleData, TypeOfFetchedData, TypeOfFilters } from "@/types";
import React, { useEffect, useState } from "react";
import Article from "./article";
import SelectField from "./dynamic-select-field";
import { typesDropDown } from "@/constant";

type TypeOfPageProps = {
  data: TypeOfFetchedData;
};

const AllArticles: React.FC<TypeOfPageProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<TypeOfFetchedData>(data);
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
      setFilteredData(data);
    }
  }, [selectedFilteres]);

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

  return (
    <>

      <div className="flex flex-wrap items-center justify-start md:justify-end gap-4 mx-4 mt-4">
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
          return <Article key={index} data={el} />;
        }) :

        <h3>Nothing found!</h3>
        
        }
      </div>
    </>
  );
};

export default AllArticles;
