import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
 
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search,setSeacrh] = useState('')

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json(); 
      
    setFoodItems(response[0]);
    setFoodCat(response[1]);    
  }
  useEffect(() => {loadFoodItems()}, [])

  return (
    <div className="bg-dark text-white">
      <div>
        <Navbar />
        </div>
      <div>  
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

       <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{zIndex:"10",top:"40px"}}>
        <div className="d-flex justify-content-center"> 
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSeacrh(e.target.value)}}/>
       {/* <button className="btn btn-outline-success text-white" type="submit" onClick={()=>{setSeacrh("")}}></button>  */}
    </div>
    </div>
    <div className="carousel-item active" >
      <img src="https://img.freepik.com/free-photo/flat-lay-delicious-brazilian-food-arrangement_23-2148739218.jpg?ga=GA1.1.2038553141.1723998413&semt=ais_hybrid" className="d-block w-100" style={{filter:"brightness(30%)",height:"650px"}} alt="..."/>
    </div>
    <div className="carousel-item" >
      <img src="https://media.istockphoto.com/id/520410807/photo/cheeseburger.webp?a=1&b=1&s=612x612&w=0&k=20&c=z5Xl8dB05iAj7FomxslPAtio6qTn4RH6CX2qR5dA5YM=" className="d-block w-100" style={{filter:"brightness(30%)",height:"650px"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/premium-photo/assorted-indian-foods-mughal-chicken-biryanichicken-manchuriankaju-biryanichicken-dum-biryani-egg-biryani-wooden-background-dishes-appetizers-indian-cuisine_726363-356.jpg?w=740" className="d-block w-100" style={{filter:"brightness(30%)",height:"650px"}} alt="..."/>
    </div>
    <div className="carousel-item active" >
      <img src="https://img.freepik.com/premium-photo/traditional-hyderabadi-vegetable-veg-dum-biryani-with-mixed-veggies-served-with-curry-selective-focus_726363-18.jpg?ga=GA1.1.2038553141.1723998413&semt=ais_hybrid" className="d-block w-100" style={{filter:"brightness(30%)",height:"650px"}} alt="..."/>
    </div>
    <div className="carousel-item" >
      <img src="https://img.freepik.com/free-photo/top-view-chicken-pizza-with-yellow-cherry-tomatoes-bell-pepper-board_141793-3972.jpg?ga=GA1.1.2038553141.1723998413&semt=ais_hybrid" className="d-block w-100" style={{filter:"brightness(30%)",height:"650px"}} alt="..."/>
    </div>
    <div className="carousel-item" >
      <img src="https://img.freepik.com/free-photo/assorted-coffee-cups-marble-background_53876-121563.jpg?ga=GA1.1.2038553141.1723998413&semt=ais_hybrid" className="d-block w-100" style={{filter:"brightness(30%)",height:"650px"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
</div>
<div className="container justify-content-center">
  {
    foodCat.length > 0
      ? foodCat.map((data, /*index*/) => { // Ensure data.id exists, fallback to index if necessary
          return (
            <div  className="row mb-3 g-1 mx-3 ">
              <div key={data.id /*|| index*/} className="fs-3 ">
                {data.CategoryName}
              </div>
              <hr
                  id="hr-success"
                  style={{
                   height: "4px",
                   backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                }}
              />
              {
                foodItems.length > 0
                  ? foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                      return(
                       <div key={filterItems.id} className="col-12 col-sm-8 col-md-6 col-lg-3 d-flex justify-content-center">
                        <Cards
                         className="card p-2 shadow-sm hover-shadow-lg transition"
                          // foodName={filterItems.name}
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                          // ImgSrc={filterItems.img}
                          // dis={filterItems.description}
                        />
                      </div>
                      )
                      })
                  : <div key={`no-data-${data.id}`}>No Such Data</div> // Unique key for fallback message
              }
            </div>
          );
        })
      : ""
  }
</div>
      <div className="  bg-white text-black  "><Footer /></div>
    
    </div>
  )
}
