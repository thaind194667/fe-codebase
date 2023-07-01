import './SvgIcon.scss'

export default function SvgIcon({src, width, height, name, type, alt, className, round, backgroundColor, padding, onClick}) {
    
    const url = src ? src : `/${name}.${type ? type : 'svg'}`;

    return (
        <div className={`svg-icon${className ? ' ' + className : ''}${round ? ' round' : ''}`} 
            onClick={onClick}
            style={{
                    width, 
                    height,
                    backgroundColor,
                }}
            >
            <img  src={url} alt={alt} style={{
                width: `calc(100% - ${padding} * 2)`,
                height: `calc(100% - ${padding} * 2)`
            }}/>
        </div>
    )
}