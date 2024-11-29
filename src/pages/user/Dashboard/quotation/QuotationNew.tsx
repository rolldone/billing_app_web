import { useMemo, useState } from "react"
import BaseStateClass from "../../components/helper/BaseStateClass"

export type StateType = {

}

export type PropType = {

}

export class CostNewClass extends BaseStateClass<StateType,PropType>{

    render(){
        return <></>
    }    
}

export default function CostNew(props:any){
    let methods = useMemo(()=>new CostNewClass(),[]);

    methods.defineState(useState<StateType>({}),props);

    return methods.render()
}