import { Base } from "./Base"

interface UserProps {
    assetId: string
    name: string
    serialNo: string
    assignDate: Date
}

export class User implements Base, UserProps{
    assetId: string
    name: string
    serialNo: string
    assignDate: Date  

    constructor(props: UserProps){
        this.assetId = props.assetId
        this.name = props.name
        this.serialNo = props.serialNo
        this.assignDate = props.assignDate
        
    }
}
