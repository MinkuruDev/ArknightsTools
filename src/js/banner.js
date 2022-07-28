const banners = {
    standard : {
        SIX_STARS_RATE : 2,
        FIVE_STARS_RATE : 8,
        FOUR_STARS_RATE : 50,
        SIX_STARS_PITY : 50,
        RATE_UP_RATE : 0.5,
        five_star_pity : 10,
        extra_six_stars_rate : 0,
        non_six_stars_count : 0,
        name : "Standard",

        rateup : {
            "6" : ["Fartooth", "Nightingale"],
            "5" : ["Shamare", "Projekt Red", "Leizi"],
        },
    },

    special : {
        SIX_STARS_RATE : 2,
        FIVE_STARS_RATE : 8,
        FOUR_STARS_RATE : 50,
        SIX_STARS_PITY : 50,
        RATE_UP_RATE : 0.7,
        five_star_pity : 10,
        extra_six_stars_rate : 0,
        non_six_stars_count : 0,
        name : "Unstrained Liquor, Pellucid Heart",

        rateup : {
            "6" : ["Ling", "Lee"],
            "5" : ["Blacknight"]
        },

        more5x : ["Nian", "Dusk"],
    },

    notBanner : [
        // not in banner
        "Amiya", "Estelle", "Indra", "Vulcan", "Conviction", "Adnachiel", "Savage", 
        // shop operators
        "Gavial", "Dur-nar", "Breeze", "Ethan", "Courier", "Tuye", "Purestream", "Scene", 
        "Pudding", "Honeyberry", 
        // Limited
        "Nian", "W", "Rosmontis", "Dusk", "Ch'en the Holungday", "Nearl the Radiant Knight", 
        "Ling", "Skadi the Corrupting Heart", 
        // R6S
        "Ash", "Frost", "Tachanka", "Blitz",
        // Event operators
        "Grani", "Flamebringer", "Ceylon", "Bison", "Snowsant", "Absinthe", "Tomimi", "Mint",
        "Whislash", "Heavyrain", "Gladiia", "Tequila", "Bibeak", "Folinic", "Sideroca", "Robin",
        "Lava the Purgatory", "Bena", "Wild Mane", "Kjera", "Shalem", "Kroos the Keen Glint", 
        "Nine-Colored Deer", 
        // in game but other banner
        "Ling", "Lee", "Blacknight",
    ].sort(),
}
