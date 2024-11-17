import React from "react"
import { Meta, StoryObj } from "@storybook/react/*"
import { MapModel } from "../../../models/MapModel"
import LeafletMap from "./LeafletMap"

export const Interactive = () => {
  const model = new MapModel(51.605, -0.09, 13)

  return (
    <>
      <LeafletMap model={model} height="250px" />
      <button>Add</button>
    </>
  )
}

const meta = {
  component: Interactive,
} satisfies Meta<typeof Interactive>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: Interactive,
  args: {
    model: new MapModel(51.505, -0.09, 13),
  },
}
