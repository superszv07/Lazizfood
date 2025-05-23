import React, {useEffect, useRef, useState} from 'react'
import { useDispatchCart,useCart } from './ContexReducer';

export default function Cards(props) {
  let data=useCart();
  let dispatch = useDispatchCart();
  const priceRef =useRef();
  let options = props.options;
  let priceOptions  = Object.keys(options)
   
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart  = async()=>{
    let food =[]
    for(const item of data)
    {
      if(item.id === props.foodItem._id)
      {
        
        food =item;
        break;
      }
    }
    if(food.length !== 0)
    {
      if(food.size === size)
      {
        await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice,qty:qty})
        return 
      }
      else if (food.size !== size)
      {
        await dispatch({type:"ADD",  id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.foodItem.img}) 
        return 
      }
      return 
    }
    await dispatch({type:"ADD",  id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.foodItem.img})
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  

  return (
    <div>
        <div className=" mt-3 bg-black text-white hover-effect " style={{width:"16rem", maxHeight:"400px",border:"1px solid white", background: "linear-gradient(45deg,hsla(168, 85%, 52%, 0.5),hsla(263, 88%, 45%, 0.5) 100%)"}}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}} />
        <div className="card-body" >
          <h5 className='card-title '>{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description.slice(0,65)+"..."}
          </p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6),(e,i)=>{
                    return(
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )
                })}
            </select>
            <select  className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
            </select>
            <div className="d-inline h-100 fs-5">
            ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
        </div>
    </div>
  )
}
