"use client";

import axios, { AxiosResponse } from "axios";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import React, { memo, use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import ReactTooltip from "react-tooltip";
import { Tooltip } from "react-bootstrap";
import { scaleLinear } from "d3-scale";
import path from "path";
import { useSelector, useDispatch } from "react-redux";
import { countySlice } from "../src/app/store/features/countySlice";
import { percentSlice } from "../src/app/store/features/percentSlice";
import { setCounty } from "../src/app/store/features/countySlice";
import { setPercent } from "../src/app/store/features/percentSlice";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const getMortalityDataDetails = () => {
  // const { data, error } = useSWR(
  //   "https://raw.githubusercontent.com/SumukhP-dev/Healthcare_Policy_Impact_Tracker/refs/heads/main/frontend-next-webapp/my-app/public/datasets/2019-medi-cal-expansions/mortality-data/mortality_merged_json_datasets.json",
  //   fetcher
  // );
  // return {
  //   data: data,
  //   error: error,
  // };
  const data = [
    {
      Tuolumne: [
        { Years: 2018, predicted_mean: 1732.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 71.5395534981,
          "% Change": -95.8695407911,
        },
        {
          Years: 2020,
          predicted_mean: 86.5316573875,
          "% Change": 20.9563844843,
        },
        {
          Years: 2021,
          predicted_mean: 41.5429921377,
          "% Change": -51.9909898967,
        },
        {
          Years: 2024,
          predicted_mean: 84.7072556019,
          "% Change": 103.9026349405,
        },
        {
          Years: 2025,
          predicted_mean: 78.9374982695,
          "% Change": -6.8114086467,
        },
        { Years: 2026, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 78.9374982695, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 78.9374982695, "% Change": 0.0 },
      ],
    },
    {
      "Santa Barbara": [
        { Years: 2018, predicted_mean: 48.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 638.4510689448,
          "% Change": 1230.1063936349,
        },
        {
          Years: 2020,
          predicted_mean: 569.8812581246,
          "% Change": -10.7400260029,
        },
        {
          Years: 2021,
          predicted_mean: 279.519054863,
          "% Change": -50.951351553,
        },
        {
          Years: 2024,
          predicted_mean: 578.1628629218,
          "% Change": 106.842021273,
        },
        {
          Years: 2025,
          predicted_mean: 604.2668272746,
          "% Change": 4.5149846223,
        },
        { Years: 2026, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 604.2668272746, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 604.2668272746, "% Change": 0.0 },
      ],
    },
    {
      Orange: [
        { Years: 2018, predicted_mean: 478.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 3751.1780928251,
          "% Change": 684.765291386,
        },
        {
          Years: 2020,
          predicted_mean: 3517.5319044601,
          "% Change": -6.2286082554,
        },
        {
          Years: 2021,
          predicted_mean: 1949.1948244031,
          "% Change": -44.5862929649,
        },
        {
          Years: 2022,
          predicted_mean: 2231.8726016309,
          "% Change": 14.5022844145,
        },
        {
          Years: 2024,
          predicted_mean: 3546.6142971161,
          "% Change": 58.9075601593,
        },
        {
          Years: 2025,
          predicted_mean: 3634.2504584798,
          "% Change": 2.4709808855,
        },
        { Years: 2026, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 3634.2504584798, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 3634.2504584798, "% Change": 0.0 },
      ],
    },
    {
      Colusa: [
        { Years: 2018, predicted_mean: 12.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 8.0005844299,
          "% Change": -33.328463084,
        },
        {
          Years: 2020,
          predicted_mean: 7.9960627174,
          "% Change": -0.0565172773,
        },
        {
          Years: 2021,
          predicted_mean: 6.000268722,
          "% Change": -24.9597091212,
        },
        { Years: 2022, predicted_mean: 6.0034836769, "% Change": 0.053580182 },
        {
          Years: 2024,
          predicted_mean: 8.1131356313,
          "% Change": 35.1404629037,
        },
        {
          Years: 2025,
          predicted_mean: 8.0319237429,
          "% Change": -1.0009926136,
        },
        { Years: 2026, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 8.0319237429, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 8.0319237429, "% Change": 0.0 },
      ],
    },
    {
      Monterey: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 528.7423436605, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 495.8417766928,
          "% Change": -6.2224195513,
        },
        {
          Years: 2021,
          predicted_mean: 226.5422171745,
          "% Change": -54.3115913537,
        },
        {
          Years: 2022,
          predicted_mean: 247.9944146217,
          "% Change": 9.4694038554,
        },
        {
          Years: 2024,
          predicted_mean: 499.917738004,
          "% Change": 101.584273084,
        },
        {
          Years: 2025,
          predicted_mean: 512.248072381,
          "% Change": 2.4664726693,
        },
        { Years: 2026, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 512.248072381, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 512.248072381, "% Change": 0.0 },
      ],
    },
    {
      Marin: [
        { Years: 2018, predicted_mean: 1088.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 277.9548733265,
          "% Change": -74.452677084,
        },
        {
          Years: 2020,
          predicted_mean: 245.228482995,
          "% Change": -11.7739940803,
        },
        {
          Years: 2021,
          predicted_mean: 127.9762478173,
          "% Change": -47.8134651186,
        },
        {
          Years: 2022,
          predicted_mean: 121.8629736892,
          "% Change": -4.7768818296,
        },
        {
          Years: 2024,
          predicted_mean: 245.9346033138,
          "% Change": 101.8124093551,
        },
        {
          Years: 2025,
          predicted_mean: 261.7160897031,
          "% Change": 6.4169442513,
        },
        { Years: 2026, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 261.7160897031, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 261.7160897031, "% Change": 0.0 },
      ],
    },
    {
      Lassen: [
        { Years: 2018, predicted_mean: 22.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 14.5553105759,
          "% Change": -33.8394973822,
        },
        {
          Years: 2020,
          predicted_mean: 8.1847102122,
          "% Change": -43.7682200631,
        },
        {
          Years: 2021,
          predicted_mean: 13.1443620384,
          "% Change": 60.5965476807,
        },
        {
          Years: 2022,
          predicted_mean: 11.7813068142,
          "% Change": -10.369884976,
        },
        {
          Years: 2024,
          predicted_mean: 9.058858066,
          "% Change": -23.1082068499,
        },
        {
          Years: 2025,
          predicted_mean: 11.6212420773,
          "% Change": 28.2859494283,
        },
        { Years: 2026, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 11.6212420773, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 11.6212420773, "% Change": 0.0 },
      ],
    },
    {
      Ventura: [
        { Years: 2018, predicted_mean: 78.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 903.2360866159,
          "% Change": 1057.9949828409,
        },
        {
          Years: 2020,
          predicted_mean: 767.2250911334,
          "% Change": -15.0581888277,
        },
        {
          Years: 2021,
          predicted_mean: 473.7548848456,
          "% Change": -38.2508614068,
        },
        {
          Years: 2024,
          predicted_mean: 784.3350092566,
          "% Change": 65.5571339412,
        },
        {
          Years: 2025,
          predicted_mean: 835.3703700148,
          "% Change": 6.5068319221,
        },
        { Years: 2026, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 835.3703700148, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 835.3703700148, "% Change": 0.0 },
      ],
    },
    {
      Trinity: [
        { Years: 2018, predicted_mean: 1354.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 4.2413650644,
          "% Change": -99.6867529495,
        },
        {
          Years: 2020,
          predicted_mean: 3.809375029,
          "% Change": -10.1851651253,
        },
        {
          Years: 2021,
          predicted_mean: 2.0651536719,
          "% Change": -45.7875988534,
        },
        { Years: 2024, predicted_mean: 3.886859369, "% Change": 88.2116290862 },
        { Years: 2025, predicted_mean: 3.7632510175, "% Change": -3.180160118 },
        { Years: 2026, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 3.7632510175, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 3.7632510175, "% Change": 0.0 },
      ],
    },
    {
      Stanislaus: [
        { Years: 2018, predicted_mean: 2.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 973.4436261675,
          "% Change": 48572.1813083726,
        },
        {
          Years: 2020,
          predicted_mean: 1084.2017980535,
          "% Change": 11.3779749447,
        },
        {
          Years: 2021,
          predicted_mean: 633.9795256122,
          "% Change": -41.525689521,
        },
        {
          Years: 2024,
          predicted_mean: 1079.7485450713,
          "% Change": 70.3128415746,
        },
        {
          Years: 2025,
          predicted_mean: 1028.667245612,
          "% Change": -4.7308514276,
        },
        { Years: 2026, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1028.667245612, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1028.667245612, "% Change": 0.0 },
      ],
    },
    {
      Sacramento: [
        { Years: 2018, predicted_mean: 152.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 2745.4963457954,
          "% Change": 1706.247595918,
        },
        {
          Years: 2020,
          predicted_mean: 2451.6874080681,
          "% Change": -10.7014871164,
        },
        {
          Years: 2021,
          predicted_mean: 1470.5514120478,
          "% Change": -40.0188047135,
        },
        {
          Years: 2022,
          predicted_mean: 1568.423525675,
          "% Change": 6.6554703783,
        },
        {
          Years: 2024,
          predicted_mean: 2457.6572502148,
          "% Change": 56.6960205571,
        },
        {
          Years: 2025,
          predicted_mean: 2598.9349947551,
          "% Change": 5.7484722301,
        },
        { Years: 2026, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2598.9349947551, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2598.9349947551, "% Change": 0.0 },
      ],
    },
    {
      Placer: [
        { Years: 2018, predicted_mean: 150.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 592.7750779267,
          "% Change": 295.1833852845,
        },
        {
          Years: 2020,
          predicted_mean: 627.1993413097,
          "% Change": 5.8073061208,
        },
        {
          Years: 2021,
          predicted_mean: 329.4761031019,
          "% Change": -47.4686783928,
        },
        {
          Years: 2022,
          predicted_mean: 446.2702100398,
          "% Change": 35.448430353,
        },
        {
          Years: 2024,
          predicted_mean: 623.3130489888,
          "% Change": 39.6716686362,
        },
        {
          Years: 2025,
          predicted_mean: 610.2747533828,
          "% Change": -2.0917732473,
        },
        { Years: 2026, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 610.2747533828, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 610.2747533828, "% Change": 0.0 },
      ],
    },
    {
      Napa: [
        { Years: 2018, predicted_mean: 12.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 187.2577988704,
          "% Change": 1460.4816572531,
        },
        {
          Years: 2020,
          predicted_mean: 139.4444855696,
          "% Change": -25.5334162792,
        },
        {
          Years: 2021,
          predicted_mean: 126.8321231672,
          "% Change": -9.0447193741,
        },
        {
          Years: 2022,
          predicted_mean: 105.0259910009,
          "% Change": -17.1929095104,
        },
        {
          Years: 2024,
          predicted_mean: 145.2936435108,
          "% Change": 38.3406546571,
        },
        {
          Years: 2025,
          predicted_mean: 163.3786266341,
          "% Change": 12.4471949951,
        },
        { Years: 2026, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 163.3786266341, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 163.3786266341, "% Change": 0.0 },
      ],
    },
    {
      Plumas: [
        { Years: 2018, predicted_mean: 978.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 3.6997837261,
          "% Change": -99.6216990055,
        },
        {
          Years: 2020,
          predicted_mean: 1.3112839788,
          "% Change": -64.5578207827,
        },
        {
          Years: 2021,
          predicted_mean: 5.9390358892,
          "% Change": 352.9175971779,
        },
        {
          Years: 2022,
          predicted_mean: 3.1213886018,
          "% Change": -47.4428398811,
        },
        {
          Years: 2024,
          predicted_mean: 1.6468703656,
          "% Change": -47.2391753908,
        },
        {
          Years: 2025,
          predicted_mean: 2.8212922503,
          "% Change": 71.3123454809,
        },
        { Years: 2026, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2.8212922503, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2.8212922503, "% Change": 0.0 },
      ],
    },
    {
      "El Dorado": [
        { Years: 2018, predicted_mean: 116.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 63.4147167454,
          "% Change": -45.3321407367,
        },
        {
          Years: 2020,
          predicted_mean: 63.5059180303,
          "% Change": 0.1438172234,
        },
        {
          Years: 2021,
          predicted_mean: 39.7316207115,
          "% Change": -37.4363493296,
        },
        {
          Years: 2022,
          predicted_mean: 49.0589837073,
          "% Change": 23.4759187487,
        },
        {
          Years: 2024,
          predicted_mean: 63.8775785181,
          "% Change": 30.205670177,
        },
        {
          Years: 2025,
          predicted_mean: 63.803572519,
          "% Change": -0.1158559871,
        },
        { Years: 2026, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 63.803572519, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 63.803572519, "% Change": 0.0 },
      ],
    },
    {
      Solano: [
        { Years: 2018, predicted_mean: 12.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 570.2442828005,
          "% Change": 4652.0356900043,
        },
        {
          Years: 2020,
          predicted_mean: 602.3007265272,
          "% Change": 5.6215282982,
        },
        {
          Years: 2021,
          predicted_mean: 319.3271614909,
          "% Change": -46.9821058772,
        },
        {
          Years: 2024,
          predicted_mean: 598.2350137977,
          "% Change": 87.3423516511,
        },
        {
          Years: 2025,
          predicted_mean: 585.9974915277,
          "% Change": -2.0456044845,
        },
        { Years: 2026, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 585.9974915277, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 585.9974915277, "% Change": 0.0 },
      ],
    },
    {
      "San Francisco": [
        { Years: 2018, predicted_mean: 6.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1499.9443614093,
          "% Change": 24899.0726901557,
        },
        {
          Years: 2020,
          predicted_mean: 1403.5187983892,
          "% Change": -6.4286093205,
        },
        {
          Years: 2021,
          predicted_mean: 744.9293161279,
          "% Change": -46.9241653918,
        },
        {
          Years: 2024,
          predicted_mean: 1415.1635951781,
          "% Change": 89.9728691756,
        },
        {
          Years: 2025,
          predicted_mean: 1451.7075557189,
          "% Change": 2.5823134983,
        },
        { Years: 2026, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1451.7075557189, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1451.7075557189, "% Change": 0.0 },
      ],
    },
    {
      "Contra Costa": [
        { Years: 2018, predicted_mean: 11670.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1117.8857117415,
          "% Change": -90.4208593681,
        },
        {
          Years: 2020,
          predicted_mean: 1165.8407636822,
          "% Change": 4.2897991661,
        },
        {
          Years: 2021,
          predicted_mean: 672.200063605,
          "% Change": -42.3420346461,
        },
        {
          Years: 2022,
          predicted_mean: 784.9976441349,
          "% Change": 16.7803585029,
        },
        {
          Years: 2024,
          predicted_mean: 1159.8688492049,
          "% Change": 47.7544369554,
        },
        {
          Years: 2025,
          predicted_mean: 1141.8707119886,
          "% Change": -1.5517389943,
        },
        { Years: 2026, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1141.8707119886, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1141.8707119886, "% Change": 0.0 },
      ],
    },
    {
      Mono: [
        { Years: 2018, predicted_mean: 20.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 0.8147506026,
          "% Change": -95.926246987,
        },
        {
          Years: 2020,
          predicted_mean: 1.6676242315,
          "% Change": 104.679103784,
        },
        {
          Years: 2021,
          predicted_mean: 1.1717640967,
          "% Change": -29.7345244454,
        },
        {
          Years: 2022,
          predicted_mean: 1.6041174379,
          "% Change": 36.8976436817,
        },
        {
          Years: 2024,
          predicted_mean: 1.3504176905,
          "% Change": -15.8155345384,
        },
        {
          Years: 2025,
          predicted_mean: 1.2715775897,
          "% Change": -5.8382011193,
        },
        { Years: 2026, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1.2715775897, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1.2715775897, "% Change": 0.0 },
      ],
    },
    {
      Lake: [
        { Years: 2018, predicted_mean: 192.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 21.6834935323,
          "% Change": -88.7065137853,
        },
        {
          Years: 2020,
          predicted_mean: 18.7546181593,
          "% Change": -13.5073961611,
        },
        {
          Years: 2021,
          predicted_mean: 10.8996570731,
          "% Change": -41.8828099804,
        },
        {
          Years: 2022,
          predicted_mean: 12.5083732526,
          "% Change": 14.7593283782,
        },
        {
          Years: 2024,
          predicted_mean: 18.521749129,
          "% Change": 48.0748036129,
        },
        { Years: 2025, predicted_mean: 19.8057906027, "% Change": 6.932614543 },
        { Years: 2026, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 19.8057906027, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 19.8057906027, "% Change": 0.0 },
      ],
    },
    {
      "San Diego": [
        { Years: 2018, predicted_mean: 2.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 4029.3842970841,
          "% Change": 201369.2148542074,
        },
        {
          Years: 2020,
          predicted_mean: 3873.5774563894,
          "% Change": -3.866765471,
        },
        {
          Years: 2021,
          predicted_mean: 1915.1808003915,
          "% Change": -50.5578287267,
        },
        {
          Years: 2022,
          predicted_mean: 1977.0853889241,
          "% Change": 3.2323104179,
        },
        {
          Years: 2024,
          predicted_mean: 3880.0126086182,
          "% Change": 96.2491165204,
        },
        {
          Years: 2025,
          predicted_mean: 3951.5529677954,
          "% Change": 1.8438176984,
        },
        { Years: 2026, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 3951.5529677954, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 3951.5529677954, "% Change": 0.0 },
      ],
    },
    {
      Nevada: [
        { Years: 2018, predicted_mean: 66.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 53.6518932346,
          "% Change": -18.7092526749,
        },
        {
          Years: 2020,
          predicted_mean: 58.9308666234,
          "% Change": 9.8393049536,
        },
        {
          Years: 2021,
          predicted_mean: 28.6034518889,
          "% Change": -51.4626993835,
        },
        {
          Years: 2022,
          predicted_mean: 39.4844388678,
          "% Change": 38.0408176651,
        },
        {
          Years: 2024,
          predicted_mean: 58.286725378,
          "% Change": 47.6194851675,
        },
        {
          Years: 2025,
          predicted_mean: 56.2491259095,
          "% Change": -3.4958207986,
        },
        { Years: 2026, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 56.2491259095, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 56.2491259095, "% Change": 0.0 },
      ],
    },
    {
      Mariposa: [
        { Years: 2018, predicted_mean: 102.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1.8782792159,
          "% Change": -98.1585497884,
        },
        { Years: 2020, predicted_mean: 2.064210121, "% Change": 9.8990024237 },
        {
          Years: 2021,
          predicted_mean: 1.0252607471,
          "% Change": -50.3315705738,
        },
        {
          Years: 2022,
          predicted_mean: 0.9717915914,
          "% Change": -5.2151763219,
        },
        {
          Years: 2024,
          predicted_mean: 2.4066332176,
          "% Change": 147.649109006,
        },
        {
          Years: 2025,
          predicted_mean: 2.0979752628,
          "% Change": -12.8253010248,
        },
        { Years: 2026, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2.0979752628, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2.0979752628, "% Change": 0.0 },
      ],
    },
    {
      Alameda: [
        { Years: 2018, predicted_mean: 4.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1991.9886452912,
          "% Change": 49699.7161322806,
        },
        {
          Years: 2020,
          predicted_mean: 1747.3596608743,
          "% Change": -12.2806415084,
        },
        {
          Years: 2021,
          predicted_mean: 991.2613159086,
          "% Change": -43.2709053491,
        },
        {
          Years: 2022,
          predicted_mean: 1100.8121431907,
          "% Change": 11.0516596909,
        },
        {
          Years: 2024,
          predicted_mean: 1777.9403267113,
          "% Change": 61.5116927724,
        },
        {
          Years: 2025,
          predicted_mean: 1869.8890518516,
          "% Change": 5.1716429263,
        },
        { Years: 2026, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1869.8890518516, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1869.8890518516, "% Change": 0.0 },
      ],
    },
    {
      Tehama: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 40.9626435891, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 35.2537719251,
          "% Change": -13.9367754711,
        },
        {
          Years: 2021,
          predicted_mean: 22.2528428606,
          "% Change": -36.8781221257,
        },
        {
          Years: 2024,
          predicted_mean: 35.4454040754,
          "% Change": 59.2848351889,
        },
        { Years: 2025, predicted_mean: 38.3001874462, "% Change": 8.054029698 },
        { Years: 2026, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 38.3001874462, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 38.3001874462, "% Change": 0.0 },
      ],
    },
    {
      Butte: [
        { Years: 2018, predicted_mean: 402.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 471.2079630749,
          "% Change": 17.2159112127,
        },
        {
          Years: 2020,
          predicted_mean: 511.8454091107,
          "% Change": 8.6241000196,
        },
        {
          Years: 2021,
          predicted_mean: 246.1563785538,
          "% Change": -51.9080616584,
        },
        {
          Years: 2022,
          predicted_mean: 304.5363125416,
          "% Change": 23.7166041891,
        },
        {
          Years: 2024,
          predicted_mean: 511.3769861537,
          "% Change": 67.9198719804,
        },
        {
          Years: 2025,
          predicted_mean: 491.4489977516,
          "% Change": -3.8969271089,
        },
        { Years: 2026, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 491.4489977516, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 491.4489977516, "% Change": 0.0 },
      ],
    },
    {
      "San Mateo": [
        { Years: 2018, predicted_mean: 198.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 867.9958545086,
          "% Change": 338.3817447013,
        },
        {
          Years: 2020,
          predicted_mean: 862.3178845876,
          "% Change": -0.6541471243,
        },
        {
          Years: 2021,
          predicted_mean: 514.0957419327,
          "% Change": -40.3821083708,
        },
        {
          Years: 2024,
          predicted_mean: 862.3409013777,
          "% Change": 67.739358847,
        },
        {
          Years: 2025,
          predicted_mean: 864.9937178149,
          "% Change": 0.3076296663,
        },
        { Years: 2026, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 864.9937178149, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 864.9937178149, "% Change": 0.0 },
      ],
    },
    {
      Amador: [
        { Years: 2018, predicted_mean: 68.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 27.8497533783,
          "% Change": -59.044480326,
        },
        {
          Years: 2020,
          predicted_mean: 29.3952870672,
          "% Change": 5.5495417423,
        },
        {
          Years: 2021,
          predicted_mean: 9.3979762192,
          "% Change": -68.0289694137,
        },
        {
          Years: 2022,
          predicted_mean: 13.2820849197,
          "% Change": 41.3292033298,
        },
        {
          Years: 2024,
          predicted_mean: 29.4252023399,
          "% Change": 121.5405376328,
        },
        {
          Years: 2025,
          predicted_mean: 28.7077004816,
          "% Change": -2.4383922668,
        },
        { Years: 2026, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 28.7077004816, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 28.7077004816, "% Change": 0.0 },
      ],
    },
    {
      Kern: [
        { Years: 2018, predicted_mean: 3562.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1026.1124974923,
          "% Change": -71.1927990597,
        },
        {
          Years: 2020,
          predicted_mean: 1034.5631506551,
          "% Change": 0.8235601051,
        },
        {
          Years: 2021,
          predicted_mean: 536.7764251545,
          "% Change": -48.1156442877,
        },
        {
          Years: 2022,
          predicted_mean: 669.4952028524,
          "% Change": 24.7251502634,
        },
        {
          Years: 2024,
          predicted_mean: 1033.1659340907,
          "% Change": 54.3201399635,
        },
        {
          Years: 2025,
          predicted_mean: 1030.1067981505,
          "% Change": -0.2960933805,
        },
        { Years: 2026, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1030.1067981505, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1030.1067981505, "% Change": 0.0 },
      ],
    },
    {
      Siskiyou: [
        { Years: 2018, predicted_mean: 520.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 23.3261745809,
          "% Change": -95.514197196,
        },
        { Years: 2020, predicted_mean: 24.967804643, "% Change": 7.0377166061 },
        {
          Years: 2021,
          predicted_mean: 17.3504229393,
          "% Change": -30.5088165042,
        },
        {
          Years: 2024,
          predicted_mean: 24.5783529616,
          "% Change": 41.6585235276,
        },
        {
          Years: 2025,
          predicted_mean: 24.0805402707,
          "% Change": -2.0254111075,
        },
        { Years: 2026, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 24.0805402707, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 24.0805402707, "% Change": 0.0 },
      ],
    },
    {
      Mendocino: [
        { Years: 2018, predicted_mean: 2.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 61.5863111024,
          "% Change": 2979.3155551202,
        },
        {
          Years: 2020,
          predicted_mean: 48.0080801585,
          "% Change": -22.0474821447,
        },
        {
          Years: 2021,
          predicted_mean: 27.0740465092,
          "% Change": -43.6052297451,
        },
        {
          Years: 2022,
          predicted_mean: 37.8195621982,
          "% Change": 39.6893596432,
        },
        {
          Years: 2024,
          predicted_mean: 49.7920201199,
          "% Change": 31.6567861336,
        },
        {
          Years: 2025,
          predicted_mean: 54.8404741499,
          "% Change": 10.1390825635,
        },
        { Years: 2026, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 54.8404741499, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 54.8404741499, "% Change": 0.0 },
      ],
    },
    {
      Yolo: [
        { Years: 2018, predicted_mean: 2464.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 54.5395815285,
          "% Change": -97.7865429574,
        },
        {
          Years: 2020,
          predicted_mean: 64.5164691234,
          "% Change": 18.2929302266,
        },
        {
          Years: 2021,
          predicted_mean: 31.1745517373,
          "% Change": -51.6796995235,
        },
        {
          Years: 2024,
          predicted_mean: 62.6852049476,
          "% Change": 101.0781276853,
        },
        {
          Years: 2025,
          predicted_mean: 59.0271198021,
          "% Change": -5.8356435917,
        },
        { Years: 2026, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 59.0271198021, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 59.0271198021, "% Change": 0.0 },
      ],
    },
    {
      "San Luis Obispo": [
        { Years: 2018, predicted_mean: 2596.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 279.8076455659,
          "% Change": -89.2215853018,
        },
        {
          Years: 2020,
          predicted_mean: 276.4724014731,
          "% Change": -1.1919774694,
        },
        {
          Years: 2021,
          predicted_mean: 151.289285511,
          "% Change": -45.2787024293,
        },
        {
          Years: 2024,
          predicted_mean: 276.346746921,
          "% Change": 82.6611487968,
        },
        {
          Years: 2025,
          predicted_mean: 277.9405930865,
          "% Change": 0.5767558993,
        },
        { Years: 2026, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 277.9405930865, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 277.9405930865, "% Change": 0.0 },
      ],
    },
    {
      "San Joaquin": [
        { Years: 2018, predicted_mean: 28.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 663.2472176299,
          "% Change": 2268.740062964,
        },
        {
          Years: 2020,
          predicted_mean: 793.4102622357,
          "% Change": 19.6251173237,
        },
        {
          Years: 2021,
          predicted_mean: 438.8905593112,
          "% Change": -44.6830246341,
        },
        {
          Years: 2024,
          predicted_mean: 777.7588336782,
          "% Change": 77.2101990298,
        },
        {
          Years: 2025,
          predicted_mean: 728.2839363376,
          "% Change": -6.3612131677,
        },
        { Years: 2026, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 728.2839363376, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 728.2839363376, "% Change": 0.0 },
      ],
    },
    {
      Calaveras: [
        { Years: 2018, predicted_mean: 2162.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 5.2768898156,
          "% Change": -99.7559255404,
        },
        {
          Years: 2020,
          predicted_mean: 8.3823614951,
          "% Change": 58.8504173483,
        },
        {
          Years: 2021,
          predicted_mean: 6.1513814263,
          "% Change": -26.6151736609,
        },
        {
          Years: 2022,
          predicted_mean: 7.8318024264,
          "% Change": 27.3177825202,
        },
        { Years: 2024, predicted_mean: 7.8694048248, "% Change": 0.4801244513 },
        {
          Years: 2025,
          predicted_mean: 6.7002901794,
          "% Change": -14.8564557472,
        },
        { Years: 2026, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6.7002901794, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6.7002901794, "% Change": 0.0 },
      ],
    },
    {
      Shasta: [
        { Years: 2018, predicted_mean: 3870.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 506.9571439508,
          "% Change": -86.9003321977,
        },
        {
          Years: 2020,
          predicted_mean: 594.6116090289,
          "% Change": 17.2903106553,
        },
        {
          Years: 2021,
          predicted_mean: 339.5913782806,
          "% Change": -42.8885388169,
        },
        {
          Years: 2024,
          predicted_mean: 589.1718384127,
          "% Change": 73.494345291,
        },
        {
          Years: 2025,
          predicted_mean: 550.7252239344,
          "% Change": -6.5255349919,
        },
        { Years: 2026, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 550.7252239344, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 550.7252239344, "% Change": 0.0 },
      ],
    },
    {
      Merced: [
        { Years: 2018, predicted_mean: 1682.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 92.1413101733,
          "% Change": -94.5219197281,
        },
        {
          Years: 2020,
          predicted_mean: 138.3676170104,
          "% Change": 50.1689272165,
        },
        {
          Years: 2021,
          predicted_mean: 49.0587080915,
          "% Change": -64.5446607006,
        },
        {
          Years: 2022,
          predicted_mean: 91.4931578582,
          "% Change": 86.4972833926,
        },
        {
          Years: 2024,
          predicted_mean: 137.9971910705,
          "% Change": 50.8278807956,
        },
        {
          Years: 2025,
          predicted_mean: 115.2617108459,
          "% Change": -16.475321018,
        },
        { Years: 2026, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 115.2617108459, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 115.2617108459, "% Change": 0.0 },
      ],
    },
    {
      "Santa Cruz": [
        { Years: 2018, predicted_mean: 752.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 216.5430514035,
          "% Change": -71.2043814623,
        },
        {
          Years: 2020,
          predicted_mean: 178.2432616978,
          "% Change": -17.6869169699,
        },
        {
          Years: 2021,
          predicted_mean: 110.8247986171,
          "% Change": -37.8238495181,
        },
        {
          Years: 2024,
          predicted_mean: 178.3605805945,
          "% Change": 60.9392327531,
        },
        {
          Years: 2025,
          predicted_mean: 197.1354270219,
          "% Change": 10.5263429648,
        },
        { Years: 2026, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 197.1354270219, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 197.1354270219, "% Change": 0.0 },
      ],
    },
    {
      Fresno: [
        { Years: 2018, predicted_mean: 246.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1596.419873702,
          "% Change": 548.9511681715,
        },
        {
          Years: 2020,
          predicted_mean: 1400.7712791727,
          "% Change": -12.2554597166,
        },
        {
          Years: 2021,
          predicted_mean: 845.379230227,
          "% Change": -39.6490174523,
        },
        {
          Years: 2022,
          predicted_mean: 979.4697711352,
          "% Change": 15.8615844953,
        },
        {
          Years: 2024,
          predicted_mean: 1424.2146931126,
          "% Change": 45.4067021856,
        },
        {
          Years: 2025,
          predicted_mean: 1498.5361971656,
          "% Change": 5.2184199765,
        },
        { Years: 2026, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 1498.5361971656, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 1498.5361971656, "% Change": 0.0 },
      ],
    },
    {
      Imperial: [
        { Years: 2018, predicted_mean: 828.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 127.4080330361,
          "% Change": -84.6125563966,
        },
        {
          Years: 2020,
          predicted_mean: 170.095329414,
          "% Change": 33.5043994956,
        },
        {
          Years: 2021,
          predicted_mean: 84.4957695396,
          "% Change": -50.3244622702,
        },
        {
          Years: 2022,
          predicted_mean: 114.5214179854,
          "% Change": 35.535090821,
        },
        {
          Years: 2024,
          predicted_mean: 164.9423901936,
          "% Change": 44.0275479427,
        },
        {
          Years: 2025,
          predicted_mean: 148.8708556737,
          "% Change": -9.7437259767,
        },
        { Years: 2026, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 148.8708556737, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 148.8708556737, "% Change": 0.0 },
      ],
    },
    {
      Kings: [
        { Years: 2018, predicted_mean: 560.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 124.6123028283,
          "% Change": -77.7478030664,
        },
        {
          Years: 2020,
          predicted_mean: 135.6640079383,
          "% Change": 8.8688715794,
        },
        {
          Years: 2021,
          predicted_mean: 67.6877020298,
          "% Change": -50.1063671504,
        },
        {
          Years: 2022,
          predicted_mean: 78.5355253469,
          "% Change": 16.0262839362,
        },
        {
          Years: 2024,
          predicted_mean: 134.8753539024,
          "% Change": 71.7380170396,
        },
        {
          Years: 2025,
          predicted_mean: 130.406805423,
          "% Change": -3.3130949059,
        },
        { Years: 2026, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 130.406805423, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 130.406805423, "% Change": 0.0 },
      ],
    },
    {
      "San Bernardino": [
        { Years: 2018, predicted_mean: 2012.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 2664.4411746278,
          "% Change": 32.4274937688,
        },
        {
          Years: 2020,
          predicted_mean: 2588.8972261134,
          "% Change": -2.8352642661,
        },
        {
          Years: 2021,
          predicted_mean: 1533.7098001095,
          "% Change": -40.7581813353,
        },
        {
          Years: 2022,
          predicted_mean: 1914.6169184282,
          "% Change": 24.8356708871,
        },
        {
          Years: 2024,
          predicted_mean: 2598.4436271558,
          "% Change": 35.7161112568,
        },
        {
          Years: 2025,
          predicted_mean: 2626.7054659313,
          "% Change": 1.0876448687,
        },
        { Years: 2026, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2626.7054659313, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2626.7054659313, "% Change": 0.0 },
      ],
    },
    {
      Madera: [
        { Years: 2018, predicted_mean: 164.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 23.1117192946,
          "% Change": -85.907488235,
        },
        {
          Years: 2020,
          predicted_mean: 30.9387524126,
          "% Change": 33.8660790146,
        },
        {
          Years: 2021,
          predicted_mean: 25.0188147865,
          "% Change": -19.1343773244,
        },
        {
          Years: 2022,
          predicted_mean: 33.9349713249,
          "% Change": 35.6378054457,
        },
        {
          Years: 2024,
          predicted_mean: 30.0816734488,
          "% Change": -11.3549466103,
        },
        {
          Years: 2025,
          predicted_mean: 27.1467411547,
          "% Change": -9.756545955,
        },
        { Years: 2026, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 27.1467411547, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 27.1467411547, "% Change": 0.0 },
      ],
    },
    {
      "Santa Clara": [
        { Years: 2018, predicted_mean: 528.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 2156.3352684851,
          "% Change": 308.3968311525,
        },
        {
          Years: 2020,
          predicted_mean: 1900.3587680901,
          "% Change": -11.8709044988,
        },
        {
          Years: 2021,
          predicted_mean: 1159.254834224,
          "% Change": -38.9981063739,
        },
        {
          Years: 2024,
          predicted_mean: 1905.2741602688,
          "% Change": 64.3533504472,
        },
        {
          Years: 2025,
          predicted_mean: 2028.3207304707,
          "% Change": 6.458208103,
        },
        { Years: 2026, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2028.3207304707, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2028.3207304707, "% Change": 0.0 },
      ],
    },
    {
      "Los Angeles": [
        { Years: 2018, predicted_mean: 28.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 13020.7610487822,
          "% Change": 46402.718031365,
        },
        {
          Years: 2020,
          predicted_mean: 13004.666931036,
          "% Change": -0.1236035105,
        },
        {
          Years: 2021,
          predicted_mean: 6724.0845247092,
          "% Change": -48.2948347669,
        },
        {
          Years: 2022,
          predicted_mean: 8544.6499701766,
          "% Change": 27.0752909006,
        },
        {
          Years: 2024,
          predicted_mean: 13005.1023385935,
          "% Change": 52.2016979512,
        },
        {
          Years: 2025,
          predicted_mean: 13012.7471241774,
          "% Change": 0.0587829714,
        },
        { Years: 2026, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 13012.7471241774, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 13012.7471241774, "% Change": 0.0 },
      ],
    },
    {
      "Del Norte": [
        { Years: 2018, predicted_mean: 576.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 48.3395934097,
          "% Change": -91.6077094775,
        },
        {
          Years: 2020,
          predicted_mean: 25.5440750427,
          "% Change": -47.1570337255,
        },
        {
          Years: 2021,
          predicted_mean: 28.2213580359,
          "% Change": 10.4810332286,
        },
        {
          Years: 2022,
          predicted_mean: 29.9766623635,
          "% Change": 6.2197727175,
        },
        {
          Years: 2024,
          predicted_mean: 25.9598269694,
          "% Change": -13.3998753609,
        },
        {
          Years: 2025,
          predicted_mean: 37.2766458352,
          "% Change": 43.5935835748,
        },
        { Years: 2026, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 37.2766458352, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 37.2766458352, "% Change": 0.0 },
      ],
    },
    {
      Yuba: [
        { Years: 2018, predicted_mean: 508.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 233.3501045747,
          "% Change": -54.0649400444,
        },
        {
          Years: 2020,
          predicted_mean: 186.4883917516,
          "% Change": -20.0821477704,
        },
        {
          Years: 2021,
          predicted_mean: 117.8370632698,
          "% Change": -36.8126551133,
        },
        {
          Years: 2024,
          predicted_mean: 192.5790412787,
          "% Change": 63.4282422991,
        },
        {
          Years: 2025,
          predicted_mean: 210.1275158249,
          "% Change": 9.1123491059,
        },
        { Years: 2026, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 210.1275158249, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 210.1275158249, "% Change": 0.0 },
      ],
    },
    {
      Tulare: [
        { Years: 2018, predicted_mean: 876.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 612.2247614779,
          "% Change": -30.1113285984,
        },
        {
          Years: 2020,
          predicted_mean: 536.9174726879,
          "% Change": -12.3005950638,
        },
        {
          Years: 2021,
          predicted_mean: 328.7807868803,
          "% Change": -38.7651168746,
        },
        {
          Years: 2024,
          predicted_mean: 546.6309711887,
          "% Change": 66.2600106215,
        },
        {
          Years: 2025,
          predicted_mean: 574.7673194664,
          "% Change": 5.1472290742,
        },
        { Years: 2026, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 574.7673194664, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 574.7673194664, "% Change": 0.0 },
      ],
    },
    {
      "San Benito": [
        { Years: 2018, predicted_mean: 20.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 18.6720021001,
          "% Change": -6.6399894997,
        },
        {
          Years: 2020,
          predicted_mean: 18.170954633,
          "% Change": -2.6834158671,
        },
        {
          Years: 2021,
          predicted_mean: 12.5831998001,
          "% Change": -30.7510251704,
        },
        {
          Years: 2022,
          predicted_mean: 14.6719081771,
          "% Change": 16.5991831182,
        },
        {
          Years: 2024,
          predicted_mean: 18.1699718586,
          "% Change": 23.8419136718,
        },
        {
          Years: 2025,
          predicted_mean: 18.3216748442,
          "% Change": 0.8349104048,
        },
        { Years: 2026, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 18.3216748442, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 18.3216748442, "% Change": 0.0 },
      ],
    },
    {
      Humboldt: [
        { Years: 2018, predicted_mean: 2.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 154.7022433235,
          "% Change": 7635.1121661772,
        },
        {
          Years: 2020,
          predicted_mean: 127.9314427107,
          "% Change": -17.3047268338,
        },
        {
          Years: 2021,
          predicted_mean: 115.9559663122,
          "% Change": -9.3608546458,
        },
        {
          Years: 2022,
          predicted_mean: 93.6221481086,
          "% Change": -19.2606028943,
        },
        {
          Years: 2024,
          predicted_mean: 131.7689030994,
          "% Change": 40.7454387252,
        },
        {
          Years: 2025,
          predicted_mean: 141.5495278117,
          "% Change": 7.4225591032,
        },
        { Years: 2026, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 141.5495278117, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 141.5495278117, "% Change": 0.0 },
      ],
    },
    {
      Riverside: [
        { Years: 2018, predicted_mean: 554.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 2555.8134125358,
          "% Change": 361.3381611076,
        },
        {
          Years: 2020,
          predicted_mean: 2606.1799155093,
          "% Change": 1.9706643187,
        },
        {
          Years: 2021,
          predicted_mean: 1373.3316771346,
          "% Change": -47.3048016002,
        },
        {
          Years: 2022,
          predicted_mean: 1766.5717294187,
          "% Change": 28.6340189214,
        },
        {
          Years: 2024,
          predicted_mean: 2599.8522819074,
          "% Change": 47.1693585158,
        },
        {
          Years: 2025,
          predicted_mean: 2580.9560450001,
          "% Change": -0.7268196366,
        },
        { Years: 2026, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2580.9560450001, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2580.9560450001, "% Change": 0.0 },
      ],
    },
    {
      Modoc: [
        { Years: 2018, predicted_mean: 46.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 2.9026221076,
          "% Change": -93.6899519399,
        },
        {
          Years: 2020,
          predicted_mean: 2.4552215177,
          "% Change": -15.4136698937,
        },
        {
          Years: 2021,
          predicted_mean: 3.1991876148,
          "% Change": 30.3013838764,
        },
        {
          Years: 2022,
          predicted_mean: 3.1241758056,
          "% Change": -2.3447142918,
        },
        {
          Years: 2024,
          predicted_mean: 2.6199629423,
          "% Change": -16.1390681773,
        },
        {
          Years: 2025,
          predicted_mean: 2.9643298893,
          "% Change": 13.1439625105,
        },
        { Years: 2026, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 2.9643298893, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 2.9643298893, "% Change": 0.0 },
      ],
    },
    {
      Inyo: [
        { Years: 2018, predicted_mean: 774.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 9.9880821366,
          "% Change": -98.7095501115,
        },
        {
          Years: 2020,
          predicted_mean: 6.9397408087,
          "% Change": -30.5197863437,
        },
        {
          Years: 2021,
          predicted_mean: 6.014379528,
          "% Change": -13.3342340325,
        },
        {
          Years: 2022,
          predicted_mean: 3.4807398228,
          "% Change": -42.1263688707,
        },
        {
          Years: 2024,
          predicted_mean: 7.1477496626,
          "% Change": 105.3514490185,
        },
        { Years: 2025, predicted_mean: 8.2163843862, "% Change": 14.950645645 },
        { Years: 2026, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 8.2163843862, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 8.2163843862, "% Change": 0.0 },
      ],
    },
    {
      Glenn: [
        { Years: 2018, predicted_mean: 46.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1.1144236974,
          "% Change": -97.5773397882,
        },
        {
          Years: 2020,
          predicted_mean: 0.5931311684,
          "% Change": -46.7768704337,
        },
        {
          Years: 2021,
          predicted_mean: 1.373364834,
          "% Change": 131.5448769413,
        },
        {
          Years: 2022,
          predicted_mean: 0.6194106126,
          "% Change": -54.8983200008,
        },
        {
          Years: 2024,
          predicted_mean: 0.4814510794,
          "% Change": -22.2727106087,
        },
        {
          Years: 2025,
          predicted_mean: 0.7798589668,
          "% Change": 61.9809364106,
        },
        { Years: 2026, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.7798589668, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.7798589668, "% Change": 0.0 },
      ],
    },
    {
      Sonoma: [
        { Years: 2018, predicted_mean: 232.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 576.8541248337,
          "% Change": 148.6440193249,
        },
        {
          Years: 2020,
          predicted_mean: 606.3270097626,
          "% Change": 5.109244029,
        },
        {
          Years: 2021,
          predicted_mean: 289.2296972397,
          "% Change": -52.298068108,
        },
        {
          Years: 2024,
          predicted_mean: 602.5807485204,
          "% Change": 108.3398607651,
        },
        {
          Years: 2025,
          predicted_mean: 591.7698563793,
          "% Change": -1.7940984951,
        },
        { Years: 2026, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 591.7698563793, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 591.7698563793, "% Change": 0.0 },
      ],
    },
  ];

  return data;
};

