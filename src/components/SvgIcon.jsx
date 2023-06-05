
export default function SvgIcon({src, width, height, name, type, alt, className}) {
    
    const url = src ? src : `/${name}.${type ? type : 'svg'}`;

    return (
        <div className={className}>
            <img  src={url} alt={alt} style={{display: 'flex', width, height}}/>
        </div>
    )
}