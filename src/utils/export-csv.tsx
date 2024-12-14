
import { TypeOfArticleData, TypeOfArticleRate } from "@/types";
import React from "react";


type TypeOfPageProps = {

  title: string;
  data: TypeOfArticleData[];
  buyArticles: TypeOfArticleRate[];

};

const ExportCSV: React.FC<TypeOfPageProps> = ({ title, data, buyArticles }) => {


    const downloadCSV = async () => {
        const headers: string[] = ["Author", "Type", "Headline", "Price"]; // Specify your headers here
      
        // Initialize the CSV rows array
        const csvRows: string[][] = [];
      
        // Map over the data to create rows
        data?.forEach((el) => {
          const findIndex = buyArticles.findIndex(
            (item: TypeOfArticleRate) => item.id === el?.id
          );
      
          if (findIndex !== -1) {
            csvRows.push([
              el.author || "", // Author
              el.type || "",   // Type
              el.title || "",  // Headline
              buyArticles[findIndex].rate?.toString() || "", // Price
            ]);
          }
        });
      
        // Create the CSV string
        const csvString = [
          headers.join(","), // Join headers as a single row
          ...csvRows.map((row) => row.join(",")), // Map each row to a CSV string
        ].join("\n");
      
        // Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: "text/csv" });
      
        // Generate a download link and initiate the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "download.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      

  return (

      <button
        onClick={downloadCSV}
        className="bg-primaryColor text-white py-2 px-4 rounded-lg shadow-lg text-sm"
      >
        {title}
      </button>
 
  );
};

export default ExportCSV;
