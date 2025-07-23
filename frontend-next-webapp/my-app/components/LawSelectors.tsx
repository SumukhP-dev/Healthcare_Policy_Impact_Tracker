import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useState } from "react";
import { setStatistics } from "../src/app/store/features/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";

const LawSelectors = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (event: MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const hideDropdown = () => {
    setIsOpen(false);
  };

  const hideDropdownMortality = () => {
    setIsOpen(false);

    const dispatch = useDispatch();
    dispatch(setStatistics("Mortality"));
  };

  const hideDropdownInfantMortality = () => {
    setIsOpen(false);

    const dispatch = useDispatch();
    dispatch(setStatistics("InfantMortality"));
  };

  const hideDropdownCountyOrganizedHealthSystem = () => {
    setIsOpen(false);

    const dispatch = useDispatch();
    dispatch(setStatistics("CountyOrganizedHealthSystem"));
  };

  return (
    <div className="">
      <div className="d-grid gap-2 p-5 col-start-1 col-end-1">
        <button className="btn btn-primary max-w-md" type="button">
          2019 Law - Medi-Cal expansions for all income-eligible young adults
        </button>
      </div>

      <ul className="navbar-nav d-grid p-5 col-start-1 col-end-1 max-w-20 max-h-20 mb-10">
        <li className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            aria-expanded={isOpen}
            onClick={toggleDropdown}
          >
            Dropdown
          </a>
          <ul
            className={`dropdown-menu${isOpen ? " show" : ""}`}
            style={{ right: 0 }}
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a
                href="#action"
                className="dropdown-item"
                onClick={hideDropdownMortality}
              >
                Mortality
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                href="#another-action"
                className="dropdown-item"
                onClick={hideDropdownInfantMortality}
              >
                Infant Mortality
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                href="#something-else-here"
                className="dropdown-item"
                onClick={hideDropdownCountyOrganizedHealthSystem}
              >
                County Organized Health System
              </a>
            </li>
          </ul>
          {isOpen && (
            <button
              type="button" // <4>
              className="modal-backdrop opacity-0"
              style={{ zIndex: 999, cursor: "auto" }}
              onClick={hideDropdown}
            >
              Hide dropdown
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default LawSelectors;
