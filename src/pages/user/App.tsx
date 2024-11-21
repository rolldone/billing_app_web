import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./Register";
import RecoverPassword from "./RecoverPassword";
import RegisterConfirmation from "./RegisterConfirmation";
import Setup from "./Setup";
import Dashboard from "./Dashboard";
import '@tabler/core/dist/css/tabler.min.css';

export default function App(props: any) {

    return <>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/confirmation" element={<RegisterConfirmation />} />
            <Route path="/recovery-password" element={<RecoverPassword />} />
            <Route path="/setup" element={<Setup></Setup>} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
    </>
}