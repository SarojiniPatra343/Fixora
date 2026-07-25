import { useState } from "react";

function ViewSubService({openModal,subServiceData,closeModal}){
    const [formData,setFormData]=useState({
        subServiceName:'',
        price:'',
        duration:'',
        description:''
    })
    if (!openModal || !subServiceData) return null;
    return(
        <>
            <button onClick={closeModal}>Close</button>
            <form className="serviceForm">

                    <div className="formGlow"></div>

                    {/* SUB SERVICE */}
                    <div className="inputGroup">

                        <label>Sub Service Name</label>

                        <input
                            type="text"
                            name="subServiceName"
                            placeholder="Enter Sub Service Name"
                            value={subServiceData.subServiceName}
                        />

                    </div>

                    {/* ROW */}
                    <div className="row">

                        <div className="inputGroup">

                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                placeholder="₹ 999"
                                value={subServiceData.price}
                            />

                        </div>

                        <div className="inputGroup">

                            <label>Duration</label>

                            <input
                                type="text"
                                name="duration"
                                placeholder="2 Hours"
                                value={subServiceData.duration}
                            />

                        </div>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="inputGroup">

                        <label>Description</label>

                        <textarea
                            name="description"
                            placeholder="Write detailed service description..."
                            value={subServiceData.description}
                        ></textarea>

                    </div>

                    {/* BUTTON */}
                    <button type="submit" className="submitBtn">
                        Update Sub-Service
                    </button>

                </form>
        </>
    )
}
export default ViewSubService;