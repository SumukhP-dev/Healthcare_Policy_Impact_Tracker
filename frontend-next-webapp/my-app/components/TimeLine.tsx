import React from "react";
import { Chrono } from "react-chrono";
import { useSelector, useDispatch } from "react-redux";
import { setYear } from "../src/app/store/features/yearSlice";

const TimeLine = () => {
  const data = [
    {
      title: "2010",
    },
    {
      title: "2011",
    },
    {
      title: "2012",
    },
    {
      title: "2013",
    },
    {
      title: "2014",
    },
    {
      title: "2015",
    },
    {
      title: "2016",
    },
    {
      title: "2017",
    },
    {
      title: "2018",
    },
    {
      title: "2019",
    },
    {
      title: "2020",
    },
  ];
  const year = useSelector((state: any) => state.year.value);
  const dispatch = useDispatch();

  const handleItemSelected = (item, index) => {
    console.log("Selected item:", item, "at index:", index);

    dispatch(setYear(item.title));

    console.log("Current year in store:", year);
  };

  return (
    <div className="flex col-start-1 col-end-5">
      <div style={{ width: "100%", height: "500px" }}>
        <Chrono
          onItemSelected={handleItemSelected}
          items={data}
          mode="HORIZONTAL"
          disableToolbar={true}
          activeItemIndex={(year - 2010) % data.length}
          itemWidth={150}
        />
      </div>
    </div>
  );
};

export default TimeLine;
