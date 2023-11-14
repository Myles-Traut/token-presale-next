import { MouseEventHandler } from "react";

export default function Button(props: {
    function: MouseEventHandler<HTMLButtonElement> | undefined; title: string}) 
    {
    return (
        <button
          className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
          onClick={props.function}
        >
            {props.title}
        </button>
    )
}