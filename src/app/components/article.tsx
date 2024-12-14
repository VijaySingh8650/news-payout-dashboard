"use client";

import { RootState } from "@/store";
import { addArticleToBuy } from "@/store/userSlice/user-slice";
import { TypeOfArticleData, TypeOfArticleRate } from "@/types";
import { convertDate } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

type TypeOfPageProps = {
  data: TypeOfArticleData;
  handleEditRate: (index: number, rate: number) => void;
};

const Article: React.FC<TypeOfPageProps> = ({ data, handleEditRate }) => {
  const { type, buyArticles, email, password } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  const [rateValue, setRateValue] = useState<number>(0);
  const [editable, setEditable] = useState<boolean>(false);
  const router = useRouter();

  const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRateValue(Number(e.target.value));
  };

  const handleSaveRate = () => {

    handleEditRate(data.id, rateValue);
    const getPayout = JSON.parse(localStorage.getItem("payout") as string) || [];
    const payoutIndex = getPayout.findIndex((el: TypeOfArticleRate) => el.id === data?.id);
    if(payoutIndex!==-1){
        getPayout[payoutIndex] = { id: data.id, rate: rateValue };
    }else{
        getPayout.push({ id: data.id, rate: rateValue });
    }
    
    localStorage.setItem('payout', JSON.stringify(getPayout));
   
    toast.success("Rate saved successfully!");
    setEditable(false);
  };


  const handlePayout = () => {

    if(type === "admin"){
        setEditable(true);
    }else{

        const checkArticleBought = JSON.parse(localStorage.getItem("buyArticles") as string) || [];

        if(checkArticleBought.find((el: TypeOfArticleRate) => el.id === data?.id)){
            toast.success("Keep reading!");
            return;
        }
        else if(email && password){

            dispatch(addArticleToBuy({id:data?.id, rate:data?.rate}))

        }else{
            
            router.push("/login");

        }

    }
  }



  return (
    <div className="p-4 shadow-cardShadow rounded-lg w-[300px] md:w-[400px] relative">
        <Toaster position="top-center" duration={3000} />

      <div className="h-[200px] w-full md:h-[300px] relative">
        {data?.urlToImage && (
          <Image
            src={data?.urlToImage}
            alt={data?.urlToImage}
            fill
            objectFit="cover"
          />
        )}
      </div>

      <h2 className="mt-2 text-primaryColor">{data?.title}</h2>
      <h2
        className="mt-2"
        style={{
          filter:
            type === "admin" ||
            buyArticles
              ?.map((el: TypeOfArticleRate) => el.id)
              .includes(data?.id)
              ? ""
              : "blur(5px)",
        }}
      >
        {data?.content}
      </h2>
      <div className="mt-2 flex justify-between items-center">
        <p>By - {data?.author}</p>
        <p>{data?.publishedAt ? convertDate(data?.publishedAt) : ""}</p>
      </div>

      <div className="flex justify-end mt-2 absolute top-0 right-0">
        {!editable ? (
          <button
            onClick={handlePayout}
            className="bg-primaryColor text-secondaryColor p-2 rounded-lg"
          >
            {type === "admin"
              ? `Edit Rate ₹ ${data?.rate ? data?.rate : "0.00"}/-`
              : buyArticles
                  ?.map((el: TypeOfArticleRate) => el.id)
                  .includes(data?.id)
              ? "Paid"
              : `Buy at ₹${data?.rate ? data?.rate : "0.00"}/-`}
          </button>
        ) : (
          <>
            <input
              className="w-[70px] p-1 border-2 border-primaryColor"
              name="rateValue"
              type="number"
              value={rateValue || data?.rate}
              onChange={handleChangeRate}
            />
            <button onClick={handleSaveRate} className="bg-primaryColor text-secondaryColor p-2">

                Save

            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
