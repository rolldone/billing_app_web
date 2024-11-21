import { useNavigate, useParams } from "react-router-dom";

export default function HookFunction() {
    const params = useParams();
    const navigation = useNavigate();
    window.navigation = navigation;
    window.params = params;
    return <></>
}