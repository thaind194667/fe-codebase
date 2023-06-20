import "./DetailService.scss";
import { currencyConvert } from "@/hooks/hooks";
import SvgIcon from '@/components/SvgIcon'
import {publicURL} from '@/hooks/hooks'

export default function DetailsService({
    data,
    edit,
    openEditService,
    deleteService,
}) {
    const serviceSchedule = () => {
        schedule();
    };

    const serviceEdit = () => {
        edit();
    };

    return (
        <div className="service-info row">
            <div className="img-handle-btn row">
                <div onClick={openEditService}>
                    <SvgIcon
                        className="img-btn"
                        name="edit-icon"
                        width="35px"
                        height="35px"
                        round={true}
                        backgroundColor="#DCDCDC"
                        padding="8px"
                    />
                </div>
                <div onClick={deleteService}>
                    <SvgIcon
                        className="img-btn"
                        name="delete-icon"
                        width="35px"
                        height="35px"
                        round={true}
                        backgroundColor="#DCDCDC"
                        padding="8px"
                    />
                </div>
            </div>

            <div className="col" style={{ flex: "2.5" }}>
                <div className="service-name center-item">
                    {data.serviceName}
                </div>

                <div className="row" style={{ gap: "15px" }}>
                    <div className="service-picture" style={{ width: "300px" }}>
                        <img src={edit ? data.serviceImg.url : `${publicURL}${data.serviceImg}`} alt="" width={"100%"} />
                    </div>
                    <div className="service-description">{data.serviceDescription}</div>
                </div>
            </div>

            <div className="priceDuration col" style={{ flex: "1" }}>
                <table className={`price-table ${edit ? 'small-txt' : ''}`}>
                    <thead>
                        <tr>
                            {edit ? <></> : <th></th>}
                            <th></th>
                            <th>価格</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {   edit ? 
                    data.priceList.map((item, index) => {
                        return (
                            <tr key={`rowedit${index}`}>
                                <td className="duration">{item.duration}分</td>
                                <td className="customer-count">１人</td>
                                <td className="price">{currencyConvert(item.price)} VND</td>
                            </tr>
                        );
                    }) :
                    data.servicePrice.map((item, index) => {
                        return (
                            <tr key={`rownormal${index}`}>
                                <td>
                                    <input type="radio" name={"price-choose" + data.id} />
                                </td>
                                <td className="duration">{item.duration}分</td>
                                <td className="customer-count">１人</td>
                                <td className="price">{currencyConvert(item.price)} VND</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {edit ? <></> :
                    <button className="schedule-service black">今予約する</button>

                }
            </div>
        </div>
    );
}
