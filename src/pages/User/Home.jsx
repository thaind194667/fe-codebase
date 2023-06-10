
import { useNavigate } from "react-router-dom";
import Header from "@/layouts/Header"
import Slider from "@/components/Slider";

export default function HomeUser() {

  const navigate = useNavigate();

  return (
    <>
    <Header></Header>
      <div>This is user's massage homepage</div>
      <div> &emsp; If you want to change role, <b>Inspect</b> then choose <b>Application</b>, then delete value in <b>local storage</b>. Then reaload the page</div>
      <div>
        
            <button onClick={() => navigate('/search')}>Search</button>
        
            <button onClick={() => navigate('/detail/0')}>Detail of 0</button>
      </div>
{/* 
      <Slider
        className="slider"
        // onChange={setRateVal}
        value={[0, 5]}
        min={0}
        max={5}
        type="double"
        color="black"
      /> */}
    </>
  );
}
