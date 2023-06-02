import './DetailsService.scss'

export default function DetailsService({ data, role, schedule, edit }) {

    const serviceSchedule = () => {
        schedule();
    }

    const serviceEdit = () => {
        edit();
    }

    return (
        <div className="serviceCard" >
            <div className="service-info">
                <div className="col" style={{ flex: '2' }}>
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

            <div >
                <button 
                    className='service-btn' 
                    onClick={role === 'owner' ? serviceEdit : serviceSchedule}
                >
                {   role === 'owner' ? '編集' : '今予約する'    }
                </button>
            </div>
        </div>
    )
}