import React, { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import LeafletMap from "./LeafletMap"
import { MapModel } from "../../../models/MapModel"
import { MarkerModel } from "../../../models/MarkerModel"
import { PolylineModel } from "../../../models/Poliyline"
import { LocationModel } from "../../../models/location.model"

const meta = {
  component: LeafletMap,
} satisfies Meta<typeof LeafletMap>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    model: new MapModel(51.505, -0.09, 13, (model) => {
      ;[
        MarkerModel.fromLatLng(1, 51.505, -0.09),
        MarkerModel.fromLatLng(2, 51.507, -0.095),
        MarkerModel.fromLatLng(3, 51.51, -0.1),
      ].forEach((marker) => model.markers.add(marker))
    }),
  },
}

const MultipleMapModel = new MapModel(51.605, -0.09, 13, (model) => {
  ;[
    MarkerModel.fromLatLng(1, 51.605, -0.09),
    MarkerModel.fromLatLng(2, 51.606, -0.09),
  ].forEach((marker) => model.markers.add(marker))
})
export const MultipleMap: Story = {
  tags: ["multiple"],
  args: {
    model: MultipleMapModel,
    height: "250px",
  },

  parameters: {
    // layout: "fullscreen",
  },

  decorators: [
    (Story) => (
      <div>
        <Story />
        <Story />
      </div>
    ),
  ],
}

const LinesMapModel = new MapModel(51.705, -0.09, 13)
const locations = [
  new LocationModel(51.705, -0.09),
  new LocationModel(51.706, -0.09),
  new LocationModel(51.707, -0.09),
  new LocationModel(51.708, -0.09),
  new LocationModel(51.709, -0.09),
]
LinesMapModel.lines.add(new PolylineModel(1, locations))
locations.forEach((location, index) => {
  LinesMapModel.markers.add(new MarkerModel(index, location))
})

export const LinesMap: Story = {
  args: {
    model: LinesMapModel,
  },
}

export const Interactive = () => {
  const [model] = useState(new MapModel(51.605, -0.09, 13))

  const [line] = useState(new PolylineModel(1, []))

  const addMarker = () => {
    model.markers.add(
      MarkerModel.fromLatLng(model.markers.length + 1, 51.605, -0.09)
    )
    line.locationPoints.push(new LocationModel(51.605, -0.09))
  }

  useEffect(() => {
    model.lines.add(line)
  }, [])

  return (
    <>
      <LeafletMap model={model} height="250px" />
      <button onClick={addMarker}>Add</button>
    </>
  )
}

// export const InteractiveStory: Story = {
//   render: () => <Interactive />,
//   args: {
//     model: new MapModel(51.505, -0.09, 13, []),
//   }
// }
