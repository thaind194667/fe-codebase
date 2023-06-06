
export default function SvgIcon({src, width, height, name, type, alt, className}) {
    
    const url = src ? src : `/${name}.${type ? type : 'svg'}`;

    return (
        // <div >
        <img className={className} src={url} alt={alt} style={{display: 'flex', width, height}}/>
        // </div>
    )
}