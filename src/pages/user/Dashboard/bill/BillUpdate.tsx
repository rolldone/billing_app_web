import { useMemo, useState } from "react";
import { BillNewClass, PropType, StateType } from "./BillNew";

export class BillUpdateClass extends BillNewClass {

}

export default function BillUpdate(props: PropType) {

    let methods = useMemo(() => new BillUpdateClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {},
        form_error: {},
        member_datas: [],
        project_datas: [],
        show_select_member_modal: false
    }), props);

    return methods.render()
}