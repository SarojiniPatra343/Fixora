import { Route, Routes } from "react-router-dom";

import ProviderLanding from "./ProviderLanding";
import ProviderHeader from "./ProviderHeader";
import UploadInfo from "./UploadInfo";
import CreateSubService from "./CreateSubService";
import AllSubService from "./AllSubService";
import EditSubService from "./EditSubService";
import ProviderOrders from "./ProviderOrders";

function ProviderLayout() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "#f5f7fb"
        }}>

            <ProviderHeader />

            <div style={{ width: "100%", padding: "20px" }}>

                <Routes>

                    {/* ✅ default page */}
                    <Route path="landing" element={<ProviderLanding />} />

                    {/* ✅ IMPORTANT: remove /provider */}
                    <Route path="uploadInfo" element={<UploadInfo />} />

                    <Route path="createSubservice" element={<CreateSubService />} />

                    <Route path="allSubService" element={<AllSubService />} />

                    <Route path="edit-subservice/:id" element={<EditSubService />} /> 

                    <Route path="orders" element={<ProviderOrders />} />

                </Routes>

            </div>

        </div>
    );
}

export default ProviderLayout;