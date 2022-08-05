export default [
  {
    value: "no_building",
    label: "No Building",
    description: "No building."
  },
  {
    value: "agriculture",
    label: "Agriculture",
    description:
      "Uses with significantly valuable structures devoted to growing, handling, processing, and distribution of food, fiber, medicinal, and animal products.   ",
    subOptions: [
      {
        value: "agriculture,aquaculture",
        label: "Aquaculture",
        description:
          "A facility for growing fish, shellfish, and other marine life in controlled conditions for the production of food. a.k.a. fish farm.   Commonly grown marine life include but are not limited to: many types of fish, oysters, shrimp, crabs, lobster, and seaweed. "
      },
      {
        value: "agriculture,auction_or_market",
        label: "Auction / Market",
        description:
          "Facility for the temporary housing and sale of livestock  Typically includes a small enclosed arena with seating for buyers and sellers, and a series of pens and holding areas for moving livestock into, and out of the sale area."
      },
      {
        value: "agriculture,dairy",
        label: "Dairy",
        description:
          "An agricultural enterprise devoted to the production of milk products on a large-scale basis.  Facility may include some or all of the following: barns, corrals, milking equipment, feed storage, and other related features."
      },
      {
        value: "agriculture,equestrian_facility",
        label: "Equestrian Facility",
        description:
          "A faculty for the breeding, raising, housing, and training horses.  May include pastures, paddocks, barns, training improvements, stables, and worker housing.  See similar Recreation, Equestrian Center."
      },
      {
        value: "agriculture,feedlot",
        label: "Feedlot",
        description:
          "A facility designed for finishing of animals, holding, and distribution before slaughter."
      },
      {
        value: "agriculture,grain_elevator",
        label: "Grain Elevator",
        description:
          "A bulk storage structure where grains and other farm-grown plants are retained in silos.  Commonly stored items include: sugar beets, soybeans, wheat, beans, barley, rye, and corn.  See similar Industrial, Storage Elevator."
      },
      {
        value: "agriculture,greenhouse_or_nursery",
        label: "Greenhouse / Nursery",
        description:
          "A facility designed for the growing or producing plants, trees, or vegetables under climatically controlled conditions, including hydroponics.  Typically not a retail facility; see Commercial & Retail, Garden Center."
      },
      {
        value: "agriculture,livestock_production",
        label: "Livestock Production",
        description:
          "A non-pasture facility where domesticated animals are raised for food or labor.  Examples include: cattle, horses, buffalo, swine, poultry, goats, and elk etc.  See similar Agriculture, Ranch.",
        subOptions: [
          {
            value: "agriculture,livestock_production,animals,large",
            label: "Animals, Large",
            description:
              "A non-pasture facility where large domesticated animals are raised for food or labor.  Examples include: cattle, horses, mules, donkeys, buffalo, ostriches, alpaca, lamas, goats, sheep, etc.   "
          },
          {
            value: "agriculture,livestock_production,animals,small",
            label: "Animals, Small",
            description:
              "A non-pasture facility where small to medium-size domesticated animals are raised for food or labor.  Examples include:  rabbits, mink, and fox, etc.   "
          },
          {
            value: "agriculture,livestock_production,poultry",
            label: "Poultry",
            description:
              "A non-pasture facility where domesticated poultry is raised for food.  Examples include: chickens, turkeys, pigeons, quail, geese, ducks, etc."
          },
          {
            value: "agriculture,livestock_production,swine",
            label: "Swine",
            description:
              "A non-pasture facility where swine / pigs are raised for food."
          }
        ]
      },
      {
        value: "agriculture,ranch",
        label: "Ranch",
        description:
          "A property devoted to the raising of grazing livestock in an open range or pasture.  Grazing livestock include cattle, horse, sheep, goats, etc. Generally includes major structures such as houses, barns, silos, etc.  See similar Agriculture, Livestock Production."
      },
      {
        value: "agriculture,winery",
        label: "Winery",
        description:
          "A facility for processing grapes into wine, bottling, and storage.  Often includes a tasting and retail sales center."
      },
      {
        value: "agriculture,winery_and_vineyard",
        label: "Winery & Vineyard",
        description:
          "A property that contains both permanent plantings for the production of grapes, and a grape processing facility.  May also include a tasting and retail sales center. "
      },
      {
        value: "agriculture,other_agriculture",
        label: "Other agriculture",
        description:
          "All other agricultural properties not easily classified otherwise.  See similar Industrial, Food Processing.  See also Industrial, Storage Elevators."
      }
    ]
  },
  {
    value: "assembly_or_meeting_place",
    label: "Assembly / Meeting Place",
    description: "Facilities for public or private meetings.",
    subOptions: [
      {
        value: "assembly_or_meeting_place,club_or_lodge",
        label: "Club / Lodge",
        description:
          "A place where members of a organized social group gather for various activities.  May have a small kitchen and / or bar area where beverages are served."
      },
      {
        value: "assembly_or_meeting_place,community_or_recreation_center",
        label: "Community / Recreation Center",
        description:
          "Neighborhood facility often owned by the general public or a non-profit organization.  The facility generally includes a meeting room and / or an assembly hall that may also serve as a gymnasium.   Unlike an athletic club, this facility generally has limited or no locker room features.  See similar Recreation; Entertainment Center.  Also see Recreation; Fitness, Courts & Spa Facilities."
      },
      {
        value: "assembly_or_meeting_place,convention_center",
        label: "Convention Center",
        description:
          "Multiple meeting rooms and accommodations for trade booth exhibitors.  Features often include some kitchen & dining accommodations, high ceilings, ample electrical power, numerous electrical outlets, significant illumination, ample parking, and several truck docks.  Often but not always located in a major city with a passenger airport and many nearby lodging rooms to accommodate out-of-town guests."
      },
      {
        value: "assembly_or_meeting_place,reception_or_banquet_hall",
        label: "Reception / Banquet Hall",
        description:
          "Open floor plan assembly hall with no fixed seating and an adjoining commercial kitchen capable of meeting the food preparation needs of a wedding reception or other type of large dinner event."
      },
      {
        value: "assembly_or_meeting_place,religious_facility",
        label: "Religious Facility",
        description:
          "A building or group of buildings devoted to religious practices or housing for the clergy.",
        subOptions: [
          {
            value:
              "assembly_or_meeting_place,religious_facility,house_of_worship",
            label: "House of   Worship",
            description:
              "A facility where religious practices are conducted.  Examples include but not limited to: churches, temples, synagogues, chapels, mosques, and shrines."
          },
          {
            value:
              "assembly_or_meeting_place,religious_facility,residence_or_living_quarters",
            label: "Residence / Living Quarters",
            description:
              "A facility for the clergy / ministers to reside.  Examples include but not limited to:  single-unit dwellings, seminaries, convents, monasteries, and rectories."
          }
        ]
      },
      {
        value: "assembly_or_meeting_place,other_meeting_place",
        label: "Other Meeting Place",
        description:
          "All other assembly / meeting properties not easily classified otherwise."
      }
    ]
  },
  {
    value: "commercial_and_retail",
    label: "Commercial & Retail",
    description:
      "All commercial uses involve the buying or selling of goods and / or services.  A retail use is a type of commercial that sells products to consumers and where a retail sales tax is collected.  Some commercial uses like a laundromat, barbershop or dry cleaners, sell services, not products.  All retail uses are commercial in nature; all commercial uses are not retail.",
    subOptions: [
      {
        value: "commercial_and_retail,automotive",
        label: "Automotive",
        description:
          "A commercial property focusing on the sales, servicing, repair, or accessorizing passenger cars and small trucks.   See similar Transportation, Ground Transport.  Also see Industrial, Large Ground Vehicles.",
        subOptions: [
          {
            value: "commercial_and_retail,automotive,auto_auction",
            label: "Auto Auction",
            description:
              "A facility for the temporary holding and public sale of automobiles.  Typically features limited structural improvements for inspecting vehicles, and limited office space or covered sales areas."
          },
          {
            value: "commercial_and_retail,automotive,auto_sales",
            label: "Auto Sales",
            description:
              "Sales center for cars and / or small trucks that usually also features a service garage."
          },
          {
            value: "commercial_and_retail,automotive,auto_lube_shop",
            label: "Auto Lube Shop",
            description:
              "A specially-designed service facility for cars & small trucks that focuses on changing fluids like engine oil, anti-freeze, transmission oil, and steering fluid. Typically consists of a three-bay garage building with roll-up doors on both the front and rear elevations to enable drive-through service.  Garage bays feature in-ground, grease / service pits rather than hydraulic lifts.  Facility is not as well-suited for general auto repair due to the pits, and absence of hydraulic lifts.. "
          },
          {
            value: "commercial_and_retail,automotive,auto_repair",
            label: "Auto Repair",
            description:
              "Multiple-bay facility designed to accommodate a full range maintenance & repair of passenger cars and small trucks. Typically features hydraulic lifts in most service bays."
          },
          {
            value: "commercial_and_retail,automotive,auto_tire_store",
            label: "Auto Tire Store",
            description:
              "Service facility focusing on tire sales & replacement, suspension repair, and brake work for cars and small trucks.  Typically consists of a service garage with hydraulic lifts."
          },
          {
            value: "commercial_and_retail,automotive,car_wash,full-service",
            label: "Car Wash, Full-Service",
            description:
              "A car wash facility that requires no customer involvement."
          },
          {
            value: "commercial_and_retail,automotive,car_wash,hybrid",
            label: "Car Wash, Hybrid",
            description:
              "A car wash that is partially automated, and partially self-service."
          },
          {
            value: "commercial_and_retail,automotive,car_wash,self-service",
            label: "Car Wash, Self-Service",
            description:
              "Usually a garage-type building with separated bays that each contain a coin-operated, high pressure spray.  A hand-held wands jet soapy water and clean, rinse water.  Typically, there is no full-time, on-site staffing to collect money or operate equipment."
          },
          {
            value: "commercial_and_retail,automotive,fuel_and_service_station",
            label: "Fuel & Service Station",
            description:
              "Automobile refueling center that may offer few, if any, convenience items.  Older facilities may also have two or three service bays. May or may not include a car wash."
          },
          {
            value: "commercial_and_retail,automotive,parking_structure",
            label: "Parking Structure",
            description:
              "A structure, usually with multiple stories where vehicles are stored & protected from the weather.  May be publicly or privately owned and operated.  Excludes a surface parking lot which generally only has site improvements and no building.   See similar Land, Commercial, Vehicle Related."
          },
          {
            value:
              "commercial_and_retail,automotive,truck_stop_or_travel_center",
            label: "Truck Stop / Travel Center",
            description:
              "A facility typically adjacent to a highway designed to accommodate both passenger cars & large tractor-trailer trucks.  Usually offers numerous ancillary products & services like fuel, prepared foods with and without seating, overnight parking, lodging, showers and changing rooms, truck parts, service garage, etc.  "
          },
          {
            value: "commercial_and_retail,automotive,other_auto_related",
            label: "Other Auto Related",
            description:
              "All other auto-related properties for cars and small trucks not classified otherwise. "
          }
        ]
      },
      {
        value: "commercial_and_retail,bank",
        label: "Bank",
        description:
          "A building designed to house financial operations including but not limited to: lending, exchanging, and safeguarding money.  Sometimes safety deposit boxes are offered."
      },
      {
        value: "commercial_and_retail,condominium_or_co-op_bldg",
        label: "Condominium / Co-op Bldg",
        description:
          "A multiple-unit building or buildings in which individual units can be owned or occupied separately held by individual unit holders. Common areas may have an undivided, shared ownership."
      },
      {
        value: "commercial_and_retail,condominium_or_co-op_unit",
        label: "Condominium / Co-op Unit",
        description: "A single unit in a condominium or co-op building. "
      },
      {
        value: "commercial_and_retail,convenience_store",
        label: "Convenience Store",
        description:
          "A retail outlet offering convenience goods like snacks, dairy products, confectionaries, sundries, and beverages.  Easily-accessed location with long hours for the quick purchase of consumable products. Convenience stores have five identifiable formats:  mini-convenience, limited-selection, traditional, expanded, and hyper.",
        subOptions: [
          {
            value: "commercial_and_retail,convenience_store,kiosk",
            label: "Kiosk",
            description:
              "Typically less than 800 sq.ft. selling fast-moving items found in traditional convenience stores such as tobacco, beverages, snacks, and confectionaries. Gasoline is always the focus of this operation and parking is normally confined to the dispensing islands. "
          },
          {
            value: "commercial_and_retail,convenience_store,mini",
            label: "Mini",
            description:
              "Typically 800 to 1,200 sq.ft. focusing on gasoline sales as well as inside sales of grocery and thin foodservice.  Facilities typically utilize a center-island store with fuel dispensers on both sides of the mercantile building and a large canopy covering the dispensers and the building. There are generally minimal parking areas other than the dispensing islands."
          },
          {
            value: "commercial_and_retail,convenience_store,limited_selection",
            label: "Limited Selection",
            description:
              'Typically varying between 1,200 and 2,200 sq.ft., this store offers gasoline and inside sales as equally important products. They offer a broader product mix including some grocery as compared to “mini" stores.  Striped parking and extended hours of operation are common.'
          },
          {
            value: "commercial_and_retail,convenience_store,traditional",
            label: "Traditional",
            description:
              "Typically ranging from 2,200 to 2,800 sq.ft; this store offers a broad product mix and grocery.  Typically have 6 to 12 striped, parking spaces, easy pedestrian access, and extended hours of operation including 24 / 7."
          },
          {
            value: "commercial_and_retail,convenience_store,expanded",
            label: "Expanded",
            description:
              "Typically 2,800 to 3,600 sq.ft. with a wide selection of grocery and a quick-service restaurant (QSR) with seating.  Generally has 10 to 20 striped, parking spaces and extended hours of operation.  "
          },
          {
            value: "commercial_and_retail,convenience_store,hyper",
            label: "Hyper",
            description:
              "Usually more than 3,600 sq.ft. offering an array of products and services arranged in departments including, for example, a bakery, sit-down restaurant, or pharmacy.  Many stores also sell gasoline.  Requires proportionally more staffing to serve longer customer visits."
          }
        ]
      },
      {
        value: "commercial_and_retail,day_care_facility",
        label: "Day Care Facility",
        description:
          "A facility intended to care for pre-school children, elderly adults, or individuals with special needs during the day.",
        subOptions: [
          {
            value: "commercial_and_retail,day_care_facility,child",
            label: "Child",
            description: "Daytime care center for pre-school children."
          },
          {
            value: "commercial_and_retail,day_care_facility,adult",
            label: "Adult",
            description: "Daytime care center for elderly adults.  "
          },
          {
            value: "commercial_and_retail,day_care_facility,other_day_care",
            label: "Other Day Care",
            description:
              "Daytime care center for individuals with special needs."
          }
        ]
      },
      {
        value: "commercial_and_retail,garden_center",
        label: "Garden Center",
        description:
          "A facility that specializes in the retail sale of plants, landscaping, and other products to consumers and contractors."
      },
      {
        value: "commercial_and_retail,general_purpose",
        label: "General Purpose",
        description:
          "A generic building suitable for use by a myriad of retailers and service providers.  A large portion of the space is free from permanent partitions so its wide open.  The unobstructed floor plan facilitates the easy and inexpensive conversion from one use to another."
      },
      {
        value: "commercial_and_retail,general_retail",
        label: "General Retail",
        description:
          "A retail facility is a type of commercial use where products are sold to consumers and retail sales tax is collected.",
        subOptions: [
          {
            value: "commercial_and_retail,general_retail,big_box_retail",
            label: "Big Box Retail",
            description:
              "A large, single-user retail building over 15,000 sq.ft.  Often but not always features an exposed concrete floor and exposed, metal, roof structure.  Examples include:  Best Buy, Home Depot, Sportmart, Target, Walmart, Costco, and Bed, Bath & Beyond. "
          },
          {
            value: "commercial_and_retail,general_retail,retail_pad_building",
            label: "Retail Pad Building",
            description:
              "A free-standing retail building located on an out-parcel within a shopping center.  These type facilities generally enjoy superior street exposure."
          },
          {
            value: "commercial_and_retail,general_retail,store,department",
            label: "Store, Department",
            description:
              "Multiple-section stores that have a heavy emphasis on men and women fashions.  Typically includes a children’s department, house wares, china, and linens.  Examples: Nordstrom's, Macy's, Diller's, Kohl's, Sears, and JC Penny's"
          },
          {
            value: "commercial_and_retail,general_retail,store,drug",
            label: "Store, Drug",
            description:
              "A freestanding, retail store specializing in pharmaceuticals and pharmacy services as well as convenience items.    "
          },
          {
            value: "commercial_and_retail,general_retail,store,grocery",
            label: "Store, Grocery",
            description:
              "A neighborhood food store where fresh produce, meats and packaged food items are available for purchase.  Grocery stores typically are 10,000 sq.ft. or more."
          }
        ]
      },
      {
        value: "commercial_and_retail,laundromat,_self-service",
        label: "Laundromat, Self-Service",
        description:
          "Free-standing facility with self-service, coin-operated, clothes-cleaning equipment used by the general public.  The building is characterized by extensive plumbing to hook-up numerous washers and dryers as well as extensive electrical outlets."
      },
      {
        value: "commercial_and_retail,restaurant",
        label: "Restaurant",
        description:
          "A place where meals are prepared and served to the public.",
        subOptions: [
          {
            value: "commercial_and_retail,restaurant,fast_food",
            label: "Fast Food",
            description:
              "A facility that specializes in the rapid preparation and serving of a specialty food.  Examples include:  fried chicken, hamburgers, hot dogs, coffee, and donuts.  Typically features an auto drive-thru window for extra convenience.  Also called Quick Service restaurants."
          },
          {
            value: "commercial_and_retail,restaurant,full_service",
            label: "Full Service",
            description:
              "A facility that prepares and serves food with sit-down dining for patrons.  Alcoholic beverages may or may not be served.  Also called sit-down restaurants."
          },
          {
            value: "commercial_and_retail,restaurant,limited_service",
            label: "Limited Service",
            description:
              "A facility that offers prepared foods with few or no waiters / waitresses.  Layout typically includes separate ordering and pick-up stations, or self-serve, buffet tables."
          },
          {
            value: "commercial_and_retail,restaurant,other_restaurant",
            label: "Other Restaurant",
            description:
              "All other restaurants not easily classified otherwise."
          }
        ]
      },
      {
        value: "commercial_and_retail,showroom",
        label: "Showroom",
        description:
          "A hybrid office & warehouse with a major portion of the building finished into display space.  Interior finishing typically includes display space in the front portion of the ground level with unfinished warehouse in the rear, and some small portion of finished office space.  Usually does not sell carry-out products on a retail basis."
      },
      {
        value: "commercial_and_retail,street_retail",
        label: "Street Retail",
        description:
          "Storefront property that derives significant retail sales from drive-by traffic.  Property is not part of a shopping center, but is within an agglomeration of adjoining retail business structures along a commercial thoroughfare."
      },
      {
        value: "commercial_and_retail,tavern,_bar,_nightclub,_micro-brewery",
        label: "Tavern, Bar, Nightclub, Micro-Brewery",
        description:
          "Commercial establishments oriented around the sale, and on-site consumption of alcoholic beverages."
      },
      {
        value: "commercial_and_retail,other_commercial_and_retail",
        label: "Other Commercial & Retail",
        description:
          "All other commercial & retail facilities not classified otherwise."
      }
    ]
  },
  {
    value: "energy_generation",
    label: "Energy Generation",
    description:
      "A facility or structure designed to produce electrical power.",
    subOptions: [
      {
        value: "energy_generation,alternative_fuels",
        label: "Alternative Fuels",
        description:
          "A form of electricity generation produced with non-conventional fuel sources, which are often by-products of other processes.  Examples include biodiesel, bioalcohol (methanol, ethanol, butanol), hydrogen, non-fossil methane, non-fossil natural gas, vegetable oil, propane, and other biomass sources."
      },
      {
        value: "energy_generation,conventional_fuels",
        label: "Conventional Fuels",
        description:
          "An industrial place for the generation of electric power that is powered by conventional fuels. ",
        subOptions: [
          {
            value: "energy_generation,conventional_fuels,fossil",
            label: "Fossil",
            description:
              "An industrial place for the generation of electric power fueled by coal, natural gas, or oil."
          },
          {
            value: "energy_generation,conventional_fuels,cogeneration",
            label: "Cogeneration",
            description:
              "An industrial place for the generation of electric power that reuses waste heat for another purpose such as creating steam, which is used to heat a building."
          },
          {
            value: "energy_generation,conventional_fuels,hydroelectric",
            label: "Hydroelectric",
            description:
              "An industrial place for the generation of electric power using the energy of falling water.  "
          },
          {
            value: "energy_generation,conventional_fuels,nuclear",
            label: "Nuclear",
            description:
              "An industrial place for the generation of electric power fueled by nuclear fission.  "
          },
          {
            value:
              "energy_generation,conventional_fuels,other_conventional_fuels",
            label: "Other Conventional Fuels",
            description:
              "All other conventional fuels not classified otherwise."
          }
        ]
      },
      {
        value: "energy_generation,renewable_fuels",
        label: "Renewable Fuels",
        description:
          "A form of electricity generation produced with sustainable, naturally-occurring fuel sources.",
        subOptions: [
          {
            value: "energy_generation,renewable_fuels,downdraft_tower",
            label: "Downdraft Tower",
            description:
              "A form of electricity generation produced with a downdraft tower.  Water is sprayed on hot air at the top of the tower, making the cooled air fall through the tower and drive a turbine at the tower's base."
          },
          {
            value: "energy_generation,renewable_fuels,solar",
            label: "Solar",
            description:
              "A facility that uses photovoltaic panels to directly create electricity.  Another form of solar generation use mirrors and tracking systems to focus a large area of sunlight into a small beam.  The focused beam creates heat which is turned into steam.  Steam generators produce the electricity.  "
          },
          {
            value: "energy_generation,renewable_fuels,wind",
            label: "Wind",
            description:
              "A structure or group of structures that use revolving, wind-driven generation equipment to convert kinetic energy into electricity.  "
          },
          {
            value: "energy_generation,renewable_fuels,other_renewable_fuels",
            label: "Other Renewable Fuels",
            description:
              "All other renewable fuel sources not easily classified otherwise."
          }
        ]
      },
      {
        value: "energy_generation,other_energy_generation",
        label: "Other Energy Generation",
        description:
          "All other energy generation properties not classified otherwise."
      }
    ]
  },
  {
    value: "healthcare",
    label: "Healthcare",
    description:
      "Facilities for public or private, acute or chronic, health and medical services.  .  ",
    subOptions: [
      {
        value: "healthcare,acute_care_hospital",
        label: "Acute Care Hospital",
        description:
          "A facility that primarily provides active but short-term medical services under the supervision of physicians for severe injury, episode of illness, an urgent medical condition, or during recovery from surgery.  Services provided include:  diagnosis, treatment, care, surgery & rehabilitation.  In medical terms, care for acute health conditions is the opposite from chronic care, or longer term care."
      },
      {
        value: "healthcare,ambulatory_surgery_center",
        label: "Ambulatory Surgery Center",
        description:
          "A clinic where persons receive surgical procedures that do not require an overnight stay in a hospital."
      },
      {
        value: "healthcare,behavioral_care_facility",
        label: "Behavioral Care Facility",
        description:
          "A treatment center for psychiatric and mental disorders, Alzheimer’s, and developmentally disabled.  Psychiatric counseling for substance abuse patients."
      },
      {
        value: "healthcare,clinical_laboratory",
        label: "Clinical Laboratory",
        description:
          "A clinical testing center or laboratory (e.g. blood testing, serum lab, etc.)."
      },
      {
        value: "healthcare,hospital_or_medical_center",
        label: "Hospital / Medical Center",
        description:
          "A medical facility that provides a wide array of health care services on both an outpatient and / or inpatient basis. "
      },
      {
        value: "healthcare,rehabilitation_center",
        label: "Rehabilitation Center",
        description:
          "A recovery facility oriented toward the longer-term treatment and rehabilitation of sick or injured persons so they can function in society.  Rehabilitation follows stabilization of any acute medical conditions."
      },
      {
        value: "healthcare,urgent_care_center",
        label: "Urgent Care Center",
        description:
          ".An outpatient clinic where ill or injured persons can receive a wide range of smaller medical services with or without an appointment; a.k.a. immediate-care facility"
      },
      {
        value: "healthcare,other_healthcare",
        label: "Other Healthcare",
        description:
          "All other health care facilities not easily classified otherwise.   Includes facilities with unique attributes for special medical services and diagnostics like dialysis, MRI's, radiology, and oncology."
      }
    ]
  },
  {
    value: "housing",
    label: "Housing",
    description:
      "Property as a place to live.  A dwelling unit is a single-housing unit occupied by one or more related or unrelated people living together as a social group.",
    subOptions: [
      {
        value: "housing,condominium_-_co-op_building",
        label: "Condominium - Co-Op Building",
        description:
          "A multiple-unit housing building or buildings in which ownership of individual units can be owned or occupied by different parties.  Common areas have an undivided, shared ownership.  The ownership characterstics of condonimiums and co-ops are very different. "
      },
      {
        value: "housing,condominium_-_co-op_unit",
        label: "Condominium - Co-Op Unit",
        description:
          "One dwelling unit in a condominium - Co-Op housing development.  Common areas have an undivided, shared ownership. The ownership characterstics of condonimiums and co-ops are very different."
      },
      {
        value: "housing,group",
        label: "Group",
        description:
          "A facility that allows people with physical, mental, or emotional disabilities, or criminal backgrounds to learn (or relearn) the necessary skills to re-integrate into society.  Typically has a single, food-preparation area and common dining area."
      },
      {
        value: "housing,single_unit",
        label: "Single Unit",
        description:
          "One dwelling unit designed for occupancy by one family, or a group of people living together as a social group."
      },
      {
        value: "housing,multiple_units",
        label: "Multiple Units",
        description:
          "A structure with 2 or more dwelling units in 1 or more structures.  The site may consist of one or more parcels that have different legal descriptions.  All dwelling units are owned by the same party.  "
      },
      {
        value: "housing,senior",
        label: "Senior",
        description:
          "Designed for adults, 55 years or older, desiring or needing accommodations or assistance with daily living activities and / or nursing care.  ",
        subOptions: [
          {
            value: "housing,senior,assisted_living",
            label: "Assisted Living",
            description:
              "Designed for elderly persons or individuals with debilitating diseases who do need assistance with activities of daily living (ADL) but do not require continuous skilled nursing care.  Essentially an apartment with additional services like cooking, housecleaning, or minor nursing care.  May be in a separate wing or floor of a congregate residence, though licensure requirements for this type facility are generally more stringent than for congregate units. "
          },
          {
            value: "housing,senior,congregate_or_independent_living",
            label: "Congregate / Independent Living",
            description:
              "Essentially an apartment without medical services.  Designed for the elderly who pay for some services like housekeeping, transportation, & meals on a monthly basis, but require little, if any, assistance with daily living activities like eating, dressing, and bathing.  Residents may or may not receive health care provided by on-site staff or external agency.  May also be a retirement community designed to attract young retirees by emphasizing outdoor recreational activities. "
          },
          {
            value: "housing,senior,continuing-care_retirement_community",
            label: "Continuing-Care Retirement Community",
            description:
              "A facility designed, staffed, & equipped to accommodate elderly who do not need hospital care, but require skilled nursing care, other medical services, and assistance with daily living activities.  Some CCRC properties feature a combination of congregate / independent living units, assisted living beds, and skilled nursing beds.  Other facilities offer just congregate / independent units and skilled nursing beds. "
          },
          {
            value: "housing,senior,skilled_nursing_facility",
            label: "Skilled Nursing Facility",
            description:
              "Includes all licensed nursing beds. Skilled nursing facilities (SNF) are state-licensed nursing homes, which provide around-the-clock care for convalescent patients, a level of care just below acute hospital care."
          },
          {
            value: "housing,senior,other_senior_housing",
            label: "Other Senior Housing",
            description:
              "All other senior housing facilities not otherwise classified."
          }
        ]
      },
      {
        value: "housing,student",
        label: "Student",
        description:
          "Multiple-unit housing with specialized features for students.",
        subOptions: [
          {
            value: "housing,student,multiple_units",
            label: "Multiple Units",
            description:
              "Specialized multiple-unit housing structure typically designed for college students.  Each dwelling unit typically has a kitchen, one or more baths, one to four bedrooms, and study area(s).  Common areas may feature recreational and exercise areas."
          },
          {
            value: "housing,student,dormitory",
            label: "Dormitory",
            description:
              "A single building containing multiple sleeping quarters.  Typical features include a central food preparation area, shared dining room, and communal lavatories."
          },
          {
            value: "housing,student,fraternity_or_sorority",
            label: "Fraternity / Sorority",
            description:
              "A dwelling owned, maintained and inhabited by members of a specific group or affiliation.  Common features include a large food preparation area, large dining area, and sometimes a large meeting room.  Lavatories are often communal.  "
          },
          {
            value: "housing,student,other_student_housing",
            label: "Other Student Housing",
            description: "All other student housing not otherwise classified."
          }
        ]
      },
      {
        value: "housing,other_housing",
        label: "Other Housing",
        description: "All other housing facilities not otherwise classified."
      }
    ]
  },
  {
    value: "industrial",
    label: "Industrial",
    description:
      "Property primarily for research, development, production, storage or distribution of raw or finished goods, materials, or products.",
    subOptions: [
      {
        value: "industrial,business_park,_industrial",
        label: "Business Park, Industrial",
        description:
          "A master-planned development composed mostly of industrial buildings on a large tract with wide streets.  Higher-quality parks feature a campus-like setting with extensive landscaping, underground utilities, and architectural standards.  Usually have covenants, conditions and restrictions (CC&R’s) to promote a harmonious and attractive working environment.  Includes corporate campus."
      },
      {
        value: "industrial,commercial_laundry",
        label: "Commercial Laundry",
        description:
          "A plant for the laundering of garments, uniforms and other fabrics."
      },
      {
        value: "industrial,communication_or_data_center",
        label: "Communication / Data Center",
        description:
          "Facility specifically designed to house a large number of computers, communication apparatus, or other related equipment.  Custom features may include high-capacity climate controls, elaborate security access system, raised flooring, abundant electrical power, back-up generators or batteries, overhead wire racks, and connections to multiple internet-access providers.  Sometimes called server farms."
      },
      {
        value: "industrial,condominium_bldg",
        label: "Condominium Bldg",
        description:
          "A multiple-unit industrial building or buildings in which ownership of individual units can be separately held by individual unit owners.  Common areas have an undivided, shared ownership."
      },
      {
        value: "industrial,condominium_unit",
        label: "Condominium Unit",
        description:
          "One unit in an industrial condominium development.  An industrial condominium development is a multiple-unit building or buildings in which ownership of the units is separately held by the individual unit owners.  Common areas have an undivided, shared ownership."
      },
      {
        value: "industrial,flex_space",
        label: "Flex Space",
        description:
          "Facilities designed to flexibly allow conversion of unfinished space into finished space.  Typical features include:  a single-story building with office space between 25% and 85%.  Often but not always designed for multiple tenants.  Also known as service center or tech space.  "
      },
      {
        value: "industrial,manufacturing",
        label: "Manufacturing",
        description:
          "A facility used for the conversion, fabrication and / or assembly of raw or partially finished materials into a finish or partially-finished product",
        subOptions: [
          {
            value: "industrial,manufacturing,light",
            label: "Light",
            description:
              "Manufacturing operations with less extensive physical plant requirements than heavy industry and less objectionable annoyances.  Typically generates nil to mild mal-odors, dust, pollution, vibrations, smoke, vibrations, or noise."
          },
          {
            value: "industrial,manufacturing,heavy",
            label: "Heavy",
            description:
              "Manufacturing operations that are physically extensive or complex, and usually require large tracts of land like auto-assembly plants, steel mills, forges, & refineries.  Often generates moderate to significant mal-odors, dust, pollution, vibrations, smoke, or noise."
          },
          {
            value: "industrial,manufacturing,high_tech",
            label: "High Tech",
            description:
              "Manufacturing operation designed to meet the needs of high technology fabrication processes. Generally considered to have more demanding building standards than heavy industry.  May have sophisticated clean rooms, vibration dampening, high-capacity electrical power, and / or biohazard containment features."
          }
        ]
      },
      {
        value: "industrial,processing",
        label: "Processing",
        description:
          "An industrial plant for purifying a crude substance or the creation of chemical products by using a variety of industrial processes.  Processes may include flotation, magnetic separation, thermal treatment, electrostatic separation, selective flocculation, gravitational separation, leaching, etc.",
        subOptions: [
          {
            value: "industrial,processing,food",
            label: "Food",
            description:
              "A plant for converting raw food and meat products into packaged products for institutional use or retail consumers.  Food processing facilities usually contain many special design features to meet health code requirements.  A substantial portion of these facilities include large refrigerated areas to minimize bacterial growth and extend the life of perishable food products."
          },
          {
            value: "industrial,processing,mineral",
            label: "Mineral",
            description:
              "A facility designed to facilitate the extraction and concentration of economic minerals contained in ore.  Mineral processing involve various procedures that rely on the mineral’s gravimetric, magnetic characteristics, color or on reagents to make target particles float to the surface.  Actual operations / processes may include grinding, crushing, milling, flotation, classification and electrostatic or pyro-processing,  Examples include cement, copper, and fertilizer plants. "
          },
          {
            value: "industrial,processing,refinery",
            label: "Refinery",
            description:
              "A facility that uses chemical properties or reactions to turn raw materials such as coal, oil, and salt into a variety of products.  Processes include: thermal treatment, filtering or mixing with chemical reagents.  Examples of end-products include synthetic dyes and fibers, pesticides, pharmaceuticals, synthetic rubber, plastics, and various petroleum-based products.."
          },
          {
            value: "industrial,processing,solid_wastes",
            label: "Solid Wastes",
            description:
              "Smaller-scale, privately-owned facilities designed to process non-liquid waste materials for an individual property, small community, or as part of private enterprise.  Examples include operations that recycle glass, paper, rubber, computer parts, and plastics.  This classifications excludes landfills and compost dumps, which are classified as land.  Large-scale, governmental operations like recycling, waste-transfer stations, and incinerator are classified as Infrastructure."
          },
          {
            value: "industrial,processing,wastewater",
            label: "Wastewater",
            description:
              "Smaller-scale, privately-owned facilities designed to purify various fluids like water, sewage, and industrial effluent through the use of filtration, chemical reagents and/or biochemical processes into less-objectionable substances. Large-scale, governmental operations are classified as Infrastructure."
          },
          {
            value: "industrial,processing,other_processing",
            label: "Other Processing",
            description:
              "All other processing properties not easily classified otherwise."
          }
        ]
      },
      {
        value: "industrial,large_ground_vehicles",
        label: "Large Ground Vehicles",
        description:
          "Facilities for the sale, repair, maintenance, and dismantling of large, motorized, ground vehicles like tractor-trailers, buses, & trains.  These services for non-ground vehicles (aircraft & large watercraft / ships) are classified under Transportation.   See similar Commercial & Retail, Automotive.  For loading and unloading of passengers, see Transportation, Ground Transport.",
        subOptions: [
          {
            value: "industrial,large_ground_vehicles,sales,leasing,repair",
            label: "Sales, Leasing, Repair",
            description:
              "Large facilities for the sales, leasing or repair & maintenance of large trucks & buses.  Special features include tall ceilings, large entry doors on front and rear elevations to allow drive-through  convenience, and maybe low-capacity overhead or jib cranes.  See similar Commercial & Retail, Automotive, Auto Repair.  "
          },
          {
            value: "industrial,large_ground_vehicles,train_repair",
            label: "Train Repair",
            description:
              "Huge facility for the repair, maintenance, and dismantling of trains.  Special features include huge, overhead, entry doors, rail spur, heavy-capacity overhead cranes and abundant electrical power."
          },
          {
            value:
              "industrial,large_ground_vehicles,truck_terminal_or_transfer_facility",
            label: "Truck Terminal / Transfer Facility",
            description:
              "A loading facility for truck freight operators to redistribute loads between trucks at an intermediate transfer point.  These facilities are primarily used for staging loads and possess very little, if any over-night storage area.  Intermodal operations for ground transport of standardized, steel containers are considered a land use; see Land, Industrial, Intermodal Yard / Rail Yard."
          },
          {
            value:
              "industrial,large_ground_vehicles,other_large_ground_vehicle",
            label: "Other Large Ground Vehicle",
            description:
              "All other activities for large ground vehicles not easily classified otherwise."
          }
        ]
      },
      {
        value: "industrial,research_and_development",
        label: "Research & Development",
        description:
          "A type of building popular in high technology industries such as computers, electronics, laboratories, and biotechnology.  Generally a hybrid of office, manufacturing, and warehouse space housed in visually appealing, high-quality building.  Often characterized by a location in a campus-like business park with extensive landscaping, high parking ratios, architectural standards, and abundant green space; commonly called a R&D building.  See similar Office, Research & Development."
      },
      {
        value: "industrial,saw_mill",
        label: "Saw Mill",
        description:
          "Cutting, grinding, and milling operations that convert raw timber into lumber & other wood products."
      },
      {
        value: "industrial,self-storage_or_mini-storage",
        label: "Self-Storage / Mini-Storage",
        description:
          "A facility that rents, on a monthly basis, small cubicles of unfinished storage space typically ranging from 20 to 500 square feet.  "
      },
      {
        value: "industrial,tank_farm_or_petroleum_storage",
        label: "Tank Farm / Petroleum Storage",
        description:
          "Lands improved with large, enclosed reservoirs for the temporary storage of petroleum-based fluids.  Tanks are individually surrounded by containment dikes."
      },
      {
        value: "industrial,warehouse",
        label: "Warehouse",
        description:
          "A structure designed and used for the storage of goods and merchandise; usually does not have a prominent commercial identity.",
        subOptions: [
          {
            value: "industrial,warehouse,air_cargo",
            label: "Air Cargo",
            description:
              "A building located on airport land specially designed to ship goods via air-cargo containers, and the loading & unloading of containers from aircraft."
          },
          {
            value: "industrial,warehouse,distribution",
            label: "Distribution",
            description:
              "A storage building designed for the orderly movement of goods or products.  Building characteristics typically include high ratio of truck docks, large land to building ratio facilitating easy truck access, small ratio of office space and usually tall ceiling height."
          },
          {
            value: "industrial,warehouse,general_purpose",
            label: "General Purpose",
            description:
              "A storage building with a small ratio of office space, 12' or more ceiling height, and adequate truck loading & unloading accommodations.  Electrical power and lighting is adequate for storage operations but not manufacturing or processing.  Low-capacity climate controls are usually adequate just for the storage of package goods. "
          },
          {
            value: "industrial,warehouse,lumber_yard",
            label: "Lumber Yard",
            description:
              "A facility intended to store lumber in one or more enclosed or partially-enclosed structure(s). Intended for wholesale commerce; not retail sales.  May provide some minor processing of lumber, but processing is not a major activity.  "
          },
          {
            value: "industrial,warehouse,loft_or_multi-story",
            label: "Loft / Multi-Story",
            description:
              "Multiple story, unfinished building typically built of reinforced concrete, brick, or heavy timbers. Typically located in dense inner-city environments."
          },
          {
            value: "industrial,warehouse,refrigerated_or_cold_storage",
            label: "Refrigerated / Cold Storage",
            description:
              "A structure designed and used for the storage food products and other goods in cooled or freezer rooms through the use of refrigeration."
          },
          {
            value: "industrial,warehouse,storage_elevators",
            label: "Storage Elevators",
            description:
              "A bulk storage structure where non-farm products are retained in cylindrical silos.  Commonly stored items include: coal, cement, carbon black, woodchips, and sawdust.  See similar Agriculture, Grain Elevator."
          },
          {
            value: "industrial,warehouse,other_warehouse",
            label: "Other warehouse",
            description:
              "All other warehouse facilities not easily classified otherwise."
          }
        ]
      },
      {
        value: "industrial,other_industrial",
        label: "Other Industrial",
        description:
          "All other industrial facilities not easily classified otherwise."
      }
    ]
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
    description:
      "Large-scale, fundamental & essential facilities and systems usually owned by a local government, public utility, or a private enterprise hired by local government.  However, infrastructure may be privately owned.  Examples include transportation, communication, water, sewer, and electricity systems.  Most infrastructure is classified as a structure, not a building.",
    subOptions: [
      {
        value: "infrastructure,dam",
        label: "Dam",
        description:
          "A barrier that impounds water or an underground stream.  The reservoir created provides water for various needs including irrigation, human consumption, industrial use, aquaculture, navigation, and flood control.   Collected water can also be distributed to other locations, or used in hydropower plants to generate electricity.  See Public Service, Dikes and Floodgates."
      },
      {
        value: "infrastructure,dikes_and_floodgates",
        label: "Dikes & Floodgates",
        description:
          "Dikes are natural or artificial slopes or walls used to regulate water levels; they are also called levees.  Floodgates are adjustable gates used to control water flow in flood barriers, reservoir, river, stream, or dike systems.  Dams create water reservoirs; see Infrastructure, Dams."
      },
      {
        value: "infrastructure,electrical_storage_and_conveyance",
        label: "Electrical Storage & Conveyance",
        description:
          "A large-scale facility to store and distribute electrical power.  "
      },
      {
        value: "infrastructure,natural_gas_storage_and_conveyance",
        label: "Natural Gas Storage & Conveyance",
        description:
          "A large-scale facility to store and distribute natural gas."
      },
      {
        value: "infrastructure,roads,_bridges,_and_related_items",
        label: "Roads, Bridges, & Related Items",
        description:
          "Paved routes for motor vehicles; usually publicly owned.  Examples include: streets, roads, alleys, bridges, curbs, gutters, sidewalks, street lights, etc."
      },
      {
        value: "infrastructure,solid_waste_incinerators",
        label: "Solid Waste Incinerators",
        description:
          "A large-scale, governmental facility that reduces solid waste to ashes with intense heat.  May also be a governmentally-hired private enterprise."
      },
      {
        value: "infrastructure,solid_waste_recycling",
        label: "Solid Waste Recycling",
        description:
          "A large-scale, governmental facility that recycles solid waste materials like glass, paper, and plastics.  May also be a governmentally-hired private enterprise."
      },
      {
        value: "infrastructure,waste_transfer_station",
        label: "Waste Transfer Station",
        description:
          "A facility that unloads specially designed, solid-waste collection trucks (garbage trucks), then reloads the waste onto large tractor-trailers or another mode of transport (rail, boat or barge) before movement to another location for burial or incineration."
      },
      {
        value: "infrastructure,wastewater_treatment",
        label: "Wastewater Treatment",
        description:
          "A large-scale facility designed to collect and clean waste water.  Commonly called a sewer system with waste treatment plant."
      },
      {
        value: "infrastructure,water_cleansing,_storage,_and_conveyance",
        label: "Water Cleansing, Storage, and Conveyance",
        description:
          "A large-scale facility to clean, store, pump, and distribute potable water.  "
      },
      {
        value: "infrastructure,other_infrastructure",
        label: "Other Infrastructure",
        description:
          "All other infrastructure facilities not classified otherwise."
      }
    ]
  },
  {
    value: "lodging_and_hospitality",
    label: "Lodging & Hospitality",
    description:
      "Property designed primarily to serve short- or medium-term overnight stays in a commercial establishment.",
    subOptions: [
      {
        value: "lodging_and_hospitality,all_suites",
        label: "All Suites",
        description:
          "Guest rooms with a bedroom area apart from a living / sitting area."
      },
      {
        value: "lodging_and_hospitality,bed_and_breakfast",
        label: "Bed & Breakfast",
        description:
          "A house, generally an older renovated residence, where lodging and breakfast are provided to paying guests.  A portion of the guest rooms often require the use of communal rest rooms."
      },
      {
        value: "lodging_and_hospitality,casino_hotel",
        label: "Casino Hotel",
        description:
          "A lodging facility combined with a full casino gaming facility."
      },
      {
        value: "lodging_and_hospitality,convention_hotel",
        label: "Convention Hotel",
        description:
          "Hotels designed to accommodate large groups and functions. They provide facilities such as one or more large ballrooms with breakout areas for meetings and conferences, exhibit space for trade shows, sample and display rooms for sales meetings, extensive restaurant and lounge capacity, and the some recreational amenities found in commercial hotels. They are sometimes located next to convention centers."
      },
      {
        value: "lodging_and_hospitality,economy_hotel_or_motel",
        label: "Economy Hotel / Motel",
        description:
          "A facility that typically features exterior lodging-room access, minimal or no recreational facilities, and few, if any, conveniences."
      },
      {
        value: "lodging_and_hospitality,extended_stay",
        label: "Extended Stay",
        description:
          "A hotel designed for travelers who must stay in an area for a prolonged period, typically seven or more days.  Amenities offered create a more home-like environment than a standard hotel. Guestrooms often have a full, eat-in kitchen with separate sleeping and living areas.  Food and beverage services are limited.  This type hotel is a cross between an apartment and an all-suite hotel."
      },
      {
        value: "lodging_and_hospitality,full_service",
        label: "Full Service",
        description:
          "A facility that offers a wide array of services including but not limited to:  room service, valet, concierge, transportation, tour services, barber shop, beauty salon, bellhop service, laundry service, full liquor service in a lounge, restaurant, turndown service, morning newspaper, fitness center, swimming pool, banquet hall, and meeting space, etc."
      },
      {
        value: "lodging_and_hospitality,limited_service",
        label: "Limited Service",
        description:
          "Typical features include interior lodging-room access, some recreational and / or exercise facilities, and some conveniences.  May offer limited food & liquor service."
      },
      {
        value: "lodging_and_hospitality,luxury",
        label: "Luxury",
        description:
          "A full-service hotel that features sumptuous physical surroundings and services.  Much of the extravagance is considered nonessential but conducive to pleasure and comfort.  Also known as five-star hotel."
      },
      {
        value: "lodging_and_hospitality,resort_and_spa",
        label: "Resort & Spa",
        description:
          "A hotel typically situated in a scenic area that either provides or is near activities that attract leisure travelers.  Nearby recreation may include:  swimming, tennis, golf, boating, skiing, ice skating, riding, hiking, & sightseeing.  Services offered may include:  restaurant, lounge, entertainment, fitness center, concierge, valet service, local transportation, tour services, and a limited amount of meeting and banquet space. Seasonality often affects the level of occupancy."
      },
      {
        value: "lodging_and_hospitality,other_lodging_and_hospitality",
        label: "Other Lodging & Hospitality",
        description:
          "All other lodging and hospitality facilities not otherwise classified."
      }
    ]
  },
  {
    value: "military_facility",
    label: "Military Facility",
    description: "A government-owned property supporting the armed forces.",
    subOptions: [
      {
        value: "military_facility,armory",
        label: "Armory",
        description:
          "A facility for the storage of arms and ammunitions, and where military personnel are trained.  "
      },
      {
        value: "military_facility,other_military_facilities",
        label: "Other Military Facilities",
        description:
          "Military facilities not classified in this property classification system.  See Department of Defense (DOD) category codes.  "
      }
    ]
  },
  {
    value: "mixed_use",
    label: "Mixed Use",
    description:
      "One or more buildings containing multiple property use types.    ",
    subOptions: [
      {
        value: "mixed_use,mixed_use_building",
        label: "Mixed Use Building",
        description:
          "A free-standing structure having a mixture of property uses.  Most often the mix is office, retail, or general commercial along with a large portion of housing. "
      },
      {
        value: "mixed_use,mixed_use_development",
        label: "Mixed Use Development",
        description:
          "One or more buildings forming a major real estate project with planned integration of several uses like retail, office, housing, lodging, recreation, or other compatible uses. "
      }
    ]
  },
  {
    value: "office",
    label: "Office",
    description:
      "A property offering finished space designed primarily for businesses, and business support services such as administration, accounting, marketing, information processing and dissemination, consulting, human resource management, financial and insurance services, educational and medical services, and other professional services. ",
    subOptions: [
      {
        value: "office,business_park,_office",
        label: "Business Park, Office",
        description:
          "A master-planned development that is mostly composed of office buildings on a large tract with wide streets.  Better quality parks feature a campus-like setting with extensive landscaping, underground utilities, architectural standards, and conditions, covenants and restrictions (CC&R’s) to promote a harmonious and attractive working environment."
      },
      {
        value: "office,condominium_building",
        label: "Condominium Building",
        description:
          "A multiple-unit office building or buildings in which ownership of individual units can be separately held by individual unit owners.  Common areas have an undivided, shared ownership."
      },
      {
        value: "office,condominium_unit",
        label: "Condominium Unit",
        description:
          "One unit in an office condominium development.  An office condominium development is a multiple-unit building or buildings in which ownership of the units is separately held by the individual unit owners.  Common areas have an undivided, shared ownership."
      },
      {
        value: "office,creative_or_loft",
        label: "Creative / Loft",
        description:
          "Older retail / industrial buildings converted to finished business space catering to creative users such as the entertainment industry, advertising agencies, and high technology firms.  Interior finishing typically reflects an architectural style that emphasizes the building's structural and mechanical systems. These buildings often have a shortage of parking because creative / high tech users have people per unit greater than the original building users."
      },
      {
        value: "office,medical",
        label: "Medical",
        description:
          "Buildings containing finished space with special features for the medical profession such as doctors, dentists, medical labs, or other medical users.  The space typically offers:  high capacity HVAC system, abundant illumination and electrical outlets, and small treatment rooms with small sinks."
      },
      {
        value: "office,general_purpose",
        label: "General Purpose",
        description:
          "A building offering mostly finished space that satisfies the needs of one or more businesses, professionals, or business support services.  A corporate headquarter is categorized as high-quality, general office while a corporate campus is best classified as a office, business park. "
      },
      {
        value: "office,research_and_development",
        label: "Research & Development",
        description:
          "A building usually erected with interior finishing suitable for general business and laboratory functions.  A small portion of the building may be used for light assembly. Typically an above-average quality structure found in better-quality business parks.  See similar Industrial, Research & Development."
      },
      {
        value: "office,other_office",
        label: "Other Office",
        description: "All office-type facilities not classified otherwise."
      }
    ]
  },
  {
    value: "public_service",
    label: "Public Service",
    description:
      "Buildings or structures provided by government or an institution to assist or serve the public.",
    subOptions: [
      {
        value: "public_service,courthouse",
        label: "Courthouse",
        description:
          "A building housing courts of law; the place where justice is administered."
      },
      {
        value: "public_service,educational",
        label: "Educational",
        description:
          "Buildings and other facilities used for education and learning."
      },
      {
        value: "public_service,embassy_compound",
        label: "Embassy Compound",
        description:
          "A building or complex that houses the official residence and offices of an ambassador or diplomat of a foreign government."
      },
      {
        value: "public_service,fire_house",
        label: "Fire House",
        description:
          "A building housing fire-fighting apparatus and firefighters,"
      },
      {
        value: "public_service,jail_or_correctional_facility",
        label: "Jail / Correctional Facility",
        description:
          "A detention facility designed to house and incarcerate suspected and sentenced criminals."
      },
      {
        value: "public_service,library",
        label: "Library",
        description:
          "A place in which literary, musical, artistic, or reference materials are kept for use but not for sale."
      },
      {
        value: "public_service,museum_or_gallery",
        label: "Museum / Gallery",
        description:
          "A facility designed to exhibit works of art such as paintings, sculptures, and photographs."
      },
      {
        value: "public_service,police_station",
        label: "Police Station",
        description: "A facility designed to be the law enforcement center.  "
      },
      {
        value: "public_service,post_office",
        label: "Post Office",
        description:
          "A facility that sorts and distributes mail and small packages."
      },
      {
        value: "public_service,zoo_or_nature_facility_or_aquarium",
        label: "Zoo / Nature Facility / Aquarium",
        description: "A facility that houses animal wildlife for exhibition."
      },
      {
        value: "public_service,other_public_service",
        label: "Other Public Service",
        description:
          "All other public service facilities not classified otherwise"
      }
    ]
  },
  {
    value: "recreation",
    label: "Recreation",
    description:
      "Properties where people congregate, often in large numbers, for sports related, entertainment, or recreational activities.  ",
    subOptions: [
      {
        value: "recreation,amusement_facility",
        label: "Amusement Facility",
        description:
          "A recreation center oriented around game activities and / or thrill rides.",
        subOptions: [
          {
            value: "recreation,amusement_facility,amusement_or_theme_park",
            label: "Amusement / Theme Park",
            description:
              "A permanently located, commercially-operated park offering various forms of entertainment such as arcade games, carousels, roller coasters, and performers as well as food, drink, and souvenirs.  Differs from circuses, carnivals, and fairs which typically travel.  Theme parks are specialty amusement parks designed to evoke distant or imaginary locales and / or eras, such as the Wild West, an African safari, or medieval Europe."
          },
          {
            value:
              "recreation,amusement_facility,aquatic_facility_or_swimming_pool",
            label: "Aquatic Facility / Swimming Pool",
            description:
              "A facility with indoor and / or outdoor pools for swimming by humans.  Excludes waterslide facilities which are classified separately."
          },
          {
            value: "recreation,amusement_facility,arcade",
            label: "Arcade",
            description:
              "A commercial establishment featuring rows of coin-operated games."
          },
          {
            value: "recreation,amusement_facility,bowling_alley",
            label: "Bowling Alley",
            description:
              "A commercial facility designed to accommodate the sport of bowling. The building includes special equipment and design features such as a ball return, pin-setting equipment and bowling lanes with gutters."
          },
          {
            value: "recreation,amusement_facility,entertainment_center",
            label: "Entertainment Center",
            description:
              "A combination of recreational uses that form a single property.   Uses may include: an arcade, bowling alley, miniature golf, go-carts, cinema, pool hall, water recreation, etc.  See similar Assembly / Meeting Place, Community Center."
          },
          {
            value: "recreation,amusement_facility,go-cart_track",
            label: "Go-Cart Track",
            description:
              "Small-scale track that allows patrons to operate mini-race cars."
          },
          {
            value: "recreation,amusement_facility,miniature_golf",
            label: "Miniature Golf",
            description:
              "A novelty version of golf played with a putter and ball on a miniature, artificial-turf course with obstacles such as bridges, tunnels, and small waterways."
          },
          {
            value: "recreation,amusement_facility,waterslide_park",
            label: "Waterslide Park",
            description:
              "Recreation center oriented around water slides, wave pools and other water-related activities."
          },
          {
            value: "recreation,amusement_facility,other_amusements",
            label: "Other Amusements",
            description:
              "All other amusement facilities not classified otherwise."
          }
        ]
      },
      {
        value: "recreation,casino_or_gaming_facility",
        label: "Casino / Gaming Facility",
        description:
          "Free standing gambling parlor that does not offer lodging.  Casino hotels are classified under Lodging."
      },
      {
        value: "recreation,cinema",
        label: "Cinema",
        description: "A facility where motion pictures are shown.",
        subOptions: [
          {
            value: "recreation,cinema,theater,indoor,single_screen",
            label: "Theater, Indoor, Single Screen",
            description:
              "A public establishment that offers just one motion picture screen."
          },
          {
            value: "recreation,cinema,theater,indoor,multiple_screen",
            label: "Theater, Indoor, Multiple Screen",
            description:
              "A public facility for simultaneously projecting multiple motion pictures in separate rooms.  May contain multiple motion picture formats like wide screen and 3D.  "
          },
          {
            value: "recreation,cinema,theater,outdoor",
            label: "Theater, Outdoor",
            description:
              "Outdoor movie theater whereby the audience remains in their own cars to watch a motion picture.  Typically consists of a large tract with individual sound speaker hookups that temporarily attach to the car.  Limited small building to house a concession stand and rest rooms."
          }
        ]
      },
      {
        value: "recreation,equestrian_center",
        label: "Equestrian Center",
        description:
          "A facility for riding and showing horses.  Facilities generally include stables, training pens, and access to riding trails.  Higher-end centers will include a restaurant / club house and / or a small arena for polo and riding exhibitions."
      },
      {
        value: "recreation,fitness,_courts,_and_spa_facilities",
        label: "Fitness, Courts, and Spa Facilities",
        description:
          "An exercise / recreation property that includes fitness training, court sports, locker rooms, and / or spa facilities.",
        subOptions: [
          {
            value:
              "recreation,fitness,_courts,_and_spa_facilities,court_facility",
            label: "Court Facility",
            description:
              "An exercise facility designed for competitive activities played on a court.  Examples include tennis, racquetball, handball, squash, etc."
          },
          {
            value:
              "recreation,fitness,_courts,_and_spa_facilities,health_and_fitness_center_or_sports_club_or_gym",
            label: "Health & Fitness Center / Sports Club / Gym",
            description:
              "An exercise facility featuring an assortment of weight / resistance training, aerobic activities, and locker room / shower facilities. Category encompasses a wide range of facilities. Lower-end facilities may only provide weight-training equipment while upper-end facilities may include court sports, swimming pools, classes, and spa treatments."
          },
          {
            value:
              "recreation,fitness,_courts,_and_spa_facilities,rock_climbing",
            label: "Rock Climbing",
            description:
              "A fitness center characterized by a large, open space and ceiling height of 30 or more feet and a small portion of office space.  May or may not include locker rooms."
          },
          {
            value: "recreation,fitness,_courts,_and_spa_facilities,spa_resort",
            label: "Spa Resort",
            description:
              "A relaxation, rejuvenation, recreation hotel destination. Modern spas provide therapeutic treatments and exercise, and are usually located in scenic areas that may also include recreational activities such as golf, tennis or skiing."
          },
          {
            value:
              "recreation,fitness,_courts,_and_spa_facilities,other_fitness_and_court_facilities",
            label: "Other Fitness & Court Facilities",
            description:
              "All other fitness, courts, and spa facilities not classified otherwise."
          }
        ]
      },
      {
        value: "recreation,golf_related",
        label: "Golf Related",
        description: "A property oriented towards the sport of golf.",
        subOptions: [
          {
            value: "recreation,golf_related,driving_range",
            label: "Driving Range",
            description:
              "Golf practice facility that typically consists of a driving and putting practice area. "
          },
          {
            value: "recreation,golf_related,golf_course_club",
            label: "Golf Course Club",
            description:
              "A facility for playing the game of golf.  Improvements typically include specific design, grading, landscaping, irrigation system, clubhouse with food and beverage service, and storage. May be a public or private country club."
          },
          {
            value: "recreation,golf_related,golf_resort",
            label: "Golf Resort",
            description:
              "An upscale destination oriented around a golf course.  May have other club facilities available."
          },
          {
            value: "recreation,golf_related,other_golf",
            label: "Other Golf",
            description:
              "All other golf-related facilities not classified otherwise."
          }
        ]
      },
      {
        value: "recreation,racetrack",
        label: "Racetrack",
        description:
          "A venue designed to meet the needs of competitive racing.  Minimum improvements typically include spectator stands lined around a raceway, food concessions, and lavatory facilities.",
        subOptions: [
          {
            value: "recreation,racetrack,auto",
            label: "Auto",
            description:
              "A venue designed to meet the needs of competitive auto racing.  At a minimum, improvements include spectator stands around a raceway, food concessions, and lavatory facilities."
          },
          {
            value: "recreation,racetrack,dog",
            label: "Dog",
            description:
              "A venue designed to meet the needs of competitive dog racing.  At a minimum, improvements include spectator stands around a raceway, food concessions, lavatory facilities, and betting cages."
          },
          {
            value: "recreation,racetrack,horse",
            label: "Horse",
            description:
              "A venue designed to meet the needs of competitive horse racing.  At a minimum, improvements include spectator stands around a raceway, food concessions, lavatory facilities, and betting cages."
          },
          {
            value: "recreation,racetrack,other_racetrack",
            label: "Other Racetrack",
            description: "All other racetracks not classified otherwise."
          }
        ]
      },
      {
        value: "recreation,shooting_range",
        label: "Shooting Range",
        description:
          "A specialized facility designed for firearms or archery practice.  May be indoor or outdoor.  "
      },
      {
        value: "recreation,skating_facility",
        label: "Skating Facility",
        description:
          "A property designed to accommodate skating sports; includes both indoor and outdoor facilities.  May include figure skating, curling, ice hockey, roller skating, skateboarding, in-line-wheel skating."
      },
      {
        value: "recreation,ski_resort",
        label: "Ski Resort",
        description:
          "A mountain / hillside recreation area oriented around snowboarding, downhill and / or cross-country skiing, and other winter sports."
      },
      {
        value: "recreation,sports_arena_or_stadium",
        label: "Sports Arena / Stadium",
        description:
          "A large-scale venue designed to stage athletic competitions before large audiences.",
        subOptions: [
          {
            value: "recreation,sports_arena_or_stadium,indoor",
            label: "Indoor",
            description:
              "High-capacity enclosed arena designed for large-scale sporting and entertainment events."
          },
          {
            value: "recreation,sports_arena_or_stadium,outdoor",
            label: "Outdoor",
            description:
              "High-capacity open-air arena designed for large-scale sporting and entertainment events."
          }
        ]
      },
      {
        value: "recreation,theater_or_performing_arts_facility",
        label: "Theater / Performing Arts Facility",
        description:
          "A building where theatrical performances are held.  Audience seating areas typically rise away from the stage / screen on a slope or stepped incline to allow audiences members views unimpeded by the rows of people in front of them.",
        subOptions: [
          {
            value:
              "recreation,theater_or_performing_arts_facility,auditorium_building",
            label: "Auditorium Building",
            description:
              "A large seating hall designed to promote the audience’s reception of a stage performance.  Acoustical features include noise dampening walls that minimize noise reflection as well as a ceiling design that maximizes sound projection to the far reaches of the hall."
          },
          {
            value:
              "recreation,theater_or_performing_arts_facility,concert_hall_or_arena",
            label: "Concert Hall / Arena",
            description:
              "A large seating and sound-stage facility with better acoustics and seating accommodations than an auditorium."
          },
          {
            value:
              "recreation,theater_or_performing_arts_facility,outdoor_amphitheater",
            label: "Outdoor Amphitheater",
            description:
              "An outdoor concert sound stage that typically includes a band shell to project the performance toward audience seating."
          },
          {
            value:
              "recreation,theater_or_performing_arts_facility,other_theater",
            label: "Other Theater",
            description: "All other theaters not classified otherwise."
          }
        ]
      },
      {
        value: "recreation,other_recreation",
        label: "Other Recreation",
        description:
          "All other recreational facilities not classified otherwise."
      }
    ]
  },
  {
    value: "shopping_centers",
    label: "Shopping Centers",
    description:
      "A collection of retail stores with a common parking area, and generally one or more large department, discount, or food stores; sometimes includes an enclosed mall or walkway.  Uses below generally organized by building size, then specialty",
    subOptions: [
      {
        value: "shopping_centers,convenience_or_strip_center",
        label: "Convenience / Strip Center",
        description:
          "A collection of businesses offering convenience goods & services with on-site parking in the front of the site.  Open canopies may connect the store fronts, but enclosed walkways do not link stores.  Typically less than 30,000 sq.ft. with the primary trade area being less than a 5-minute drive time.  Typical tenants include: convenience stores, drug stores, dry cleaners, small restaurants, hair salon or barbershop, shoe repair, and local professional services."
      },
      {
        value: "shopping_centers,neighborhood_center",
        label: "Neighborhood Center",
        description:
          "These type centers also focus on conveniences but typically contain 30,000 to 150,000 sq.ft. of gross leasable area (GLA) on 4 to 10 acres.  A supermarket is often the principal anchor with all anchors occupying 30% to 50% of the entire property.  Its primary trade area  (the area from which 60% to 80% of its sales originate) typically extends up to 1.5 miles with drive times being less than 5 minutes."
      },
      {
        value: "shopping_centers,community_shopping_center",
        label: "Community Shopping Center",
        description:
          "This type center offers general merchandise, grocery, and conveniences in 100,000 to 300,000 sq.ft. of gross leasing area (GLA) on 10 to 30 acres.  Often two or more anchors (like discount department, supermarket, drug, home improvement, large specialty discount) occupy 40% to 60% of the entire center.  Its primary trade area (the area from which 60% to 80% of its sales originate) typically extends outwardly as much as 6-miles."
      },
      {
        value: "shopping_centers,regional_center",
        label: "Regional Center",
        description:
          "Regional centers offer general merchandise and convenience goods.  Typically comprising 300,000 to 1,000,000 sq.ft. of GLA on 25 to 100 acres, they are often anchored by one or two department stores, each occupying a minimum of 100,000 sq.ft.  The primary trade area typically extends to 35 miles while drive times exceed 40 minutes."
      },
      {
        value: "shopping_centers,super-regional_center_or_mall",
        label: "Super-Regional Center / Mall",
        description:
          "Super-regional centers are almost always enclosed malls with a concept similar to regional centers but have more variety and assortment.  They typically encompass 800,000+ sq.ft. of GLA on 60 to 120 acres.  Usually anchored by three or more major tenants; the anchors often lease up to 50% of all space.  The primary trade area typically extends to 35 miles while drive times exceeding 40 minutes."
      },
      {
        value: "shopping_centers,specialty_centers",
        label: "Specialty Centers",
        description:
          "A specialty center promotes a collection of stores or recreation that emphasize a theme, concentrates on a class of goods, or caters to a specific patron. Their size varies from 30,000 to 500,000 and could have a gross area of up to 40 acres.  ",
        subOptions: [
          {
            value: "shopping_centers,specialty_centers,boutique",
            label: "Boutique",
            description:
              "A collection of stores that sell design items, craft wares, gourmet foods, and other high-end specialty products like jewelry and fine art. "
          },
          {
            value: "shopping_centers,specialty_centers,fashion",
            label: "Fashion",
            description:
              "Fashion centers offer high-end fashions in 80,000 to 250,000 sq.ft. of GLA on 5 to 25 acres. They typically have fashion-oriented anchors with a primary trade area of 5 to 15 miles."
          },
          {
            value: "shopping_centers,specialty_centers,festival",
            label: "Festival",
            description:
              "Festival centers are anchored by theme restaurants and entertainment tenants.  They attract fun seekers, tourists, and retail patrons.  Generally comprising 80,000 to 250,000 sq.ft. of GLA on 5 to 20 acres,  their primary trade is typically 25 to 75 miles."
          },
          {
            value: "shopping_centers,specialty_centers,lifestyle",
            label: "Lifestyle",
            description:
              "Open-air configuration typically occupied by upscale, national chain specialty stores.  Includes restaurants, entertainment, fountains, and backyard furniture.  Typically varies between 150,000 and 500,000 sq.ft. on 10 to 40 acres. Primary trade area is typically 8 to 12 miles."
          },
          {
            value: "shopping_centers,specialty_centers,outlet",
            label: "Outlet",
            description:
              "Outlet centers are dominated by name-brand manufacturers offering goods at discounted prices.  Comprising 60,000 to 400,000 sq.ft. of GLA on 10 to 50 acres, the primary trade area is typically 25 to 75 miles with drive times exceeding an hour."
          },
          {
            value: "shopping_centers,specialty_centers,power",
            label: "Power",
            description:
              "Power centers are occupied by category-dominant anchors with a few small tenants.  They comprise 250,000 to 600,000 sq.ft. of GLA on 25 to 80 acres with large-box anchors leasing 70% to 90% of the entire center.  They usually have a minimum of three anchors like home improvement centers, discount department stores, warehouse clubs, and off-price manufacturers.  The primary trade area typically exceeds 15 miles with drive times up to 30 minutes."
          },
          {
            value: "shopping_centers,specialty_centers,other_specialty",
            label: "Other Specialty",
            description:
              "All other specialty shopping center properties not classified otherwise."
          }
        ]
      },
      {
        value: "shopping_centers,other_shopping_centers",
        label: "Other Shopping Centers",
        description:
          "All other shopping center properties not classified otherwise."
      }
    ]
  },
  {
    value: "special_purpose",
    label: "Special Purpose",
    description:
      "Property generally not owned by government or institution with limited use due to its configuration, special nature, or other constraints.",
    subOptions: [
      {
        value: "special_purpose,cement,_rock,_gravel_plant",
        label: "Cement, Rock, Gravel Plant",
        description:
          "A facility designed to make concrete or cement, or crush rock into gravel for commercial purposes.  Includes batch plants which mix materials for construction and roadways."
      },
      {
        value: "special_purpose,death_related",
        label: "Death Related",
        description:
          "Facilities that temporarily stores or prepares corpses for burial or cremation.  See Land, Cemetery for Mausoleum.",
        subOptions: [
          {
            value: "special_purpose,death_related,funeral_home",
            label: "Funeral Home",
            description:
              "Funeral homes provide services to prepare corpses for final disposition.  Services include one or more of the following:  embalming to delay decomposition, displaying corpses in large open rooms for visitation by friends and family, cremation, and movement of a corpse to a gravesite or mausoleum.  "
          },
          {
            value: "special_purpose,death_related,crematory",
            label: "Crematory",
            description:
              "A crematory reduces the remains of corpses to ashes by intense heat. "
          },
          {
            value: "special_purpose,death_related,mortuary",
            label: "Mortuary",
            description:
              "Mortuaries store corpses awaiting identification, autopsy, or final disposition by burial or cremation."
          },
          {
            value: "special_purpose,death_related,other_death_related",
            label: "Other Death Related",
            description:
              "All other death related facilities not classified otherwise."
          }
        ]
      },
      {
        value: "special_purpose,kennel",
        label: "Kennel",
        description:
          "A facility designed for the short-term shelter, breeding, caring, and maintenance of animals, mostly cats and dogs."
      },
      {
        value: "special_purpose,marina",
        label: "Marina",
        description:
          "A water basin and adjacent dry land providing dockage and other services to pleasure and commercial water craft.  Services provided include one or more of the following:  fueling stations, docks, boat ramps, loading and unloading, restaurant & liquor, repair & maintenance, convenience store, yacht club, and enclosed or outdoor water-craft storage. "
      },
      {
        value: "special_purpose,movie_studio",
        label: "Movie Studio",
        description: "A facility used in the production of motion pictures."
      },
      {
        value: "special_purpose,pier",
        label: "Pier",
        description:
          "A structure built on posts extending from land out over water.  Common uses include a landing place for water pleasure craft, entertainment, eateries, fishing, and strolling."
      },
      {
        value: "special_purpose,outdoor_sign",
        label: "Outdoor Sign",
        description:
          "The land and a vertical structure with a flat, vertical surface that displays a message; often for advertising."
      },
      {
        value: "special_purpose,communications_tower",
        label: "Communications Tower",
        description:
          "Facilities designed for radio, microwave, cellular and television transmission.   "
      },
      {
        value: "special_purpose,veterinary_clinic",
        label: "Veterinary Clinic",
        description:
          "A facility designed and used for providing medical care to many kinds of animals."
      },
      {
        value: "special_purpose,watercraft_repair_and_storage",
        label: "Watercraft Repair & Storage",
        description:
          "A facility that repairs, maintains, or stores water pleasure craft."
      },
      {
        value: "special_purpose,other_special_purpose",
        label: "Other Special Purpose",
        description:
          "All other special-purpose facilities not classified otherwise."
      }
    ]
  },
  {
    value: "transportation",
    label: "Transportation",
    description:
      "Uses primarily pertaining to the loading and unloading of passengers.  Facilities for aircraft and large watercraft / ships have accommodations for loading and unloading both passengers and freight.  See similar Industrial, Large Ground Vehicles.",
    subOptions: [
      {
        value: "transportation,air_transport",
        label: "Air Transport",
        description:
          "A facility complex with special features for many types of aircraft operations.  Activities include but are not limited to:  passenger loading & unloading, baggage handling, takeoffs & landings, pilot training as well as aircraft storage, maintenance, & repair.  For freight, see related use - Industrial, Warehouse, Air cargo.",
        subOptions: [
          {
            value: "transportation,air_transport,airport_hangar",
            label: "Airport Hangar",
            description:
              "A large enclosed building where aircraft or spacecraft is stored, maintained, and repaired "
          },
          {
            value: "transportation,air_transport,airport_infrastructure",
            label: "Airport Infrastructure",
            description:
              "Runway, tower, underground structures, and other above-ground structures."
          },
          {
            value: "transportation,air_transport,airport_terminal",
            label: "Airport Terminal",
            description:
              "A structure with accommodations for passenger ticketing, boarding, and baggage handling."
          },
          {
            value: "transportation,air_transport,other_airport_facilities",
            label: "Other Airport Facilities",
            description:
              "All other air transport facilities not classified otherwise. May include restaurants, retail and other services. "
          }
        ]
      },
      {
        value: "transportation,ground_transport",
        label: "Ground Transport",
        description:
          "A facility for the loading & unloading of large, motorized, ground vehicles (trains & buses) with passengers.  See similar Land, Industrial, Intermodal Operations / Rail Yard.  Also see Industrial, Large Ground Vehicles.",
        subOptions: [
          {
            value: "transportation,ground_transport,terminal,bus",
            label: "Terminal, Bus",
            description:
              "A facility for the loading & unloading of buses with passengers"
          },
          {
            value: "transportation,ground_transport,terminal,train",
            label: "Terminal, Train",
            description:
              "A facility for the loading & unloading of trains with passengers."
          },
          {
            value: "transportation,ground_transport,other_ground_transport",
            label: "Other Ground Transport",
            description:
              "All other ground transport facilities not classified otherwise. May include restaurants, retail and other services. "
          }
        ]
      },
      {
        value: "transportation,water_transport",
        label: "Water Transport",
        description:
          "A complex with special features for many types of large watercraft / ship operations.  Activities include but are not limited to:  passenger loading and unloading, baggage handling, freight loading & unloading as well as construction, dismantling, and repair.",
        subOptions: [
          {
            value: "transportation,water_transport,port_facility,passenger",
            label: "Port Facility, Passenger",
            description:
              "A single-purpose facility for the loading and unloading of passengers on large cruise ships.  Excludes intermodal operations for standardized steel containers.  Some light maintenance may also be performed. "
          },
          {
            value: "transportation,water_transport,port_facility,intermodal",
            label: "Port Facility, Intermodal",
            description:
              "A single-purpose facility for the loading and unloading of standardized steel containers.  Some light maintenance may also be performed.  Special features include heavy-capacity cantilevered cranes."
          },
          {
            value: "transportation,water_transport,shipyard",
            label: "Shipyard",
            description:
              "A place where large watercraft / ships are built, maintained, repaired, and dismantled.  Special features include heavy-capacity cantilevered cranes, dry docks, warehouses, and extremely large fabrication areas."
          },
          {
            value: "transportation,water_transport,other_water_transport",
            label: "Other Water Transport",
            description:
              "All other water transport facilities not classified otherwise. May include restaurants, retail and other services. "
          }
        ]
      },
      {
        value: "transportation,other_transport",
        label: "Other Transport",
        description:
          "All other transportation facilities not classified otherwise."
      }
    ]
  }
];
