import React from "react";
import { Chrono } from "react-chrono";
import { useSelector, useDispatch } from "react-redux";
import { setYear } from "../src/app/store/features/yearSlice";
import { RootState } from "../src/app/store/store.tsx";

const TimeLine = () => {
  const data = [
    {
      title: "2019",
    },
    {
      title: "2020",
    },
    {
      title: "2021",
    },
    {
      title: "2022",
    },
    {
      title: "2023",
    },
    {
      title: "2024",
    },
    {
      title: "2025",
    },
    {
      title: "2026",
    },
    {
      title: "2027",
    },
    {
      title: "2028",
    },
    {
      title: "2029",
    },
    {
      title: "2030",
    },
    {
      title: "2031",
    },
    {
      title: "2032",
    },
    {
      title: "2033",
    },
  ];
  const year = useSelector((state: RootState) => state.year.value);
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
          activeItemIndex={(year - 2019) % data.length}
          itemWidth={110}
        />
      </div>
    </div>
  );
};

export default TimeLine;
