
export default function SvgIcon(props) {
    
    const url = `src/assets/${props.name}.${props.type ? props.type : 'svg'}`


    return (
        <img src={url} alt='icon' style={{width: props.length, height: props.length}}/>
    )
}