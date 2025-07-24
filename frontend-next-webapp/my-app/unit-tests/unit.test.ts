test("mortalityTest", () => {
  const mock = jest.fn().mockImplementation((percentChange: number) => {
    let color = "#000000"; // Default color

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

    return color;
  });

  expect(mock(0)).toBe("#d2d2d292");
});

test("infantMortalityTest", () => {
  const mock = jest.fn().mockImplementation((percentChange: number) => {
    let color = "#000000"; // Default color

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

    return color;
  });

  expect(mock(50)).toBe("#B30000");
});

test("cohsTest", () => {
  const mock = jest.fn().mockImplementation((percentChange: number) => {
    let color = "#000000"; // Default color

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

    return color;
  });

  expect(mock(-50)).toBe("#B30000");
});
