//  import { useState } from 'react';

// import { isValidElement, useEffect, useMemo, useState } from "react"
import { useState, useEffect } from "react";
import { data } from "react-router-dom"
import "./App.css"
import Searchnavbar from './Searchnavbar'
import Approuter from "./router";
import Todotest from "./pages/todotest";

// import './App.css'

// import Approuter from './router'
// import { Descriptions, Image } from 'antd';
// import Productcontext from './contextAPI/ProductContext';



// function App() {
//  const [productData , setProductData] = useState([
//   {
//     id : 1,
//     name : "airBuds",
//     description : "world best earbuda",
//     Image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelYZAfSzUCSw3r66C-SbHEyxcVSWblLhHCXYJUEoCSg&s" 
//   },
//    {
//     id : 2,
//     name : "IPhone",
//     description : "world best earbuda",
//     Image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGXpltmrGNaIiHGSNe3A3UN0hSjoV5REXOFIU92oLEEA&s=10" 
//   },
//    {
//     id : 3,
//     name : "Shoes",
//     description : "world best earbuda",
//     Image : "" 
//   }
//  ])

//   return( 
//   <Productcontext.Provider value={{productData,setProductData}}>
//   <Approuter/>
//   </Productcontext.Provider>

//   )
// }

// export default App;


// function App() {
//     const [count, setCount] = useState(0)
//     const [name, setname] = useState("")

//     const doubleCount = useMemo(() => {
//         console.log("calculating chal rahi hai");
//         return count * 2

//     }, [count])
//     let arr = [
//         {
//             name: " Shehzad",
//             city: "Karachi"
//         },
//         {
//             name: "Ismail",
//             city: "islamabad"
//         },
//         {
//             name: "Sameer",
//             city: "Lahore"
//         },
//         {
//             name: "Sabir",
//             city: "Multan"
//         },
//         {
//             name: "Hammad",
//             city: "Faislabad"
//         },
//         {
//             name: "Faraz",
//             city: "Rawalpindi",
//         },
//         {
//             name: " Sajjad",
//             city: "Peshawar ",
//         },
//         {
//             name: "Asim",
//             city: "Peshawar",
//         },
//         {
//             name: "Imdad",
//             city: "Peshawar"
//         },
//         {
//             name: "Usama",
//             city: "Peshawar"
//         },


//     ]


//     let Result = arr.filter((elem, i, arr) => {
//         return elem.city === "Peshawar";
//     })
//     console.log(Result);




//     return (
//         <div>
//             {

//             }
//         </div>
//     )



// }


// export default App;





// function App() {

//     const [product, setProduct] = useState([])
//     const [categoryList, setCategoryList] = useState([])
//     const [category, setCategory] = useState("")

//     useEffect(() => {
//         getAllProduct()
//         getCategoryList()
//         // getProductByCategory()
//     }, [])

//     useEffect(() => {
//         if (category) {
//             getProductByCategory(category)
//         } else {
//             getAllProduct()
//         }
//     }, [category])

//     const getAllProduct = () => {
//         fetch('https://fakestoreapi.com/products')
//             .then((res) => res.json())
//             .then((data) => {
//                 setProduct(data)
//             })
//     }


//     const getCategoryList = () => {
//         fetch('https://fakestoreapi.com/products/categories')
//             .then((res) => res.json())
//             .then((data) => {
//                 setCategoryList(data)
//             })
//     }

//     const getProductByCategory = ( cate ) => {
//         fetch(`https://fakestoreapi.com/products/category/${cate}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setProduct(data)
//             })
//     }

//     return (

//         <div>
//             <Searchnavbar categoryList={categoryList} setCategory={setCategory}  />

//             <div className="container">
//                 {
//                     product.map((data, i) => {
//                         // console.log(data.title);
//                         const shortTitle = data.title.slice(0, 20)

//                         const shortDesc = data.description.slice(0, 50)

//                         return (
//                             <div className="card" key={data.id}>
//                                 <img src={data.image} alt={data.title} />
//                                 <p>{shortTitle}</p>
//                                 <p>{shortDesc}</p>
//                                 <h4>{data.price}</h4>

//                             </div>
//                         )

//                     })
//                 }
//             </div>

//         </div>
//     )
// }


// function App() {

//     let promise = new Promise((resolve, reject) => {
//         let num = 2 + 1
//         if (num === 2) {
//             resolve("success")
//         } else {
//             reject("Failed")
//         }
//     })

//     promise.then((res) => console.log(res))
//         .catch((err) => console.log(err))

function App() {

    // let promise = new Promise((resolve, reject) => {
    //     let num = 5
    //     if (num === 5) {
    //         resolve("success")
    //     } else {
    //         reject("failed")
    //     }
    // })

    // promise.then((res) => console.log(res))
    //     .catch((err) => console.log(err))

    return (
        
      <Todotest/>
    )

}

export default App

// ea9fde544bb01e820961698c5caf7d64



// export default App;







// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");

//   const API_KEY = "ea9fde544bb01e820961698c5caf7d64";

//   const searchWeather = async () => {
//     try {
//       setError("");

//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message);
//         setWeather(null);
//         return;
//       }

//       setWeather(data);
//     } catch (error) {
//       setError("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <h1>Weather App</h1>

//       <input
//         type="text"
//         placeholder="Enter city"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />

//       <button onClick={searchWeather}>
//         Search
//       </button>

//       {error && <p>{error}</p>}

//       {weather && (
//         <div>
//           <h2>{weather.name}</h2>

//           <h3>{weather.main.temp}°C</h3>

//           <p>{weather.weather[0].description}</p>

//           <p>Humidity: {weather.main.humidity}%</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
























