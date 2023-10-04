import React, { useEffect, useState } from "react";
import { getPeopleDetails } from "../api/api";
import { useParams } from "react-router-dom";
import "../styling/App.css";
import Box from "../components/box";

function Details() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getPeopleDetails(id);
      isLoading(false);

      setData({
        "Name": data.data.name,
        "Height": data.data.height,
        "Mass": data.data.mass,
        "Hair color": data.data.hair_color,
        "Skin color": data.data.skin_color,
        "Eye color": data.data.eye_color,
        "Birth year": data.data.birth_year,
        "Gender": data.data.gender,
      });
    };

    getData();
  }, []);

  return (
    <div className="App App-header">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
        }}
      ></div>
      {Object.keys(data).map((dt) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Box string={dt} /> <Box string={Object.values(data[dt])} />
        </div>
      ))}
    </div>
  );
}

export default Details;
