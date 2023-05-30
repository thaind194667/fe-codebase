
export default function SvgIcon({src, width, height, name, type, alt}) {
    
    const url = src ? src : `/${name}.${type ? type : 'svg'}`;

    return (
        <img src={url} alt={alt} style={{display: 'flex', width, height}}/>
    )
}