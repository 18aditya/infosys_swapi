import React, { useEffect, useState } from "react";
import { getPeople } from "../api/api";
import Box from "../components/box";
import "../styling/App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [loading, isLoading] = useState(true);
  const [currentPage, setPage] = useState(1);

  const handleSearch = () => {
    isLoading(true);
    setPage(1)
    getData();
  };

  const handleJumpPage = (type) => {
    isLoading(true);
    switch (type) {
      case "first":
        if(currentPage !== 1) setPage(1)
        break;
      default:
        if(currentPage !== Math.ceil(data.count / 10)) setPage(Math.ceil(data.count / 10))
    }
  };

  const handleScrollPage = (type) => {
    isLoading(true);
    switch (type) {
      case "prev":
        if(currentPage !== 1) setPage(currentPage - 1)
        break;
      default:
        if(currentPage !== Math.ceil(data.count / 10)) setPage(currentPage + 1)
    }
  };

  const getData = async () => {
    const data = await getPeople(name,currentPage);
    isLoading(false);
    setData(data.data);
  };

  useEffect(() => {
    isLoading(true);

    getData();  
  }, [currentPage]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Box string="Name" />
            <Box string="Birth Year" />
            <Box string="Gender" />
            <Box string="Height" />
          </div>
          {!loading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.results.map((dt) => (
                <a
                  href={`people/${dt.url.split("/")[5]}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Box string={dt.name} />
                    <Box string={dt.birth_year} />
                    <Box string={dt.gender} />
                    <Box string={dt.height} />
                  </div>
                </a>
              ))}
            </div>
          ):"Loading..."}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button disabled={currentPage === 1}  onClick={()=>handleJumpPage("first")}>
            <Box string="First page" />
          </button>
          <button disabled={currentPage === 1}  onClick={()=>handleScrollPage("prev")}>
            <Box string="Previous" />
          </button>
          <Box string={loading ? "Loading...":`${currentPage}/ ${Math.ceil(data.count / 10)}`} />
          <button disabled={currentPage === Math.ceil(data.count / 10)} onClick={()=>handleScrollPage("next")}>
            <Box string="Next" />
          </button>
          <button disabled={currentPage === Math.ceil(data.count / 10)} onClick={()=>handleJumpPage("last")}>
            <Box string="Last Page" />
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
