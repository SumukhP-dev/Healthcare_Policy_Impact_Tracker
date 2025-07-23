import { useState } from "react";
import { setStatistics } from "../src/app/store/features/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";

const LawSelectors = () => {
  let percent = useSelector((state: any) => state.percent.value);
  let statistics = useSelector((state: any) => state.statistics.value);

  const setDropdownTitle = () => {
    if (statistics === "Mortality") {
      return "Mortality";
    } else if (statistics === "InfantMortality") {
      return "Infant Mortality";
    } else if (statistics === "CountyOrganizedHealthSystem") {
      return "County Organized Health System";
    }
    return "Select Statistics";
  };

  const setMortalityStatistics = (dispatch) => {
    dispatch(setStatistics("Mortality"));

    console.log("Mortality statistics selected");
  };

  const setInfantMortalityStatistics = (dispatch) => {
    dispatch(setStatistics("InfantMortality"));

    console.log("Infant Mortality statistics selected");
  };

  const setCountyOrganizedHealthSystemStatistics = (dispatch) => {
    dispatch(setStatistics("CountyOrganizedHealthSystem"));

    console.log("County Organized Health System statistics selected");
  };

  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="d-grid gap-2 p-5 col-start-1 col-end-1">
        <button className="btn btn-primary max-w-md" type="button">
          2019 Law - Medi-Cal expansions for all income-eligible young adults
        </button>
      </div>

      <div className="dropdown px-5">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {setDropdownTitle()}
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              onClick={() => setMortalityStatistics(dispatch)}
            >
              Mortality
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setInfantMortalityStatistics(dispatch)}
            >
              Infant Mortality
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setCountyOrganizedHealthSystemStatistics(dispatch)}
            >
              County Organized Health System
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LawSelectors;
