// Components
import SelectInput from "../../SelectInput";

// Hooks
import useMintForm from "../useMintForm";

const LandClassificationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <SelectInput
      form={form}
      fieldId="attrLandClassification_"
      label="Land Classification"
      description=""
      placeholder="Mixed Use"
      options={[
        { label: "Agriculture - Cropland", value: "agriculture,cropland" },
        {
          label: "Agriculture - Grove / Orchard",
          value: "agriculture,grove_or_orchard"
        },
        { label: "Agriculture - Mixed Use", value: "agriculture,mixed_use" },
        {
          label: "Agriculture - Organic Farm",
          value: "agriculture,organic_farm"
        },
        {
          label: "Agriculture - Pastureland",
          value: "agriculture,pastureland"
        },
        { label: "Agriculture - Vineyard", value: "agriculture,vineyard" },
        {
          label: "Agriculture - Other Agricultural",
          value: "agriculture,other"
        },
        { label: "Cave", value: "cave" },
        { label: "Cemetary", value: "Cemetary" },
        { label: "Commercial - Automotive", value: "commercial,automotive" },
        { label: "Commercial - General", value: "commercial,general" },
        {
          label: "Commercial - Hotels & Motels",
          value: "commercial,hotels_and_motels"
        },
        { label: "Commercial - Office", value: "commercial,office" },
        { label: "Commercial - Retail Pad", value: "commercial,retail" },
        { label: "Commercial - Other Commercial", value: "commercial,other" },
        { label: "Contaminated", value: "contaminated" },
        { label: "Easement", value: "easement" },
        { label: "Energy", value: "energy" },
        { label: "Housing - Single Unit", value: "housing,single_unit" },
        { label: "Housing - Multiple Units", value: "housing,multiple_units" },
        {
          label: "Housing - Mobile Home Park",
          value: "housing,mobile_home_park"
        },
        { label: "Housing - Senior", value: "housing,senior" },
        { label: "Housing - Student", value: "housing,student" },
        { label: "Housing - Other Housing", value: "housing,other" },
        {
          label: "Industrial - General Purpose, Light",
          value: "industrial,general,light"
        },
        {
          label: "Industrial - General Purpose, Heavy",
          value: "industrial,general,heavy"
        },
        {
          label: "Industrial - Intermodal Yard / Rail Yard",
          value: "industrial,intermodal_yard_or_rail_yard"
        },
        { label: "Industrial - Landfill", value: "industrial,landfill" },
        {
          label: "Industrial - Mine / Quarry",
          value: "industrial,mine_or_quary"
        },
        {
          label: "Industrial - Salvage / Storage Yard",
          value: "industrial,salvage_or_storage_yard"
        },
        { label: "Industrial - Other Industrial", value: "industrial,other" },
        { label: "Mixed Use", value: "mixed" },
        { label: "Park & Open Space", value: "park_and_open_space" },
        {
          label: "Planned Unit Development (PUD)",
          value: "planed_unit_development"
        },
        { label: "Public Service", value: "public_service" },
        { label: "Religious", value: "religious" },
        { label: "Recreation - General", value: "recreation,general" },
        { label: "Recreation - Campground", value: "recreation,campground" },
        {
          label: "Recreation - RV Trailer Park",
          value: "recreation,rv_trailer_park"
        },
        {
          label: "Recreation - Other Entertainment",
          value: "recreation,other"
        },
        { label: "Timberland", value: "timberland" },
        { label: "Water Related - Costal", value: "water,costal" },
        { label: "Water Related - Floodway", value: "water,floodway" },
        { label: "Water Related - Floodplain", value: "water,floodplain" },
        {
          label: "Water Related - Lake / River Frontage",
          value: "water,lake_or_river_frontage"
        },
        { label: "Water Related - Waterway", value: "water,waterway" },
        { label: "Water Related - Wetland", value: "water,wetland" },
        { label: "Water Related - Other Water Related", value: "water,other" },
        { label: "Wasteland", value: "wasteland" },
        { label: "Wilderness", value: "wilderness" },
        { label: "Other", value: "other" }
      ]}
    />
  );
};

export default LandClassificationInput;
