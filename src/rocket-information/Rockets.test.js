import { render, cleanup } from "@testing-library/react";
import Rockets, { GET_QUERY } from ".";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

const dataFixture = {
  rockets: [
    {
      id: "falcon1",
      name: "Falcon 1",
      mass: {
        kg: 30146,
        lb: 66460,
        __typename: "Mass",
      },
      company: "SpaceX",
      cost_per_launch: 6700000,
      country: "Republic of the Marshall Islands",
      description:
        "The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
      __typename: "Rocket",
    },
    {
      id: "falcon9",
      name: "Falcon 9",
      mass: {
        kg: 549054,
        lb: 1207920,
        __typename: "Mass",
      },
      company: "SpaceX",
      cost_per_launch: 50000000,
      country: "United States",
      description:
        "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
      __typename: "Rocket",
    },
    {
      id: "falconheavy",
      name: "Falcon Heavy",
      mass: {
        kg: 1420788,
        lb: 3125735,
        __typename: "Mass",
      },
      company: "SpaceX",
      cost_per_launch: 90000000,
      country: "United States",
      description:
        "With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.",
      __typename: "Rocket",
    },
    {
      id: "starship",
      name: "Starship",
      mass: {
        kg: 1335000,
        lb: 2943000,
        __typename: "Mass",
      },
      company: "SpaceX",
      cost_per_launch: 7000000,
      country: "United States",
      description:
        "Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.",
      __typename: "Rocket",
    },
  ],
};

const errorMock = {
  request: {
    query: GET_QUERY,
  },
  error: new Error("A test error occurred"),
};

const validMock = {
  request: {
    query: GET_QUERY,
  },
  result: {
    data: dataFixture,
  },
};

test("renders loading screen", () => {
  const { asFragment } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Rockets />
    </MockedProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders error screen", async () => {
  const { asFragment } = render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Rockets />
    </MockedProvider>
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(asFragment()).toMatchSnapshot();
});

test("renders app screen", async () => {
  const { asFragment } = render(
    <MockedProvider mocks={[validMock]} addTypename={false}>
      <Rockets />
    </MockedProvider>
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(asFragment()).toMatchSnapshot();
});
