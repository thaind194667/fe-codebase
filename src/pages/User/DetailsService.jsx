import './DetailsService.scss'

export default function DetailsService({ data, role, schedule, edit }) {

    const serviceSchedule = () => {
        schedule();
    }

    const serviceEdit = () => {
        edit();
    }

    return (
        <div className="service-info row">

            <div className="col" style={{ flex: '2.5' }}>
                <div className="service-name center-item">
                    {data.name}
                </div>


                <div className="row" style={{gap: '15px'}}>
                    <div className='service-picture' style={{width: '300px'}}>
                        <img src="/pic.png" alt="" width={'100%'}/>
                    </div>
                    <div className="service-description">
                        {data.description}
                    </div>
                    
                </div>

                {/* <div className="service-note">
                    {data.note}
                </div> */}
            </div>

            <div className="col" style={{ flex: '1' }}>
                <table>
                    <thead>
                        <th></th>
                        <th></th>
                        <th>価格</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{color: 'red'}}>
                                {data.duration}
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
            </div>
        </div>
    )
}