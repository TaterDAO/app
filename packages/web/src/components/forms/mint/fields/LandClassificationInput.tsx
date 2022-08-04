// Components
import MultiLevelSelectInput from "@components/forms/MultiLevelSelectInput";

// Hooks
import useMintForm from "../useMintForm";

const LandClassificationInput: React.FC<{}> = ({}) => {
  const form = useMintForm();

  return (
    <MultiLevelSelectInput
      form={form}
      fieldId="attrLandClassification_"
      label="Land Classification"
      description=""
      placeholder=""
      options={[
        {
          value: "agriculture",
          label: "Agriculture",
          description:
            "Land devoted primarily to the systematic raising of animals, plants, fungi, or other life forms that eventually produce food, fiber, medicinal, or other products.",
          subOptions: [
            {
              label: "Cropland",
              value: "agriculture,cropland",
              description:
                "Land planted, cultivated, and harvested in consistent intervals.  Often large-scale mechanical equipment is used.  Related functions may include irrigation, pest control, and fertilization.  Some crops include but not limited to:  vegetables, fruits, corn, wheat, flowers, hay, and other commodities.  May include buildings or structures such as houses, barns, and / or sheds than contribute nominally to value.  Sometimes called a 'farm'."
            },
            {
              label: "Grove / Orchard",
              value: "agriculture,grove_or_orchard",
              description:
                "Uniformly spaced fruit or nut-bearing trees or shrubs that are not annually planted.  Plantings are spaced for easy equipment operation and maximum production from a specific variety of trees or shrubs.  Does not include vineyards, which are separately categorized."
            },
            {
              label: "Mixed Use",
              value: "agriculture,mixed_use",
              description:
                "A mixture of uses that may include pastureland, cropland, timberland, and open space for grazing.  May consist of both deeded and leased land.  May also feature some minor residential structures, corrals, barns, etc. that contribute minimally to value.  "
            },
            {
              label: "Organic Farm",
              value: "agriculture,organic_farm",
              description:
                "Farming that relies on natural methods like crop rotation, green manure, compost, biological pest control, and other natural techniques to foster plant or animal growth.  Does NOT use synthetic products such as petrochemical fertilizers, pesticides, hormones, antibiotics, or nanomaterials.  Fertilizers, pesticides, insecticides, or fungicides used must be natural.  Land is usually certified by an organization like the International Federation of Organic Agriculture Movements (IFOAM). "
            },
            {
              label: "Pastureland",
              value: "agriculture,pastureland",
              description:
                "Land covered with forage grasses or other plants suitable for grazing domesticated livestock including but not limited to cattle, horses, sheep, or poultry."
            },
            {
              label: "Vineyard",
              value: "agriculture,vineyard",
              description:
                "Permanent plantings for the production of grapes; excludes a winery which processes the grapes."
            },
            {
              label: "Other Agricultural",
              value: "agriculture,other",
              description:
                "All other agricultural land uses not classified otherwise."
            }
          ]
        },
        {
          value: "cave",
          label: "Cave",
          description:
            "A subterranean cavity suitable for a variety of uses including but not limited to recreation, storage, or production of fungi or other living organisms. "
        },
        {
          value: "cemetary",
          label: "Cemetary",
          description:
            "A tract of land used for burial of corpses.  Often includes a mausoleum, which is an above-ground structure where the remains of the deceased are place as a final resting place.  May also contain a crematory, which reduce the remains of corpses to ashes by intense heat, a chapel or place for services, an administrative building, and sheds and buildings for landscaping equipment."
        },
        {
          value: "commercial",
          label: "Commercial",
          description:
            "Land primarily intended for the sale of goods or services to consumers / end users.",
          subOptions: [
            {
              label: "Automotive",
              value: "commercial,automotive",
              description:
                "Uses of land that caters to ground motor vehicles like passenger cars and small trucks.  Examples include but are not limited to:  parking lots, construction equipment sales, and motor-vehicle sales, leasing, repair, & washing.  Excludes parking structures that offer protection from the weather.   See similar Commercial & Retail, Automotive, Parking Structure. See also Land, Industrial, Intermodal Operations."
            },
            {
              label: "General",
              value: "commercial,general",
              description:
                "Numerous uses related to the sale of goods or services to consumers.  Examples include but are not limited to: many retail sales, gas stations, convenience stores, restaurants, shopping centers, day care, lodges & private clubs, garden centers, animal services, showrooms, building material sales, taverns, bars, nightclubs, micro-breweries, banks, pawn shops, currency exchanges, funeral homes, hair salons, barbershops, laundromats, etc."
            },
            {
              label: "Hotels & Motels",
              value: "commercial,hotels_and_motels",
              description:
                "Land for hotels, motels, bed & breakfasts, casinos, and convention centers."
            },
            {
              label: "Office",
              value: "commercial,office",
              description: "Land for professional or medical offices"
            },
            {
              label: "Retail Pad",
              value: "commercial,retail",
              description:
                "A site within a shopping center with all utilities already connected or readily available close by.  Usually on the periphery of the center.  Pads generally enjoy very good exposure to passing traffic."
            },
            {
              label: "Other Commercial",
              value: "commercial,other",
              description:
                "All other commercial land uses not classified otherwise"
            }
          ]
        },
        {
          value: "contaminated",
          label: "Contaminated",
          description:
            "Land now known to be contaminated, or land previously contaminated but now remediated."
        },
        {
          value: "easement",
          label: "Easement",
          description:
            "An interest in real property that conveys use, but not ownership to a portion of a property.  Common easements include but are not limited to:  access, utility, and right-of way.  Specialty easements include but are not limited to:  conservation, preservation, aerial, and flowage."
        },
        {
          value: "energy",
          label: "Energy",
          description:
            "Land intended or used for wind, solar, or other form of energy production."
        },
        {
          value: "housing",
          label: "Housing",
          description:
            "Land destined for one or more dwelling units.  A dwelling unit is a single-housing unit occupied by one or more related or unrelated people living together as a social group.",
          subOptions: [
            {
              label: "Single Unit",
              value: "housing,single_unit",
              description:
                "Land intended for one primary residential building containing one dwelling on one site.  May also include ancillary buildings or structures."
            },
            {
              label: "Multiple Units",
              value: "housing,multiple_units",
              description:
                "Land intended for one or more residential buildings intended for 2 or more dwelling units.  May also include ancillary buildings or structures."
            },
            {
              label: "Mobile Home Park",
              value: "housing,mobile_home_park",
              description:
                "Land with site improvements for non-motorized homes that are transportable but infrequently moved.  Homes have a steel under-carriage and removable wheels.  Often the park offers a recreational structure or other site improvements like a swimming pool, basketball court, or tennis court."
            },
            {
              label: "Senior",
              value: "housing,senior",
              description:
                "Land devoted to house senior citizens in various types of structures."
            },
            {
              label: "Student",
              value: "housing,student",
              description:
                "Land devoted to house students in various types of structures."
            },
            {
              label: "Other Housing",
              value: "housing,other",
              description:
                "All other uses of land, related to housing, not classified otherwise."
            }
          ]
        },
        {
          value: "industrial",
          label: "Industrial",
          description:
            "Land devoted to research, manufacturing, warehousing, storage, distribution, treatment, or recycling of finished or raw goods, materials, or products.",
          subOptions: [
            {
              label: "General Purpose, Light",
              value: "industrial,general,light",
              description:
                "Industrial uses that generates nil to minimal mal-odors, dust, pollution, vibration, smoke, or noise.  Examples include but are not limited to:  contractor storage yards, computer assembly, self-storage, warehousing, and injection molding. "
            },
            {
              label: "General Purpose, Heavy",
              value: "industrial,general,heavy",
              description:
                "Industrial uses that generate moderate to significant mal-odors, dust, pollution, vibration, smoke, or noise.  Examples include:  steel mills, forges, refineries, waste incinerators, sewerage treatment, recycling operations, and some energy production.  Several special heavy industrial uses like landfills, mines / quarries, and salvage yards are special heavy industrial uses that are categorized separately."
            },
            {
              label: "Intermodal Yard / Rail Yard",
              value: "industrial,intermodal_yard_or_rail_yard",
              description:
                "A heavy industrial use devoted to the movement and storage of standardized steel containers, materials, equipment or other items between trains and tractor trailers.  Most of these operations have minimal buildings with many site improvements, hence are classified as a land use, not a building use.  See similar Transportation, Water Transport, Port Facility, Intermodal."
            },
            {
              label: "Landfill",
              value: "industrial,landfill",
              description:
                "A special heavy industrial use for the burial of solid wastes. Synonymous with solid waste disposal site or garbage dump."
            },
            {
              label: "Mine / Quarry",
              value: "industrial,mine_or_quary",
              description:
                "A subterranean cavity or open pit from which metallic ores, precious stones, coal, rock, sand, or other mineral substances are excavated.  Gas and oil extraction is a property right, not a land use."
            },
            {
              label: "Salvage / Storage Yard",
              value: "industrial,salvage_or_storage_yard",
              description:
                "Land used to store junk, scrap metal, resalable car parts, heavy equipment, parts, or construction materials.  Usually enclosed by a high fence, which is a site improvement."
            },
            {
              label: "Other Industrial",
              value: "industrial,other",
              description:
                "All other industrial land uses not classified otherwise."
            }
          ]
        },
        {
          value: "mixed_use",
          label: "Mixed Use",
          description:
            "Land intended to serve a mixture of housing, commercial, office, and / or light industrial uses."
        },
        {
          value: "park_and_open_space",
          label: "Park & Open Space",
          description:
            "Land excluded from development and set aside for green space, wildlife habitat, and passive or active recreation.  Typically one of three ownership types:  (1) private open space adjacent to dwellings owned by individual residents,  (2) public open space owned by government, and  (3) common open space owned by a community association and set aside for the use of residents."
        },
        {
          value: "planned_unit_development",
          label: "Planned Unit Development (PUD)",
          description:
            "Land that is or could be improved with one or more uses within a major, single or phased development.  Typically includes one or more of  these uses: housing, office, industrial, retail, or lodging.  Often requires special review and approval by local government."
        },
        {
          value: "public_service",
          label: "Public Service",
          description:
            "Land intended for, or used by government or an institution.  Can be used by an individual or groups (a.k.a. the general public).  Examples include but are not limited to:  military facilities, police and fire stations, courthouses, governance buildings, utility stations, education, and recreation."
        },
        {
          value: "religious",
          label: "Religious",
          description:
            "Land devoted to religious practices or housing including but not limited to:  churches, temples, synagogues, chapels, seminaries, convents, monasteries, rectories, mosques, shrines, or houses of worship, etc."
        },
        {
          value: "recreation",
          label: "Recreation",
          description:
            "Land for sports, entertainment, and other recreational activities.",
          subOptions: [
            {
              label: "General",
              value: "recreation,general",
              description:
                "Land for a myriad of sports, entertainment, or recreational activities.  Examples include but are not limited to:  golf courses, mini-golf courses, race tracks, stadiums, auditoriums, swimming pools, tennis courts, zoos, bowling alleys, marinas, boat launches, skating rinks, hiking and walking trails, botanical gardens, hunt clubs, and arboretums."
            },
            {
              label: "Campground",
              value: "recreation,campground",
              description:
                "A place used for short-term overnight stays in the outdoors using tents, small camper vans, or trailers.  Recreational activities are generally passive in nature.  May have communal bath house and laundry."
            },
            {
              label: "RV Trailer Park",
              value: "recreation,rv_trailer_park",
              description:
                "Land with accommodations for motorized recreational vehicles and trailers, which are often moved one or more times in a year.  Stays in the park are typically medium to long term.  Some features may include are:  wastewater disposal, potable water hook-ups, swimming pool, tennis court, restroom and laundry facilities, recreational center, laundry, and commissary."
            },
            {
              label: "Other Entertainment",
              value: "recreation,other",
              description:
                "All other sports or entertainment land uses not classified otherwise."
            }
          ]
        },
        {
          value: "timberland",
          label: "Timberland",
          description:
            "Land with merchantable trees, timber, or timber products that is periodically harvested.  Time between harvests varies depending on the species and growing conditions.  Interim uses may include passive and active recreation like hunting."
        },
        {
          value: "water_related",
          label: "Water Related",
          description:
            "Land adjacent to, or in the water.  Includes batture and submerged land.",
          subOptions: [
            {
              label: "Costal",
              value: "water_related,costal",
              description: "Land next to a sea or ocean."
            },
            {
              label: "Floodway",
              value: "water_related,floodway",
              description:
                "The Federal Emergency Management Agency (FEMA) defines a floodway as 'the channel of a river or other watercourse and the adjacent land areas that must be reserved in order to discharge the base flood without cumulatively increasing the water surface elevation more than a designated height.'"
            },
            {
              label: "Floodplain",
              value: "water_related,floodplain",
              description:
                "The Federal Emergency Management Agency (FEMA) defines a floodplain as 'an area of land adjacent to a stream or river that stretches from the banks of its channel to the base of the enclosing valley walls that experiences flooding during periods of high discharge.'"
            },
            {
              label: "Lake / River Frontage",
              value: "water_related,lake_or_river_frontage",
              description:
                "Land next to lake or river.  May be next to, but is mostly not in a floodplain."
            },
            {
              label: "Waterway",
              value: "water_related,waterway",
              description:
                "A waterway is any navigable body of water including rivers, lakes, seas, oceans, and canals.  To be navigable, it must be sufficiently wide and deep to accommodate vessels using it.  Free from waterfalls and rapids, or may have boat locks or lifts to circumvent them."
            },
            {
              label: "Wetland",
              value: "water_related,wetland",
              description:
                "Land saturated with water, either permanently or seasonally, such that it takes on the characteristics of a distinct ecosystem.  Primarily, the factor that distinguishes wetlands from other land forms or water bodies is the characteristic vegetation of aquatic plants adapted to its unique hydric soil.  Marshes swamps, bogs, fens, and quagmires are all types of wetlands."
            },
            {
              label: "Other Water Related",
              value: "water_related,other",
              description:
                "All other water-related land uses not classified otherwise."
            }
          ]
        },
        {
          value: "wasteland",
          label: "Wasteland",
          description:
            "Land not suitable for the economical production of beneficial crops including but not limited to river bottoms, sand hills, rock outcroppings, sandy washes, areas of high salinity, and land that is inaccessible by typical farm equipment."
        },
        {
          value: "wilderness",
          label: "Wilderness",
          description:
            "Undisturbed, wild, natural, uninhabited, and uncultured land that is used only for passive recreation."
        },
        {
          value: "other",
          label: "Other",
          description: "All other land uses not classified otherwise."
        }
      ]}
    />
  );
};

export default LandClassificationInput;
