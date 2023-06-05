import './DetailService.scss'
import { currencyConvert } from '@/hooks/hooks';

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
                    {data.serviceName}
                </div>

                <div className="row" style={{ gap: '15px' }}>
                    <div className='service-picture' style={{ width: '300px' }}>
                        <img src="/pic.png" alt="" width={'100%'} />
                    </div>
                    <div className="service-description">
                        {data.serviceDescription}
                    </div>

                </div>

                {/* <div className="service-note">
                    {data.note}
                </div> */}
            </div>

            <div className="priceDuration col" style={{ flex: '1', }}>
                <table className='price-table'>
                    <thead>
                        <tr>
                            
                            <th></th>
                            <th></th>
                            <th>価格</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.servicePrice.map((item, index) => {
                                return (
                                    <tr key={`row${index}`}>
                                        <td>
                                            <input type="radio" name={"price-choose"+data.id} />
                                        </td>
                                        <td className='duration'>
                                            {item.duration}分
                                        </td>
                                        <td className='customer-count'>
                                            １人
                                        </td>
                                        <td className='price'>
                                            {currencyConvert(item.price)} VND
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <button className='schedule-service black'>今予約する</button>
            </div>
        </div>
    )
}