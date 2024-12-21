import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Bill from "./bill/Bill";

export default function App(props: any) {

    return <>
        <Routes>
            <Route path="/bill/:id" element={<Bill />} />

        </Routes>
    </>
}