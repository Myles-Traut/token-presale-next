import { useState } from "react";

import BuyTokens from "@/components/BuyTokens";

type Props = {
    counter: number
    add: Function
}

export default function Buy({ counter, add }: Props) {
    return <BuyTokens counter={counter} add={add}/>
}