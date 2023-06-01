import './DetailsService.scss'

const colStyle = `
    display: flex;
    flex-direction: column;
`

export default function DetailsService({data, role}) {
    
    return (
        <div className="serviceCard" >
            <div className="col" style={{flex: '2'}}>
                <div className="service-name">
                    {data.name}
                </div>
                
                <div className="service-description">
                    {data.description}
                </div>

                <div className="service-note">
                    {data.note}
                </div>
            </div>

            <div className="col" style={{flex: '1'}}>
                <table>
                    <thead>
                        <th></th>
                        <th></th>
                        <th>価格</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {data.times}
                            </td>
                            <td>
                                {data.customersCount}
                            </td>
                            <td>
                                {data.price}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <div className="row">
                    <div>
                        価格
                    </div>
                </div>
                <div className="row">
                    <div className="service-time">
                        
                    </div>
                    <div className="service-customersCount">
                        {data.customersCount}
                    </div>
                    <div className="service-price">
                        
                    </div>
                </div> */}
            </div>
            
        </div>
    )
}