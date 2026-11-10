import { useContext } from "react";
import Productcontext from "../contextAPI/ProductContext";


function ProductDetail (){
    const {productData} = useContext(Productcontext)
    return(
        <div>
            {
                productData.map((v) => {
                    return(
                        <div key={v.id}>
                            <img src={v.img} alt={v.name}  width="400"/>
                            <h1>{v.name}</h1>
                            <h2>{v.price}</h2>
                            <p>{v.description}</p>

                        </div>
                    )
                })
            }
            
        </div>
    )


}
export default ProductDetail;