const getInfantMortalityDataDetails = () => {
  // const { data, error, isLoading } = useSWR(
  //   "https://raw.githubusercontent.com/SumukhP-dev/Healthcare_Policy_Impact_Tracker/refs/heads/main/frontend-next-webapp/my-app/public/datasets/2019-medi-cal-expansions/infant-mortality-data/infant_mortality_merged_json_datasets.json",
  //   fetcher
  // );
  // return {
  //   data: data,
  //   error: error,
  // };
  const data = [
    {
      Tuolumne: [
        { Years: 2018, predicted_mean: 67.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.4252800787, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.4365319194,
          "% Change": 2.6457483513,
        },
        { Years: 2026, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.4365319194, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.4365319194, "% Change": 0.0 },
      ],
    },
    {
      "Santa Barbara": [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 24.3122759715, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 24.1270861457,
          "% Change": -0.7617132435,
        },
        {
          Years: 2021,
          predicted_mean: 22.7997849361,
          "% Change": -5.5012909621,
        },
        {
          Years: 2024,
          predicted_mean: 23.9561272814,
          "% Change": 5.0717247926,
        },
        { Years: 2025, predicted_mean: 24.2849222895, "% Change": 1.37248815 },
        { Years: 2026, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 24.2849222895, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 24.2849222895, "% Change": 0.0 },
      ],
    },
    {
      Orange: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 98.3164149875, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 100.9166600664,
          "% Change": 2.6447720649,
        },
        {
          Years: 2021,
          predicted_mean: 105.9327482025,
          "% Change": 4.9705253155,
        },
        {
          Years: 2024,
          predicted_mean: 100.2658551121,
          "% Change": -5.3495195646,
        },
        {
          Years: 2025,
          predicted_mean: 99.4893813176,
          "% Change": -0.7744149728,
        },
        { Years: 2026, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 99.4893813176, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 99.4893813176, "% Change": 0.0 },
      ],
    },
    {
      Colusa: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.0451043259, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0135006945,
          "% Change": -129.9321499982,
        },
        { Years: 2026, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0135006945, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0135006945, "% Change": 0.0 },
      ],
    },
    {
      Monterey: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 24.509630738, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 25.9169303812,
          "% Change": 5.7418231154,
        },
        {
          Years: 2021,
          predicted_mean: 33.4601767346,
          "% Change": 29.1054775484,
        },
        {
          Years: 2024,
          predicted_mean: 25.5882818637,
          "% Change": -23.5261604663,
        },
        {
          Years: 2025,
          predicted_mean: 25.1627764359,
          "% Change": -1.6628917489,
        },
        { Years: 2026, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 25.1627764359, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 25.1627764359, "% Change": 0.0 },
      ],
    },
    {
      Marin: [
        { Years: 2018, predicted_mean: 39196.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.025505606, "% Change": -99.999934928 },
        {
          Years: 2020,
          predicted_mean: -0.0445029153,
          "% Change": -274.4828776999,
        },
        {
          Years: 2021,
          predicted_mean: 0.021172244,
          "% Change": -147.574959618,
        },
        {
          Years: 2024,
          predicted_mean: -0.3558037532,
          "% Change": -1780.5198058194,
        },
        {
          Years: 2025,
          predicted_mean: -0.134035943,
          "% Change": -62.3286877148,
        },
        { Years: 2026, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.134035943, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.134035943, "% Change": 0.0 },
      ],
    },
    {
      Lassen: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.3411136034, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.1584889708,
          "% Change": -53.5377747439,
        },
        { Years: 2026, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.1584889708, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.1584889708, "% Change": 0.0 },
      ],
    },
    {
      Ventura: [
        { Years: 2018, predicted_mean: 45.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 40.4899594136,
          "% Change": -10.0223124142,
        },
        {
          Years: 2020,
          predicted_mean: 30.2277141991,
          "% Change": -25.3451605364,
        },
        {
          Years: 2021,
          predicted_mean: 20.3549858331,
          "% Change": -32.661180733,
        },
        {
          Years: 2024,
          predicted_mean: 31.2537276694,
          "% Change": 53.5433526005,
        },
        {
          Years: 2025,
          predicted_mean: 35.0506879072,
          "% Change": 12.1488235832,
        },
        { Years: 2026, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 35.0506879072, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 35.0506879072, "% Change": 0.0 },
      ],
    },
    {
      Sierra: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.2049496737, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0808741219,
          "% Change": -139.4604785166,
        },
        { Years: 2026, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0808741219, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0808741219, "% Change": 0.0 },
      ],
    },
    {
      Trinity: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.114219397, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0194107343,
          "% Change": -116.9942538631,
        },
        { Years: 2026, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0194107343, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0194107343, "% Change": 0.0 },
      ],
    },
    {
      Stanislaus: [
        { Years: 2018, predicted_mean: 106.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 34.4414591704,
          "% Change": -67.5080573864,
        },
        {
          Years: 2020,
          predicted_mean: 37.6528498687,
          "% Change": 9.3242004714,
        },
        {
          Years: 2021,
          predicted_mean: 41.7454830772,
          "% Change": 10.8693849808,
        },
        {
          Years: 2024,
          predicted_mean: 37.9192473481,
          "% Change": -9.165628104,
        },
        {
          Years: 2025,
          predicted_mean: 36.2866085303,
          "% Change": -4.3055675731,
        },
        { Years: 2026, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 36.2866085303, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 36.2866085303, "% Change": 0.0 },
      ],
    },
    {
      Sacramento: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 95.9115020221, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 97.2984827057,
          "% Change": 1.4461046426,
        },
        {
          Years: 2021,
          predicted_mean: 97.7404793894,
          "% Change": 0.4542688348,
        },
        {
          Years: 2024,
          predicted_mean: 97.6149594336,
          "% Change": -0.1284216699,
        },
        {
          Years: 2025,
          predicted_mean: 96.9131390184,
          "% Change": -0.7189680959,
        },
        { Years: 2026, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 96.9131390184, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 96.9131390184, "% Change": 0.0 },
      ],
    },
    {
      Placer: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 11.7141685302, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 4.7087408005,
          "% Change": -59.8030300796,
        },
        {
          Years: 2021,
          predicted_mean: -2.379404163,
          "% Change": -150.5316445276,
        },
        {
          Years: 2024,
          predicted_mean: 4.4678446973,
          "% Change": -287.7715760417,
        },
        { Years: 2025, predicted_mean: 8.0645909907, "% Change": 80.502939046 },
        { Years: 2026, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 8.0645909907, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 8.0645909907, "% Change": 0.0 },
      ],
    },
    {
      Napa: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: -0.0558940919, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 0.0810627553,
          "% Change": -245.0292018905,
        },
        {
          Years: 2021,
          predicted_mean: -0.0360786523,
          "% Change": -144.5070638449,
        },
        {
          Years: 2024,
          predicted_mean: 0.1143465014,
          "% Change": -416.9367319853,
        },
        {
          Years: 2025,
          predicted_mean: 0.2497638821,
          "% Change": 118.427218098,
        },
        { Years: 2026, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.2497638821, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.2497638821, "% Change": 0.0 },
      ],
    },
    {
      Plumas: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.0895609056, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.0686256026,
          "% Change": -176.6245073231,
        },
        { Years: 2026, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.0686256026, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.0686256026, "% Change": 0.0 },
      ],
    },
    {
      "El Dorado": [
        { Years: 2018, predicted_mean: 71.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: -0.1582760971,
          "% Change": -100.2229240804,
        },
        {
          Years: 2020,
          predicted_mean: 0.1986798035,
          "% Change": -225.527358279,
        },
        {
          Years: 2021,
          predicted_mean: -0.0837572138,
          "% Change": -142.1568837517,
        },
        {
          Years: 2024,
          predicted_mean: 0.4575329644,
          "% Change": -646.2609651222,
        },
        {
          Years: 2025,
          predicted_mean: -0.0296459767,
          "% Change": -106.4795280365,
        },
        { Years: 2026, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.0296459767, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.0296459767, "% Change": 0.0 },
      ],
    },
    {
      Solano: [
        { Years: 2018, predicted_mean: 10.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 20.9860710478,
          "% Change": 109.8607104785,
        },
        {
          Years: 2020,
          predicted_mean: 20.0194811687,
          "% Change": -4.6058639414,
        },
        {
          Years: 2021,
          predicted_mean: 19.9913036906,
          "% Change": -0.1407502919,
        },
        {
          Years: 2024,
          predicted_mean: 20.0616525622,
          "% Change": 0.3518973687,
        },
        {
          Years: 2025,
          predicted_mean: 20.4714388816,
          "% Change": 2.0426349133,
        },
        { Years: 2026, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 20.4714388816, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 20.4714388816, "% Change": 0.0 },
      ],
    },
    {
      "San Francisco": [
        { Years: 2018, predicted_mean: 10.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 23.0826928151,
          "% Change": 130.8269281511,
        },
        {
          Years: 2020,
          predicted_mean: 20.8643694435,
          "% Change": -9.610331816,
        },
        {
          Years: 2021,
          predicted_mean: 18.0627591556,
          "% Change": -13.4277256521,
        },
        {
          Years: 2024,
          predicted_mean: 21.681769368,
          "% Change": 20.0357552314,
        },
        {
          Years: 2025,
          predicted_mean: 22.3812837718,
          "% Change": 3.2262791467,
        },
        { Years: 2026, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 22.3812837718, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 22.3812837718, "% Change": 0.0 },
      ],
    },
    {
      "Contra Costa": [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 50.4649057395, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 46.8152544237,
          "% Change": -7.232058125,
        },
        {
          Years: 2021,
          predicted_mean: 44.2835323248,
          "% Change": -5.4078999036,
        },
        { Years: 2024, predicted_mean: 47.5404146934, "% Change": 7.354612872 },
        {
          Years: 2025,
          predicted_mean: 48.9382049235,
          "% Change": 2.9402146346,
        },
        { Years: 2026, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 48.9382049235, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 48.9382049235, "% Change": 0.0 },
      ],
    },
    {
      "United States": [
        { Years: 2018, predicted_mean: 451.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 24324.6740227472,
          "% Change": 5293.4975660193,
        },
        {
          Years: 2020,
          predicted_mean: 17404.4359750069,
          "% Change": -28.4494585262,
        },
        {
          Years: 2021,
          predicted_mean: 510.6844809938,
          "% Change": -97.0657797717,
        },
        {
          Years: 2024,
          predicted_mean: 18269.1816318059,
          "% Change": 3477.3911900074,
        },
        {
          Years: 2025,
          predicted_mean: 20864.6850173415,
          "% Change": 14.2070041113,
        },
        { Years: 2026, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 20864.6850173415, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 20864.6850173415, "% Change": 0.0 },
      ],
    },
    {
      Mono: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.2104047971, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0234924768,
          "% Change": -111.1653712605,
        },
        { Years: 2026, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0234924768, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0234924768, "% Change": 0.0 },
      ],
    },
    {
      Lake: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: -0.1601712583, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 0.2769216346,
          "% Change": -272.8909652543,
        },
        {
          Years: 2021,
          predicted_mean: -0.1318273811,
          "% Change": -147.6045800026,
        },
        {
          Years: 2024,
          predicted_mean: 0.2788596786,
          "% Change": -311.5339592935,
        },
        {
          Years: 2025,
          predicted_mean: 0.0408290104,
          "% Change": -85.3585822849,
        },
        { Years: 2026, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0408290104, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0408290104, "% Change": 0.0 },
      ],
    },
    {
      "San Diego": [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 135.2574682166, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 120.3695984374,
          "% Change": -11.0070593332,
        },
        {
          Years: 2021,
          predicted_mean: 104.3350411607,
          "% Change": -13.3211022425,
        },
        {
          Years: 2024,
          predicted_mean: 120.3104942632,
          "% Change": 15.3116852448,
        },
        {
          Years: 2025,
          predicted_mean: 127.6282675348,
          "% Change": 6.0824064571,
        },
        { Years: 2026, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 127.6282675348, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 127.6282675348, "% Change": 0.0 },
      ],
    },
    {
      California: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 36389.256201351, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 35445.8345034432,
          "% Change": -2.5925830764,
        },
        {
          Years: 2021,
          predicted_mean: 33534.3363348209,
          "% Change": -5.3927300497,
        },
        {
          Years: 2024,
          predicted_mean: 35552.9670829926,
          "% Change": 6.0195935534,
        },
        {
          Years: 2025,
          predicted_mean: 35917.6935938114,
          "% Change": 1.0258679957,
        },
        { Years: 2026, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 35917.6935938114, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 35917.6935938114, "% Change": 0.0 },
      ],
    },
    {
      Nevada: [
        { Years: 2018, predicted_mean: 14.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.3182877486, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.3976333859,
          "% Change": 24.9289008446,
        },
        { Years: 2026, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.3976333859, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.3976333859, "% Change": 0.0 },
      ],
    },
    {
      Mariposa: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.3602939629, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.2752216636,
          "% Change": -23.6119136167,
        },
        { Years: 2026, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.2752216636, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.2752216636, "% Change": 0.0 },
      ],
    },
    {
      Alameda: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 59.2638251019, "% Change": null },
        { Years: 2020, predicted_mean: 59.974848376, "% Change": 1.1997593353 },
        {
          Years: 2021,
          predicted_mean: 57.6820282477,
          "% Change": -3.8229694452,
        },
        {
          Years: 2024,
          predicted_mean: 59.5625592649,
          "% Change": 3.2601679836,
        },
        {
          Years: 2025,
          predicted_mean: 59.3246863551,
          "% Change": -0.3993665026,
        },
        { Years: 2026, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 59.3246863551, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 59.3246863551, "% Change": 0.0 },
      ],
    },
    {
      Tehama: [
        { Years: 2018, predicted_mean: 27.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.1120526059, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0634581594,
          "% Change": -43.3675291533,
        },
        { Years: 2026, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0634581594, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0634581594, "% Change": 0.0 },
      ],
    },
    {
      Butte: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 9.6182636144, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 2.5383478995,
          "% Change": -73.6090837053,
        },
        {
          Years: 2021,
          predicted_mean: 9.0026863154,
          "% Change": 254.6671564319,
        },
        {
          Years: 2024,
          predicted_mean: 2.9752059507,
          "% Change": -66.952020247,
        },
        {
          Years: 2025,
          predicted_mean: 6.0616333222,
          "% Change": 103.738276361,
        },
        { Years: 2026, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6.0616333222, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6.0616333222, "% Change": 0.0 },
      ],
    },
    {
      "San Mateo": [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 27.0846335416, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 22.3499921888,
          "% Change": -17.4809134689,
        },
        {
          Years: 2021,
          predicted_mean: 18.4523247405,
          "% Change": -17.4392340515,
        },
        {
          Years: 2024,
          predicted_mean: 22.8098406304,
          "% Change": 23.6149967613,
        },
        {
          Years: 2025,
          predicted_mean: 24.6925684537,
          "% Change": 8.2540156847,
        },
        { Years: 2026, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 24.6925684537, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 24.6925684537, "% Change": 0.0 },
      ],
    },
    {
      Amador: [
        { Years: 2018, predicted_mean: 109.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.0633050021, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.0378034226,
          "% Change": -40.2836721669,
        },
        { Years: 2026, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.0378034226, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.0378034226, "% Change": 0.0 },
      ],
    },
    {
      Sutter: [
        { Years: 2018, predicted_mean: 10.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 8.8473739306,
          "% Change": -11.5262606938,
        },
        {
          Years: 2020,
          predicted_mean: 1.085237383,
          "% Change": -87.7337909361,
        },
        {
          Years: 2021,
          predicted_mean: -0.4032000228,
          "% Change": -137.1531638212,
        },
        {
          Years: 2024,
          predicted_mean: 1.6256479366,
          "% Change": -503.1864694493,
        },
        {
          Years: 2025,
          predicted_mean: 5.0622064449,
          "% Change": 211.3962335292,
        },
        { Years: 2026, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 5.0622064449, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 5.0622064449, "% Change": 0.0 },
      ],
    },
    {
      Kern: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 79.3239030107, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 76.8516111181,
          "% Change": -3.1167047999,
        },
        {
          Years: 2021,
          predicted_mean: 71.7201804571,
          "% Change": -6.6770632214,
        },
        {
          Years: 2024,
          predicted_mean: 77.4082231292,
          "% Change": 7.9308817071,
        },
        { Years: 2025, predicted_mean: 78.223356044, "% Change": 1.0530314246 },
        { Years: 2026, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 78.223356044, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 78.223356044, "% Change": 0.0 },
      ],
    },
    {
      Siskiyou: [
        { Years: 2018, predicted_mean: 138.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.0648204976, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.1300089656,
          "% Change": -300.5676759773,
        },
        { Years: 2026, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.1300089656, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.1300089656, "% Change": 0.0 },
      ],
    },
    {
      Mendocino: [
        { Years: 2018, predicted_mean: 101.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 0.458795698,
          "% Change": -99.5457468336,
        },
        {
          Years: 2020,
          predicted_mean: -0.5888867646,
          "% Change": -228.3549011262,
        },
        {
          Years: 2021,
          predicted_mean: 0.2494875903,
          "% Change": -142.3659700396,
        },
        {
          Years: 2024,
          predicted_mean: 0.3350058471,
          "% Change": 34.2775593572,
        },
        {
          Years: 2025,
          predicted_mean: 0.2031837849,
          "% Change": -39.3491825031,
        },
        { Years: 2026, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.2031837849, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.2031837849, "% Change": 0.0 },
      ],
    },
    {
      Yolo: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: -0.0664571464, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 0.2351379527,
          "% Change": -453.8189124144,
        },
        {
          Years: 2021,
          predicted_mean: -0.1373398554,
          "% Change": -158.4082041349,
        },
        {
          Years: 2024,
          predicted_mean: 0.4129282596,
          "% Change": -400.6616385029,
        },
        {
          Years: 2025,
          predicted_mean: 0.3570611009,
          "% Change": -13.5295072231,
        },
        { Years: 2026, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.3570611009, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.3570611009, "% Change": 0.0 },
      ],
    },
    {
      "San Luis Obispo": [
        { Years: 2018, predicted_mean: 160.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 10.1712127377,
          "% Change": -93.6429920389,
        },
        {
          Years: 2020,
          predicted_mean: 5.188037919,
          "% Change": -48.9929268728,
        },
        {
          Years: 2021,
          predicted_mean: -2.8903272164,
          "% Change": -155.7113741547,
        },
        {
          Years: 2024,
          predicted_mean: 5.7443084707,
          "% Change": -298.7424966342,
        },
        { Years: 2025, predicted_mean: 7.786124776, "% Change": 35.5450323696 },
        { Years: 2026, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 7.786124776, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 7.786124776, "% Change": 0.0 },
      ],
    },
    {
      "San Joaquin": [
        { Years: 2018, predicted_mean: 174.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 59.0907409852,
          "% Change": -66.0398040315,
        },
        {
          Years: 2020,
          predicted_mean: 51.8868334989,
          "% Change": -12.1912627361,
        },
        {
          Years: 2021,
          predicted_mean: 46.8085020961,
          "% Change": -9.7873218703,
        },
        {
          Years: 2024,
          predicted_mean: 52.5157349024,
          "% Change": 12.1927268568,
        },
        {
          Years: 2025,
          predicted_mean: 55.1193129441,
          "% Change": 4.9577103824,
        },
        { Years: 2026, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 55.1193129441, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 55.1193129441, "% Change": 0.0 },
      ],
    },
    {
      Calaveras: [
        { Years: 2018, predicted_mean: 25.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.1118003939, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.2332954768,
          "% Change": 108.6714264998,
        },
        { Years: 2026, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.2332954768, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.2332954768, "% Change": 0.0 },
      ],
    },
    {
      Shasta: [
        { Years: 2018, predicted_mean: 63.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 18.6653355196,
          "% Change": -70.3724833022,
        },
        {
          Years: 2020,
          predicted_mean: 9.5226089254,
          "% Change": -48.9823854736,
        },
        {
          Years: 2021,
          predicted_mean: 0.7639596782,
          "% Change": -91.9774120286,
        },
        {
          Years: 2024,
          predicted_mean: 10.5196093748,
          "% Change": 1276.9848952456,
        },
        {
          Years: 2025,
          predicted_mean: 14.2990618091,
          "% Change": 35.9276879935,
        },
        { Years: 2026, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 14.2990618091, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 14.2990618091, "% Change": 0.0 },
      ],
    },
    {
      Merced: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 19.1643443165, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 16.6905379543,
          "% Change": -12.9083798612,
        },
        {
          Years: 2021,
          predicted_mean: 14.1515222859,
          "% Change": -15.2123057705,
        },
        {
          Years: 2024,
          predicted_mean: 17.297532333,
          "% Change": 22.2308949067,
        },
        { Years: 2025, predicted_mean: 18.19916761, "% Change": 5.2125081178 },
        { Years: 2026, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 18.19916761, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 18.19916761, "% Change": 0.0 },
      ],
    },
    {
      Alpine: [
        { Years: 2018, predicted_mean: 25.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.1490323745, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0505349675,
          "% Change": -66.0912820891,
        },
        { Years: 2026, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0505349675, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0505349675, "% Change": 0.0 },
      ],
    },
    {
      "Santa Cruz": [
        { Years: 2018, predicted_mean: 20.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 8.6431091815,
          "% Change": -56.7844540923,
        },
        {
          Years: 2020,
          predicted_mean: 3.7852258325,
          "% Change": -56.2052757519,
        },
        {
          Years: 2021,
          predicted_mean: -2.0963234442,
          "% Change": -155.3817271923,
        },
        {
          Years: 2024,
          predicted_mean: 4.5952225739,
          "% Change": -319.2038917794,
        },
        {
          Years: 2025,
          predicted_mean: 6.5611863028,
          "% Change": 42.7827748756,
        },
        { Years: 2026, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6.5611863028, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6.5611863028, "% Change": 0.0 },
      ],
    },
    {
      Fresno: [
        { Years: 2018, predicted_mean: 69.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 86.8099960434,
          "% Change": 25.8115884687,
        },
        {
          Years: 2020,
          predicted_mean: 80.7523464901,
          "% Change": -6.9780553271,
        },
        {
          Years: 2021,
          predicted_mean: 75.2136404878,
          "% Change": -6.8588793304,
        },
        { Years: 2024, predicted_mean: 80.912652405, "% Change": 7.5770988881 },
        {
          Years: 2025,
          predicted_mean: 83.4695371527,
          "% Change": 3.1600555312,
        },
        { Years: 2026, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 83.4695371527, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 83.4695371527, "% Change": 0.0 },
      ],
    },
    {
      Imperial: [
        { Years: 2018, predicted_mean: 10.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: -0.0205490529,
          "% Change": -100.2054905289,
        },
        {
          Years: 2020,
          predicted_mean: 0.0431819999,
          "% Change": -310.1410715835,
        },
        {
          Years: 2021,
          predicted_mean: -0.0220410067,
          "% Change": -151.0421165392,
        },
        {
          Years: 2024,
          predicted_mean: -0.140040979,
          "% Change": 535.3656196237,
        },
        {
          Years: 2025,
          predicted_mean: -0.1405119413,
          "% Change": 0.3363032069,
        },
        { Years: 2026, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.1405119413, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.1405119413, "% Change": 0.0 },
      ],
    },
    {
      Kings: [
        { Years: 2018, predicted_mean: 12.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 1.3585028086,
          "% Change": -88.6791432618,
        },
        {
          Years: 2020,
          predicted_mean: 9.2000300851,
          "% Change": 577.2183338092,
        },
        {
          Years: 2021,
          predicted_mean: 14.7742509703,
          "% Change": 60.5891593147,
        },
        {
          Years: 2024,
          predicted_mean: 9.2211418902,
          "% Change": -37.5864000909,
        },
        { Years: 2025, predicted_mean: 5.3391783226, "% Change": -42.09851246 },
        { Years: 2026, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 5.3391783226, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 5.3391783226, "% Change": 0.0 },
      ],
    },
    {
      "San Bernardino": [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 159.8726466278, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 157.2491774124,
          "% Change": -1.6409744072,
        },
        {
          Years: 2021,
          predicted_mean: 154.8762649393,
          "% Change": -1.509014236,
        },
        {
          Years: 2024,
          predicted_mean: 157.2762429527,
          "% Change": 1.5496099511,
        },
        {
          Years: 2025,
          predicted_mean: 158.6163443923,
          "% Change": 0.8520685734,
        },
        { Years: 2026, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 158.6163443923, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 158.6163443923, "% Change": 0.0 },
      ],
    },
    {
      Madera: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 7.3231362282, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 6.5623106624,
          "% Change": -10.3893406066,
        },
        {
          Years: 2021,
          predicted_mean: 13.1125616841,
          "% Change": 99.816228745,
        },
        {
          Years: 2024,
          predicted_mean: 6.3887620717,
          "% Change": -51.2775441932,
        },
        { Years: 2025, predicted_mean: 6.8284270324, "% Change": 6.8818490311 },
        { Years: 2026, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6.8284270324, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6.8284270324, "% Change": 0.0 },
      ],
    },
    {
      "Santa Clara": [
        { Years: 2018, predicted_mean: 23.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 47.8133121482,
          "% Change": 107.8839658617,
        },
        {
          Years: 2020,
          predicted_mean: 50.5953877874,
          "% Change": 5.8186214555,
        },
        {
          Years: 2021,
          predicted_mean: 51.0349364394,
          "% Change": 0.8687524124,
        },
        {
          Years: 2024,
          predicted_mean: 49.8481748189,
          "% Change": -2.3253906114,
        },
        {
          Years: 2025,
          predicted_mean: 48.9361793097,
          "% Change": -1.8295464427,
        },
        { Years: 2026, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 48.9361793097, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 48.9361793097, "% Change": 0.0 },
      ],
    },
    {
      "Los Angeles": [
        { Years: 2018, predicted_mean: 14.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 394.5801640005,
          "% Change": 2718.4297428609,
        },
        {
          Years: 2020,
          predicted_mean: 386.8650354021,
          "% Change": -1.9552753286,
        },
        {
          Years: 2021,
          predicted_mean: 377.3662639132,
          "% Change": -2.4553191991,
        },
        {
          Years: 2024,
          predicted_mean: 388.0904054838,
          "% Change": 2.8418389761,
        },
        {
          Years: 2025,
          predicted_mean: 390.8816035396,
          "% Change": 0.7192133628,
        },
        { Years: 2026, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 390.8816035396, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 390.8816035396, "% Change": 0.0 },
      ],
    },
    {
      "Del Norte": [
        { Years: 2018, predicted_mean: 32.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.3139512882, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.180089827,
          "% Change": -42.6376531026,
        },
        { Years: 2026, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.180089827, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.180089827, "% Change": 0.0 },
      ],
    },
    {
      Yuba: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 10.0991318325, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 2.8498577362,
          "% Change": -71.7811611583,
        },
        {
          Years: 2021,
          predicted_mean: -1.289131874,
          "% Change": -145.2349553312,
        },
        {
          Years: 2024,
          predicted_mean: 3.6107333064,
          "% Change": -380.0902979183,
        },
        {
          Years: 2025,
          predicted_mean: 6.6134610089,
          "% Change": 83.1611600112,
        },
        { Years: 2026, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6.6134610089, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6.6134610089, "% Change": 0.0 },
      ],
    },
    {
      Tulare: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 32.1717459976, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 36.5187226018,
          "% Change": 13.5117833036,
        },
        { Years: 2021, predicted_mean: 38.31826112, "% Change": 4.9277148541 },
        {
          Years: 2024,
          predicted_mean: 36.9445048697,
          "% Change": -3.5851215847,
        },
        {
          Years: 2025,
          predicted_mean: 34.5156799001,
          "% Change": -6.5742523231,
        },
        { Years: 2026, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 34.5156799001, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 34.5156799001, "% Change": 0.0 },
      ],
    },
    {
      "San Benito": [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.4925562686, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.1997966972,
          "% Change": -59.4367770851,
        },
        { Years: 2026, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.1997966972, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.1997966972, "% Change": 0.0 },
      ],
    },
    {
      Humboldt: [
        { Years: 2018, predicted_mean: 33.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 8.5766535406,
          "% Change": -74.010140786,
        },
        {
          Years: 2020,
          predicted_mean: 4.1286756824,
          "% Change": -51.8614613171,
        },
        {
          Years: 2021,
          predicted_mean: -2.3138186364,
          "% Change": -156.0426348404,
        },
        {
          Years: 2024,
          predicted_mean: 4.1331274978,
          "% Change": -278.6279802916,
        },
        { Years: 2025, predicted_mean: 6.438209724, "% Change": 55.7708957054 },
        { Years: 2026, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6.438209724, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6.438209724, "% Change": 0.0 },
      ],
    },
    {
      Riverside: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 111.1838933081, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 114.6028487246,
          "% Change": 3.0750455977,
        },
        {
          Years: 2021,
          predicted_mean: 130.613479475,
          "% Change": 13.9705347018,
        },
        {
          Years: 2024,
          predicted_mean: 114.5772133636,
          "% Change": -12.2776501903,
        },
        {
          Years: 2025,
          predicted_mean: 112.876403945,
          "% Change": -1.4844220493,
        },
        { Years: 2026, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 112.876403945, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 112.876403945, "% Change": 0.0 },
      ],
    },
    {
      Modoc: [
        { Years: 2018, predicted_mean: 21498.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.2556959837, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.0142190871,
          "% Change": -105.5609348753,
        },
        { Years: 2026, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.0142190871, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.0142190871, "% Change": 0.0 },
      ],
    },
    {
      Inyo: [
        { Years: 2018, predicted_mean: 33.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": -100.0 },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: 0.1666478975, "% Change": null },
        {
          Years: 2025,
          predicted_mean: 0.1432573501,
          "% Change": -14.0359090967,
        },
        { Years: 2026, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 0.1432573501, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 0.1432573501, "% Change": 0.0 },
      ],
    },
    {
      Glenn: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 0.0, "% Change": null },
        { Years: 2020, predicted_mean: 0.0, "% Change": null },
        { Years: 2021, predicted_mean: 0.0, "% Change": null },
        { Years: 2024, predicted_mean: -0.1959842111, "% Change": null },
        {
          Years: 2025,
          predicted_mean: -0.1333368335,
          "% Change": -31.9655227553,
        },
        { Years: 2026, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2027, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2028, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2029, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2030, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2031, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2032, predicted_mean: -0.1333368335, "% Change": 0.0 },
        { Years: 2033, predicted_mean: -0.1333368335, "% Change": 0.0 },
      ],
    },
    {
      Sonoma: [
        { Years: 2018, predicted_mean: 0.0, "% Change": null },
        { Years: 2019, predicted_mean: 9.3963804872, "% Change": null },
        {
          Years: 2020,
          predicted_mean: 7.7272775315,
          "% Change": -17.7632542443,
        },
        {
          Years: 2021,
          predicted_mean: 11.623089262,
          "% Change": 50.4163557547,
        },
        {
          Years: 2024,
          predicted_mean: 8.3090650367,
          "% Change": -28.5124217023,
        },
        { Years: 2025, predicted_mean: 9.0859906475, "% Change": 9.3503373407 },
        { Years: 2026, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 9.0859906475, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 9.0859906475, "% Change": 0.0 },
      ],
    },
  ];

  return data;
};

