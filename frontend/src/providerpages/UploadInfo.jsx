import { useState } from "react";
import axios from "axios";
import "./UploadInfo.css";

function UploadInfo() {

    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userid"),
        experience: "",
        description: "",
        documentName: "",
        document: null
    });

    const handleChange = (event) => {

        const { name, value, files } = event.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();
         const token = localStorage.getItem("token");

        const data = new FormData();

        data.append("userId", formData.userId);
        data.append("experience", formData.experience);
        data.append("description", formData.description);
        data.append("documentName", formData.documentName);
        data.append("document", formData.document);

        axios
            .post(
                "http://localhost:8000/provider/uploadInfo",
                data,{
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data"
            }
        }
    )
            .then((res) => {

                alert(res.data.message);

                setFormData({
                    userId: localStorage.getItem("userid"),
                    experience: "",
                    description: "",
                    documentName: "",
                    document: null
                });

            })

            .catch((err) => {

                console.log(err.response.data);

            });

    };

    return (

        <div className="uploadInfoPage">

            <div className="uploadContainer">

                {/* Heading */}
                <div className="uploadTitle">

                    <h1>
                        Provider Information
                    </h1>

                    <p>
                        Upload your professional details and verification documents
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="uploadForm"
                >

                    {/* Experience */}
                    <div className="inputGroup">

                        <label>
                            Experience
                        </label>

                        <input
                            type="text"
                            name="experience"
                            placeholder="2 Years Experience"
                            value={formData.experience}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Document Name */}
                    <div className="inputGroup">

                        <label>
                            Document Name
                        </label>

                        <input
                            type="text"
                            name="documentName"
                            placeholder="Aadhar Card / PAN Card"
                            value={formData.documentName}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Description */}
                    <div className="inputGroup fullWidth">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter your professional description"
                            value={formData.description}
                            onChange={handleChange}
                        >

                        </textarea>

                    </div>

                    {/* Upload Box */}
                    <div className="inputGroup fullWidth">

                        <label>
                            Upload Document
                        </label>

                        <div className="uploadBox">

                            <input
                                type="file"
                                name="document"
                                onChange={handleChange}
                            />

                            <p>
                                Upload verification document here
                            </p>

                            {
                                formData.document && (

                                    <p style={{ marginTop: "12px" }}>
                                        {formData.document.name}
                                    </p>

                                )
                            }

                        </div>

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submitBtn"
                    >

                        Upload Information

                    </button>

                </form>

            </div>

        </div>

    );
}

export default UploadInfo;