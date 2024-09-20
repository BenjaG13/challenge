import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";  

const Piechart = ({ updateChart }) => {
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  

  const fetchProductDistribution = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/V1/categories/product-distribution");
      
      const categories = response.data;
      
      // Extraer los nombres de las categorías y el número de productos
      const categoryNames = categories.map(category => category.name);
      const productTotals = categories.map(category => category.total);
      
      setSubjects(categoryNames);
      setMarks(productTotals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductDistribution();
  }, []);

  useEffect(() => {
    fetchProductDistribution();
  }, [updateChart]);

  return (
      <div className="container-fluid mb-3">
        <Chart
          width={380}
          height={400}
          options={{
            title: { text: "Product Distribution by Category" },
            noData: { text: "No Data Available" },
            labels: subjects,  
          }}
          series={marks}  
          type="pie"
        />
      </div>

  );
}

export default Piechart;