const getCohsDataDetails = () => {
  // const { data, error, isLoading } = useSWR(
  //   "https://raw.githubusercontent.com/SumukhP-dev/Healthcare_Policy_Impact_Tracker/refs/heads/main/frontend-next-webapp/my-app/public/datasets/2019-medi-cal-expansions/cohs-data/cohs_merged_json_datasets.json",
  //   fetcher
  // );
  // return {
  //   data: data,
  //   error: error,
  // };
  const data = [
    {
      "Santa Barbara": [
        { Years: 2018, predicted_mean: 13370.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 4418.4956238428,
          "% Change": -66.9521643692,
        },
        {
          Years: 2020,
          predicted_mean: 3988.7742292133,
          "% Change": -9.7255136411,
        },
        {
          Years: 2021,
          predicted_mean: 3153.2231788421,
          "% Change": -20.9475643984,
        },
        {
          Years: 2022,
          predicted_mean: 2510.8440414026,
          "% Change": -20.3721430741,
        },
        {
          Years: 2023,
          predicted_mean: 2217.2692487707,
          "% Change": -11.6922750992,
        },
        {
          Years: 2024,
          predicted_mean: 1592.0957068149,
          "% Change": -28.1956529322,
        },
        {
          Years: 2024,
          predicted_mean: 3983.2855880159,
          "% Change": 150.1913403174,
        },
        {
          Years: 2025,
          predicted_mean: 3161.9079308218,
          "% Change": -20.620606759,
        },
        {
          Years: 2026,
          predicted_mean: 3219.9873346746,
          "% Change": 1.8368467749,
        },
        {
          Years: 2027,
          predicted_mean: 3667.0140791816,
          "% Change": 13.8828727583,
        },
        {
          Years: 2028,
          predicted_mean: 3831.4966076761,
          "% Change": 4.4854621483,
        },
        {
          Years: 2029,
          predicted_mean: 3852.1709005782,
          "% Change": 0.5395879214,
        },
        {
          Years: 2030,
          predicted_mean: 3853.2512115565,
          "% Change": 0.0280442121,
        },
        {
          Years: 2031,
          predicted_mean: 3853.2772537319,
          "% Change": 0.0006758494,
        },
        { Years: 2032, predicted_mean: 3853.2775713037, "% Change": 8.2416e-6 },
        { Years: 2033, predicted_mean: 3853.2775734622, "% Change": 5.6e-8 },
      ],
    },
    {
      Orange: [
        { Years: 2018, predicted_mean: 7746.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 24357.7623596801,
          "% Change": 214.4560077418,
        },
        {
          Years: 2020,
          predicted_mean: 21897.1587979044,
          "% Change": -10.1019277774,
        },
        {
          Years: 2021,
          predicted_mean: 19651.5709704211,
          "% Change": -10.2551561516,
        },
        {
          Years: 2022,
          predicted_mean: 19534.7689623921,
          "% Change": -0.5943647366,
        },
        {
          Years: 2023,
          predicted_mean: 14771.4659741475,
          "% Change": -24.383718064,
        },
        {
          Years: 2024,
          predicted_mean: 12408.281516918,
          "% Change": -15.9983068801,
        },
        {
          Years: 2024,
          predicted_mean: 21907.6754500697,
          "% Change": 76.5568859813,
        },
        {
          Years: 2025,
          predicted_mean: 19668.0164430433,
          "% Change": -10.2231704689,
        },
        {
          Years: 2026,
          predicted_mean: 18934.4640628909,
          "% Change": -3.7296713793,
        },
        {
          Years: 2027,
          predicted_mean: 19587.1852157203,
          "% Change": 3.4472650013,
        },
        {
          Years: 2028,
          predicted_mean: 20646.2395357096,
          "% Change": 5.4068734651,
        },
        {
          Years: 2029,
          predicted_mean: 21414.9132092783,
          "% Change": 3.7230686597,
        },
        {
          Years: 2030,
          predicted_mean: 21787.0489498245,
          "% Change": 1.7377410635,
        },
        {
          Years: 2031,
          predicted_mean: 21920.683657518,
          "% Change": 0.6133676387,
        },
        {
          Years: 2032,
          predicted_mean: 21958.3386606278,
          "% Change": 0.1717784158,
        },
        {
          Years: 2033,
          predicted_mean: 21967.021634546,
          "% Change": 0.0395429456,
        },
      ],
    },
    {
      Marin: [
        { Years: 2018, predicted_mean: 24771.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 12565.8417586667,
          "% Change": -49.271964157,
        },
        {
          Years: 2020,
          predicted_mean: 11002.3192120606,
          "% Change": -12.4426407449,
        },
        {
          Years: 2021,
          predicted_mean: 10513.7651321049,
          "% Change": -4.4404645106,
        },
        {
          Years: 2022,
          predicted_mean: 10037.1146545744,
          "% Change": -4.5335849864,
        },
        {
          Years: 2023,
          predicted_mean: 8223.5408296602,
          "% Change": -18.0686769787,
        },
        {
          Years: 2024,
          predicted_mean: 6651.7589290085,
          "% Change": -19.1132011528,
        },
        {
          Years: 2024,
          predicted_mean: 11009.282926527,
          "% Change": 65.509349392,
        },
        {
          Years: 2025,
          predicted_mean: 10518.5234120245,
          "% Change": -4.457688278,
        },
        {
          Years: 2026,
          predicted_mean: 11092.8070514719,
          "% Change": 5.4597362857,
        },
        {
          Years: 2027,
          predicted_mean: 11340.7947737087,
          "% Change": 2.2355723045,
        },
        {
          Years: 2028,
          predicted_mean: 11360.2893367817,
          "% Change": 0.1718976797,
        },
        {
          Years: 2029,
          predicted_mean: 11360.5941481875,
          "% Change": 0.0026831307,
        },
        {
          Years: 2030,
          predicted_mean: 11360.5951652309,
          "% Change": 8.9524e-6,
        },
        { Years: 2031, predicted_mean: 11360.5951660379, "% Change": 7.1e-9 },
        { Years: 2032, predicted_mean: 11360.5951660381, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 11360.5951660381, "% Change": 0.0 },
      ],
    },
    {
      Ventura: [
        { Years: 2018, predicted_mean: 3764.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 5384.5408447902,
          "% Change": 43.0536887564,
        },
        {
          Years: 2020,
          predicted_mean: 4590.2645686248,
          "% Change": -14.7510493292,
        },
        {
          Years: 2021,
          predicted_mean: 3906.5450606575,
          "% Change": -14.8949912962,
        },
        {
          Years: 2022,
          predicted_mean: 3810.6999918719,
          "% Change": -2.4534484384,
        },
        {
          Years: 2023,
          predicted_mean: 2967.7973247696,
          "% Change": -22.1193657045,
        },
        {
          Years: 2024,
          predicted_mean: 2285.6538876849,
          "% Change": -22.9848390047,
        },
        {
          Years: 2024,
          predicted_mean: 4595.1423101642,
          "% Change": 101.042788452,
        },
        {
          Years: 2025,
          predicted_mean: 3910.5333936279,
          "% Change": -14.898535678,
        },
        {
          Years: 2026,
          predicted_mean: 3746.505206525,
          "% Change": -4.1945220918,
        },
        {
          Years: 2027,
          predicted_mean: 3995.8157394197,
          "% Change": 6.6544824884,
        },
        {
          Years: 2028,
          predicted_mean: 4313.8879124818,
          "% Change": 7.9601311423,
        },
        {
          Years: 2029,
          predicted_mean: 4512.383075503,
          "% Change": 4.6013055288,
        },
        {
          Years: 2030,
          predicted_mean: 4594.827628688,
          "% Change": 1.8270734511,
        },
        {
          Years: 2031,
          predicted_mean: 4619.8946000869,
          "% Change": 0.5455475901,
        },
        {
          Years: 2032,
          predicted_mean: 4625.7846152615,
          "% Change": 0.1274924145,
        },
        {
          Years: 2033,
          predicted_mean: 4626.9007504475,
          "% Change": 0.0241285593,
        },
      ],
    },
    {
      Mariposa: [
        { Years: 2018, predicted_mean: 4471.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 6916.0107404362,
          "% Change": 54.6859928525,
        },
        {
          Years: 2020,
          predicted_mean: 5587.0938813797,
          "% Change": -19.2150780115,
        },
        {
          Years: 2021,
          predicted_mean: 6024.6499799825,
          "% Change": 7.8315508544,
        },
        {
          Years: 2022,
          predicted_mean: 6321.9244108414,
          "% Change": 4.9343021063,
        },
        {
          Years: 2023,
          predicted_mean: 5755.860429721,
          "% Change": -8.9539821158,
        },
        {
          Years: 2024,
          predicted_mean: 5752.8080916573,
          "% Change": -0.0530300917,
        },
        {
          Years: 2025,
          predicted_mean: 6251.0637557199,
          "% Change": 8.6610861361,
        },
        { Years: 2026, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2027, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 6251.0637557199, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 6251.0637557199, "% Change": 0.0 },
      ],
    },
    {
      "San Mateo": [
        { Years: 2018, predicted_mean: 5551.0, "% Change": null },
        {
          Years: 2019,
          predicted_mean: 4127.9390988016,
          "% Change": -25.6361178382,
        },
        {
          Years: 2020,
          predicted_mean: 3618.0854190244,
          "% Change": -12.3512888047,
        },
        {
          Years: 2021,
          predicted_mean: 3590.9595805963,
          "% Change": -0.7497290773,
        },
        {
          Years: 2022,
          predicted_mean: 3272.6433427838,
          "% Change": -8.8643781883,
        },
        {
          Years: 2023,
          predicted_mean: 2657.0954109939,
          "% Change": -18.8088913858,
        },
        {
          Years: 2024,
          predicted_mean: 2415.503614513,
          "% Change": -9.092326737,
        },
        {
          Years: 2024,
          predicted_mean: 3621.9300076078,
          "% Change": 49.9451288686,
        },
        {
          Years: 2025,
          predicted_mean: 3595.3922112067,
          "% Change": -0.7326976597,
        },
        {
          Years: 2026,
          predicted_mean: 3778.9430340565,
          "% Change": 5.1051682839,
        },
        { Years: 2027, predicted_mean: 3778.9430340565, "% Change": 0.0 },
        { Years: 2028, predicted_mean: 3778.9430340565, "% Change": 0.0 },
        { Years: 2029, predicted_mean: 3778.9430340565, "% Change": 0.0 },
        { Years: 2030, predicted_mean: 3778.9430340565, "% Change": 0.0 },
        { Years: 2031, predicted_mean: 3778.9430340565, "% Change": 0.0 },
        { Years: 2032, predicted_mean: 3778.9430340565, "% Change": 0.0 },
        { Years: 2033, predicted_mean: 3778.9430340565, "% Change": 0.0 },
      ],
    },
  ];
  return data;
};

