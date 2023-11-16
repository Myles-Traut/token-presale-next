import FetchBalance from "./FetchBalance"

type Props = {
    address: `0x${string}` | undefined
}

export default function TokenBalance({ address }: Props) {
    return(
        <div>
            <FetchBalance address={address}/>
        </div>
    )
      
}