tags = [ "", "",
    "Robot",
    "Starter", 
    "Senior Operator", 
    "Top Operator",
"",
    "Healing", 
    "DPS", 
    "AoE", 
    "Support", 
    "Slow", 
    "Survival", 
    "Defense", 
    "Debuff", 
    "Shift",
    "Crown-Control", 
    "Nuker", 
    "Summon", 
    "Fast-Redeploy", 
    "DP-Recovery", 
"", 
    "Melee", 
    "Ranged", 
"",
    "Guard",  
    "Medic", 
    "Vanguard", 
    "Caster", 
    "Supporter", 
    "Specialist", 
    "Sniper", 
    "Defender",
]

def getTag(num):
    return tags[num]

def getTags(strnum, classs=None, branch=None):

    tag = " ".join(map(getTag, map(int, strnum.split(" "))))

    if classs is None:
        return tag
    elif classs in ["Guard", "Specialist", "Defender"]:
        return "Melee " + tag
    elif classs in ["Caster", "Sniper", "Medic"]:
        return "Ranged " + tag

    if branch is None:
        return tag
    elif branch in ["Tatician"]:
        return "Ranged " + tag
    elif branch in ["Artificer"]:
        return "Melee " + tag
    else:
        if classs in ["Vanguard"]:
            return "Melee " + tag
        elif classs in ["Supporter"]:
            return "Ranged " + tag

    return tag


def main():
    beanstalkTag = "20 18"
    print(getTags(beanstalkTag, classs="Vanguard", branch="Tatician"))
    robetaTag = "13 10"
    print(getTags(robetaTag, classs="Supporter", branch="Artificer"))

if __name__ == "__main__":
    main()