const MapChart = ({
  setTooltipContent,
}: {
  setTooltipContent: (content: string) => void;
}) => {
  const [mortalityData, setMortalityData] = useState(getMortalityDataDetails());
  const [infantMortalityData, setInfantMortalityData] = useState(
    getInfantMortalityDataDetails()
  );
  const [cohsData, setCohsData] = useState(getCohsDataDetails());
  let statistics: string = useSelector((state: any) => state.statistics.value);
  let year = useSelector((state: any) => state.year.value);

  useEffect(() => {
    console.log("Fetching mortality data: " + statistics);
  }, [statistics]);

  const fillColor = (
    geo,
    mortalityData,
    infantMortalityData,
    cohsData,
    statistics
  ) => {
    console.log("Geo properties name:", geo.properties.name);

    const countyName = geo.properties.name;
    let color = "#000000"; // Default color

    console.log("Selected year:", year);

    console.log("Statistics value:", statistics);

    if (statistics === "Mortality") {
      console.log("Mortality data:", mortalityData);

      let value = null;
      mortalityData.find((d) => {
        if (d.hasOwnProperty(countyName)) {
          console.log("Found county in mortality data:", countyName);

          d[countyName].find((item) => {
            if (item.Years == year) {
              value = item;
              console.log(
                "Mortality value for",
                countyName,
                "in year",
                year,
                ":",
                value
              );
            }
          });
        }
      });
      console.log("Mortality value for", countyName, ":", value);

      const percentChange = value ? value["% Change"] : null;
      if (percentChange !== null) {
        if (percentChange < 0) {
          if (percentChange <= -75) {
            color = "#0b6a3c";
          } else if (percentChange <= -50) {
            color = "#239b5d";
          } else if (percentChange <= -25) {
            color = "#34be76";
          } else if (percentChange < 0) {
            color = "#79d2a0";
          }
        } else if (percentChange > 0) {
          if (percentChange >= 75) {
            color = "#820000";
          } else if (percentChange >= 50) {
            color = "#B30000";
          } else if (percentChange >= 25) {
            color = "#E70000";
          } else if (percentChange > 0) {
            color = "#FF1818";
          }
        } else {
          color = "#d2d2d292";
        }
      }
    } else if (statistics === "InfantMortality") {
      console.log("InfantMortality data:", infantMortalityData);

      let value = null;
      infantMortalityData.find((d) => {
        if (d.hasOwnProperty(countyName)) {
          console.log("Found county in InfantMortality data:", countyName);

          d[countyName].find((item) => {
            if (item.Years == year) {
              value = item;
              console.log(
                "InfantMortality value for",
                countyName,
                "in year",
                year,
                ":",
                value
              );
            }
          });
        }
      });
      console.log("InfantMortality value for", countyName, ":", value);

      const percentChange = value ? value["% Change"] : null;
      if (percentChange !== null) {
        if (percentChange < 0) {
          if (percentChange <= -75) {
            color = "#0b6a3c";
          } else if (percentChange <= -50) {
            color = "#239b5d";
          } else if (percentChange <= -25) {
            color = "#34be76";
          } else if (percentChange < 0) {
            color = "#79d2a0";
          }
        } else if (percentChange > 0) {
          if (percentChange >= 75) {
            color = "#820000";
          } else if (percentChange >= 50) {
            color = "#B30000";
          } else if (percentChange >= 25) {
            color = "#E70000";
          } else if (percentChange > 0) {
            color = "#FF1818";
          }
        } else {
          color = "#d2d2d292";
        }
      }
    } else if (statistics === "CountyOrganizedHealthSystem") {
      console.log("CountyOrganizedHealthSystem data:", cohsData);

      let value = null;
      cohsData.find((d) => {
        if (d.hasOwnProperty(countyName)) {
          console.log(
            "Found county in CountyOrganizedHealthSystem data:",
            countyName
          );

          d[countyName].find((item) => {
            if (item.Years == year) {
              value = item;
              console.log(
                "CountyOrganizedHealthSystem value for",
                countyName,
                "in year",
                year,
                ":",
                value
              );
            }
          });
        }
      });
      console.log(
        "CountyOrganizedHealthSystem value for",
        countyName,
        ":",
        value
      );

      const percentChange = value ? value["% Change"] : null;
      if (percentChange !== null) {
        if (percentChange < 0) {
          if (percentChange <= -75) {
            color = "#820000";
          } else if (percentChange <= -50) {
            color = "#B30000";
          } else if (percentChange <= -25) {
            color = "#E70000";
          } else if (percentChange < 0) {
            color = "#FF1818";
          }
        } else if (percentChange > 0) {
          if (percentChange >= 75) {
            color = "#0b6a3c";
          } else if (percentChange >= 50) {
            color = "#239b5d";
          } else if (percentChange >= 25) {
            color = "#34be76";
          } else if (percentChange > 0) {
            color = "#79d2a0";
          }
        } else {
          color = "#d2d2d292";
        }
      }
    }

    return color;
  };

  const setCountyData = (geo, dispatch) => {
    const countyName: string = geo.properties.name;
    console.log("Setting county data for: ", countyName);

    dispatch(setCounty(countyName));

    console.log("County set to:", countyName);
  };

  const setPercentChange = (
    geo,
    dispatch,
    mortalityData,
    infantMortalityData,
    cohsData,
    statistics
  ) => {
    const countyName: string = geo.properties.name;
    console.log("Setting percent data for: ", countyName);

    if (statistics === "Mortality") {
      mortalityData.find((d) => {
        if (d.hasOwnProperty(countyName)) {
          console.log(
            "Found county in CountyOrganizedHealthSystem data:",
            countyName
          );

          d[countyName].find((item) => {
            if (item.Years == year) {
              console.log(
                "CountyOrganizedHealthSystem value for",
                countyName,
                "in year",
                year,
                ":",
                item
              );

              dispatch(
                setPercent(item != null ? item["% Change"] + "%" : "null")
              );
            }
          });
        }
      });
    } else if (statistics === "InfantMortality") {
      infantMortalityData.find((d) => {
        if (d.hasOwnProperty(countyName)) {
          console.log(
            "Found county in CountyOrganizedHealthSystem data:",
            countyName
          );

          d[countyName].find((item) => {
            if (item.Years == year) {
              console.log(
                "CountyOrganizedHealthSystem value for",
                countyName,
                "in year",
                year,
                ":",
                item
              );

              dispatch(
                setPercent(item != null ? item["% Change"] + "%" : "null")
              );
            }
          });
        }
      });
    } else if (statistics === "CountyOrganizedHealthSystem") {
      cohsData.find((d) => {
        if (d.hasOwnProperty(countyName)) {
          console.log(
            "Found county in CountyOrganizedHealthSystem data:",
            countyName
          );

          d[countyName].find((item) => {
            if (item.Years == year) {
              console.log(
                "CountyOrganizedHealthSystem value for",
                countyName,
                "in year",
                year,
                ":",
                item
              );

              dispatch(
                setPercent(item != null ? item["% Change"] + "%" : "null")
              );
            }
          });
        }
      });
    }

    console.log("County set to:", countyName);
  };

  const dispatch = useDispatch();

  return (
    <div className="flex col-start-2 col-end-3 mt-5">
      <ComposableMap
        width={800}
        height={900}
        projectionConfig={{
          scale: 5500,
          center: [-117, 36.7783], // Centering on California
        }}
      >
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent("");
                      setCountyData(geo, dispatch);
                      setPercentChange(
                        geo,
                        dispatch,
                        mortalityData,
                        infantMortalityData,
                        cohsData,
                        statistics
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: fillColor(
                          geo,
                          mortalityData,
                          infantMortalityData,
                          cohsData,
                          statistics
                        ),
                        outline: "none",
                      },
                      hover: {
                        fill: "#0EA5E9",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
