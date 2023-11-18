
function writeHikes(){
    database = db.collection("category");

    database.doc("CBxuJ45Yv7PK8o1OIjBr").update({
        examples:[
            "Plastic jugs with screw tops (cooking oil, laundry detergent, fabric softener, etc.)",
            "Plastic bottles with screw caps, spray pump, or pull-up tops (food, dish soap, mouthwash, shampoos, etc.)",
            "Plastic jars with wide mouths and screw-top lids (peanut butter, jam, nuts, condiments, etc.)",
            "Plastic packaging for cannabis product",
            "Plastic clamshells with hinged or click-closed tops (baked goods, fruit, produce, eggs, etc.)",
            "Plastic black-bottom trays and clear tops (deli chicken, single-serve meals, prepared foods, baked goods)",
            "Plastic tubs and lids for food (margarine, spreads, yogurt, cottage cheese, sour cream, ice cream, etc.)",
            "Plastic cold drink cups with lids (take-out beverages)",
            "Plastic garden pots and trays (bedding plants, seedlings, vegetable plants, etc.)",
            "Plastic pails less than 25L (laundry detergent, ice cream, pet food, etc.)",
            "Microwavable bowls and cups",
            "Empty single-use coffee and tea pods (remove lids and do not include lids with recycling)",
            "Rigid plastic packaging for toys, toothbrushes, batteries, etc. (remove paper backing and recycle separately)",
            "Plastic straws",
            "Plastic stir sticks",
            "Plastic utensils",
            "Plastic plates, cups, and bowls",
            "Non-durable plastic food containers",
            "Rigid plastic gift bags or boxes",
            "Disposable plastic hangers included with clothing",
            "Plastic tape dispensers",
            "Plastic dental floss containers"
        ],
        instruction:{
            "WHERE ACCEPTED":[
                "Curbside collection",
                "Multi-family collection",
                "Recycle BC depots"
            ],
            "Not Accepted":[
                "Containers for motor oil, vehicle lubricant, or antifreeze products (check Recyclepedia or call RCBC Hotline 1-800-667-4321)",
                "Packaging labeled biodegradable, compostable, or oxo-degradable",
                "Items that are not packaging",
                "Long-term storage containers such as heavy-duty plastic boxes or totes",
                "Durable hangers: wire, sturdy plastic, metal, wood",
                "Tool boxes or power tool cases",
                "Liquid-absorbing pads in trays of meat, poultry, fish, etc.",
                "Plastic wrap",
                "Plastic blister packs (protective packaging for chewing gum and pills)",
                "Ceramic plant pots",
                "Lawn edging, tarps, plastic furniture, or toys",
                "Garden hoses",
                "Plastic string or rope",
                "Plastic paint cans (check Recyclepedia or call RCBC Hotline 1-800-667-4321)",
                "Pails larger than 25L",
                "Pails for lubricants and oils (check Recyclepedia or call RCBC Hotline 1-800-667-4321)",
                "Microwavable bowls with metal rims",
                "Plastic or foil lids from coffee and tea pods"
            ]
        },
    })

    database.doc("64ak1Ke67HNHzR1wWepP").update({
        examples: ["Clear or colored containers",
            "Check with your recycling collector for instructions",
            "Empty and rinse bottles and jars",
            "Labels OK",
            "Include lids with container recycling"],
        instruction:{
            "WHERE ACCEPTED":[
                "Separately in curbside collection (confirm with your recycling collector)",
                "Separately in multi-family collection (confirm with your recycling collector)",
                "Recycle BC depots"
            ],
            "Not Accepted":[
                "Drinking glasses or dishes, cookware",
                "Whole or broken window glass or mirrors",
                "Ceramic products",
                "Dishes and cookware",
                "Light bulbs and light fixtures",
                "Deposit glass can be returned to depot for deposit refund or included in segregated glass recycling"
            ]
        }
    })

    database.doc("FZn8W6IIHZlVf21nqT3e").update({
        examples:[
            "Newspaper and flyers",
            "Magazines and catalogues",
            "Writing home/office paper and correspondence",
            "Corrugated cardboard boxes",
            "Cardboard/boxboard",
            "Moulded boxboard packaging",
            "Paper bags (Kraft paper)",
            "Multi-layer paper bags"
        ],
        instruction:{
            "WHERE ACCEPTED": ["Curbside collection",
                "Multi-family collection",
                "Recycle BC depots"
            ],
            "Not Accepted": ["Hardcover or paperback books (donate or sell)",
                "Paper towels, napkins, tissues",
                "Non-paper gift wrap and foil gift wrap",
                "Padded envelopes",
                "Ribbons or bows",
                "Musical greeting cards with batteries (contact the Recycling Council of BC for battery and e-waste recycling options)",
                "Rubber bands",
                "Plastic bags used to cover newspapers/flyers (recycle at a Recycle BC depot)"
            ]
        }
    })
    database.doc("f6GpfUuR2HJPCMtKDMCu").update({
        examples:[
            "Aluminum cans and lids used for food",
            "Aluminum foil",
            "Aluminum foil pie plates and baking trays",
            "Aluminum take-out containers",
            "Empty aluminum spray containers",
            "Aluminum pie plates, baking dishes, and trays"
        ],
        instruction:{
            "WHERE ACCEPTED": ["Curbside collection",
                "Multi-family collection",
                "Recycle BC depots"],
            "Not Accepted":[
                "Spray paint cans (call the RCBC Hotline 1-800-667-4321 or check Recyclepedia)",
                "Propane cylinders (call the RCBC Hotline 1-800-667-4321 or check Recyclepedia)",
                "Aerosol cans with any contents remaining",
                "Foil-lined cardboard take-out containers and lids",
                "Aluminum beverage containers (can be returned to depot for deposit refund or included in container recycling)",
                "Electronics and appliances",
                "Pots, pans, and other scrap metal",
                "Durable storage containers (e.g., metal food storage containers)"]
        }
    })

    database.doc("jwXKk2RFg55v0lxNOje1").update({
        examples: ["Plastic foam containers and trays used for meat and produce",
            "Foam egg cartons",
            "Foam clamshells, cups, and bowls for take-out food",
            "Firm foam cushion packaging to protect electronics, small appliances, etc."],
        instruction: {
            "WHERE ACCEPTED": ["Recycle BC depots"],
            "Not Accepted": ["Liquid-absorbing pads used in trays for meat, poultry, fish, etc.",
                "Labels, tape, paper, and cardboard on foam packaging",
                "Foam peanuts and packing chips",
                "Blue or pink foam board insulation",
                "Napkins, cutlery",
                "Protective and squishy cushion packaging",
                "Foam noodles",
                "Furniture cushions"]
        }
    })

    database.doc("vfwQ43fsdureZwA9qGk8").update({
        examples: [
            "Plastic shopping bags",
            "Plastic bags for bread, produce, dry cleaning",
            "Bags for water softener, salt, garden products, etc.",
            "Plastic overwrap on diapers, paper towel, feminine hygiene products, flats of canned beverages",
            "Plastic overwrap on mattresses and electronics",
            "Plastic food storage, sandwich, freezer, and vacuum seal bags",
            "Plastic shrink wrap",
            "Flexible plastic gift bags and boxes",
            "Transparent single-use recycling bags",
            "Reusable plastic curbside recycling bags (e.g., yellow bags for Paper)",
            "Non-food protective packaging (e.g., all-plastic shipping envelopes, air packets, etc.)",
            "Woven plastic bags for rice",
            "Plastic net bags for fruit, onions, avocados, etc.",
            "Flexible plastic packaging with plastic seal (e.g., deli and cheese packaging)",
            "Crinkly plastic packaging for dry pasta, pre-packaged deli meats, etc.",
            "Plastic wrappers for candy, cheese slices, granola bars, etc.",
            "Crinkly plastic bags for candy, cereal",
            "Potato chip bags",
            "Stand-up pouches for dried fruit and nuts, quinoa, grated cheese, etc."
        ],
        instruction: {
            "WHERE ACCEPTED": ["Recycle BC depots"],
            "Not Accepted": ["Long-term heavy-duty storage containers like plastic totes",
                "Plastic bags with cloth, rope, or ribbon handles",
                "Carry-out bags with PVC/vinyl",
                "Packaging labelled biodegradable, compostable, or oxo-degradable",
                "Lumber or construction wrap",
                "Items designed for disposal (e.g., garbage bags, compost/leaf bags)",
                "Flexible 6-pack rings",
                "Plastic squeeze tubes",
                "Plastic-lined paper",
                "Crinkly cellophane wrap for tea, floral arrangements, etc."
            ]
        }
    })

}
