import MapView from "./MapView";

function Results({ data }) {
  return (
    <div style={{display:"flex",gap:"20px",padding:"20px"}}>

      <div style={{flex:1}}>
        {data.map((p,i)=>(
          <div key={i} className="card">
            {p.pharmacy} - ₹{p.price}
          </div>
        ))}
      </div>

      <div style={{flex:1}}>
        <MapView pharmacies={data}/>
      </div>

    </div>
  );
}

export default Results;