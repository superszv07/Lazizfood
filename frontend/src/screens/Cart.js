import React from 'react'
import { toast } from 'react-toastify';

import { useCart, useDispatchCart } from '../components/ContexReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-success'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
  let userEmail = localStorage.getItem("userEmail");
  let response = await fetch("http://localhost:5000/api/orderData", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString()
    })
  });

  if (response.status === 200) {
    dispatch({ type: "DROP" });
    toast.success("Thank you! Your order has been placed successfully.");
  } else {
    toast.error("Something went wrong! Please try again.");
  }
};
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-dark table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-white">
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={food.img}
                    alt="food"
                    style={{ height: "5rem", width: "5rem" }}
                  />
                </td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <i
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      X
                    </i>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div className="text-center my-4">
          <button
            className="btn bg-success mt-3 px-5 py-2 text-white"
            onClick={handleCheckOut}
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  );
}



// import React from 'react'
// import { toast } from 'react-toastify';

// import { useCart, useDispatchCart } from '../components/ContexReducer';

// export default function Cart() {
//   let data = useCart();
//   let dispatch = useDispatchCart();
//   if (data.length === 0) {
//     return (
//       <div>
//         <div className='m-5 w-100 text-center fs-3 text-success'>The Cart is Empty!</div>
//       </div>
//     )
//   }
//   // const handleRemove = (index)=>{
//   //   console.log(index)
//   //   dispatch({type:"REMOVE",index:index})
//   // }

//   const handleCheckOut = async () => {
//   const totalPrice = data.reduce((total, food) => total + food.price, 0);
//   const userEmail = localStorage.getItem("userEmail");

//   const options = {
//     key: "rzp_test_YourApiKey", // Replace with your Razorpay Test API key
//     amount: totalPrice * 100, // Razorpay accepts amount in paise
//     currency: "INR",
//     name: "LAZiZFOOD",
//     description: "Food Order Payment",
//     image: "/logo192.png", // Optional, add your logo
//     handler: async function (response) {
//       // After successful payment
//       let res = await fetch("http://localhost:5000/api/orderData", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           order_data: data,
//           email: userEmail,
//           order_date: new Date().toDateString(),
//           payment_id: response.razorpay_payment_id
//         })
//       });

//       if (res.status === 200) {
//         dispatch({ type: "DROP" });
//         toast.success("Payment successful! Your order has been placed.");
//       } else {
//         toast.error("Order failed! Please contact support.");
//       }
//     },
//     prefill: {
//       email: userEmail,
//     },
//     theme: {
//       color: "#0f5132"
//     }
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };

//   let totalPrice = data.reduce((total, food) => total + food.price, 0)
//   return (
//     <div>
//       <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
//         <table className='table table-dark table-hover '>
//           <thead className=' text-success fs-4'>
//             <tr>
//               <th scope='col' >#</th>
//               <th scope='col' >Image</th>
//               <th scope='col' >Name</th>
//               <th scope='col' >Quantity</th>
//               <th scope='col' >Option</th>
//               <th scope='col' >Amount</th>
//               <th scope='col' ></th>
//             </tr>
//           </thead>
//           <tbody className='text-white'>
//             {data.map((food, index) => (
//               <tr>
//                 <th scope='row' >{index + 1}</th>
//                 <td><img src={food.img} alt="food" style={{ height: '5rem', width: '5rem' }} /></td>
//                 <td >{food.name}</td>
//                 <td>{food.qty}</td>
//                 <td>{food.size}</td>
//                 <td>{food.price}</td>
//                 <td><button type='button' className='btn p-0'><i className="fa fa-trash text-danger" aria-hidden="true" onClick={()=>{dispatch({type:"REMOVE",index:index})}}>X</i></button> </td>
//                 </tr>
//                 ))}
//           </tbody>
//         </table>
//         <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
//         <div>
//           <button className='btn bg-success mt-5 text-white ' onClick={handleCheckOut}  > Check Out </button>
//         </div>
//       </div>
//     </div>
//   )
// }
