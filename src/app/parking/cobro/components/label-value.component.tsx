export default function LabelValueComponent(props: {
    label:string,
    value:string,
    display?: "col" | "row"
}) {
    return(
        <div className={`flex flex-${props.display || "row"} justify-between`}>
            <small>{props.label}</small>
            <strong>{props.value}</strong>
        </div>
    )
}